var stripeGenApp = angular.module('stripeGenApp', []);

stripeGenApp.filter('stripesGen', function() {
  return function(stripeParams) {
    if (!angular.isDefined(stripeParams)) {
      return stripeParams;
    }

  //console.log('stripesGen', stripeParams);
    var s = stripeParams.stripes = stripeParams.stripes || [];

    if (angular.isDefined(stripeParams.header)) {
      if (s.length < 1 || !s[0].header) {
        s.unshift({ header: true });
      }
      s[0].color = stripeParams.header.color;
      s[0].height = stripeParams.header.height;
    }
    else if (s.length > 0 && s[0].header) {
      s.shift();
    }

    if (stripeParams.footer) {
      if (s.length < 1 || !s[s.length - 1].footer) {
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
    var count = 0;
    var type = !isNaN(parseInt(stripeParams.count)) ? 'count' :
      angular.isDefined(stripeParams.word) && stripeParams.word != '' ? 'word' :
      'none';
    switch (type) {
      case 'count':
        count = stripeParams.count;
        break;
      case 'word':
        count = stripeParams.word.length;
        break;
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
      s.firstBody = false;
      s.color = colors[i % colors.length].color;
      switch (type) {
        case 'count':
          s.height = 1;
          break;
        case 'word':
          s.height = angular.lowercase(stripeParams.word).charCodeAt(i) -
            'a'.charCodeAt(0) + 1;
          break;
      }
    });
    if (body.length > 0) {
      body[0].firstBody = true;
    }

    // Scale stripe heights by total height
    var scale = stripeParams.height / _.reduce(body,
        function(memo, s) { return memo + s.height; }, 0);
    var remainder = 0;
    _.each(body, function(s) {
      var h = s.height * scale + remainder;
      s.height = Math.round(h);
      remainder = h - s.height;
    });

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
