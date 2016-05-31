import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    invalidateSession() {
      this.get('auth').manager.signOut().then(() => {
        this.sendAction();
      });
    }
  }
});
