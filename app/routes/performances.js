import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin).extend({
  model() {
    return this.store.findAll('performance');
  },

  actions: {
    error(_error, transition) {
      debugger;
      if (_error) {
        // Do something; logging maybe?
      }
    }
  }
});
