import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  actions: {
    create() {
      let date = this.get('date') ? new Date(this.get('date')) : null;
      const performance = this.get('store').createRecord('performance', {
        title: this.get('title'),
        date
      });

      performance.save().then(() => {
        this.sendAction('performanceCreated', performance);
      },

      (xhr) => {
        // TODO: display validation errors in xhr.errors
        // Need to make server send validation errors in JSON-API format;
      });
    }
  }
});
