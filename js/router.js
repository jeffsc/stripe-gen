App.Router.map(function() {
    this.resource('stripes', { path: '/' });
});

//App.IndexRoute = Ember.Route.extend({
//});

App.StripesRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('stripe');
    }
});
