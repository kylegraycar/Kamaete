import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  session: Ember.inject.service('session'),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
