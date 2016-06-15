import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render();
    this.render('components/welcome-jumbotron', {
      into: 'application',
      outlet: 'jumbotron'
    });
  }
});
