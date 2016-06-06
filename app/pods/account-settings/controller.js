import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    deleteAccount() {
      if (confirm('Delete your account? Warning: this action cannot be undone!')) {
        this.get('session').deleteAccount().then(() => {
          this.get('session').invalidate();
        },

        () => {
          this.get('flashMessages').warning('Your account could not be deleted at this time.' +
            ' Please try again later.');
        });
      }
    }
  }
});
