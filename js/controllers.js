var stripeGenApp = angular.module('stripeGenApp', []);

stripeGenApp.filter('stripesGen', function() {
  return function(stripeParams) {
    if (!stripeParams) {
      return stripeParams;
    }

  console.log('stripesGen', stripeParams);
    var s = stripeParams.stripes = stripeParams.stripes || [];

    if (stripeParams.header) {
      if (!s[0].header) {
        s.unshift({ header: true });
      }
      s[0].color = stripeParams.header.color;
      s[0].height = stripeParams.header.height;
    }
    else if (s.length > 0 && s[0].header) {
      s.shift();
    }

    if (stripeParams.footer) {
      if (!s[s.length - 1].footer) {
        s.push({ footer: true });
      }
      s[s.length - 1].color = stripeParams.footer.color;
      s[s.length - 1].height = stripeParams.footer.height;
    }
    else if (s.length > 0 && s[s.length - 1].footer) {
      s.pop();
    }

    var body = s.slice(stripeParams.header ? 1 : 0,
        stripeParams.footer ? -1 : undefined);
    var count = 2;
    if (angular.isDefined(stripeParams.count)) {
      count = stripeParams.count;
    }
    else if (angular.isDefined(stripeParams.word)) {
      count = stripeParams.word.length;
    }

    if (count < body.length) {
      s.splice((stripeParams.header ? 1 : 0) + count, body.length - count);
      body = s.slice(stripeParams.header ? 1 : 0,
          stripeParams.footer ? -1 : undefined);
    }
    while (count > body.length) {
      s.splice((stripeParams.header ? 1 : 0) + body.length, 0, {});
      body = s.slice(stripeParams.header ? 1 : 0,
          stripeParams.footer ? -1 : undefined);
    }

    var colors = _.isEmpty(this.colors) ? [{ color: '000000' }] : this.colors;
    _.each(body, function(s, i) {
      s.color = colors[i % colors.length].color;
      if (angular.isDefined(stripeParams.count)) {
        s.height = 1;
      }
      else if (angular.isDefined(stripeParams.word)) {
        s.height = angular.lowercase(stripeParams.word).charCodeAt(i) -
          'a'.charCodeAt(0);
      }
    });

    // Scale stripe heights by total height
    var scale = stripeParams.height / _.reduce(body,
        function(memo, s) { return memo + s.height; }, 0);
    _.each(body, function(s) { s.height = s.height * scale; });

    return stripeParams;
  }
});

stripeGenApp.controller('StripeGenController', function($scope) {
  $scope.colors = [];
  $scope.getColors = function(num) {
    if (isNaN(num)) {
      return $scope.colors;
    }

    if (num < $scope.colors.length) {
      $scope.colors.splice(num, $scope.colors.length - num);
    }
    while (num > $scope.colors.length) {
      $scope.colors.push({});
    }
    return $scope.colors;
  }
});
