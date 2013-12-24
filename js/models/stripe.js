App.Stripe = DS.Model.extend({
  color: DS.attr('string'),
  height: DS.attr('number')
});

App.Stripe.FIXTURES = [
  {
    id: 1,
    color: '#3333cc',
    height: 30
  },
  {
    id: 2,
    color: '#333333',
    height: 30
  },
  {
    id: 3,
    color: '#3333cc',
    height: 30
  },
  {
    id: 4,
    color: '#333333',
    height: 30
  }
];
