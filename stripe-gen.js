Stripes = new Meteor.Collection(null);

if (Meteor.isClient) {
  Template.inputs.events({
    'blur .count' : function (e) {
      // template data, if any, is available in 'this'
      Session.set("stripeCount", e.currentTarget.value);
    }
  });

  Deps.autorun(function() {
      var c = Session.get("stripeCount");
      Stripes.remove({});
      var i = 0;
      while (c > 0)
      {
          var h = Math.ceil(Math.random() * c);
          Stripes.insert({ height: h, color: i++ % 2 == 0 ? '#cccccc' : '#000000' });
          c = c - h;
      }
  });

  Template.stripeDisplay.stripes = function() {
      return Stripes.find({});
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
