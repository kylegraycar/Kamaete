import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['performances-list-item', 'media'],
  flashMessages: Ember.inject.service(),

  actions: {
    delete() {
      let performance = this.get('performance');
      let title = performance.get('title');

      if (confirm(`Are you sure you want to delete the performance "${title}"?` +
          ' This action cannot be undone!')) {
        performance.destroyRecord();
        this.get('flashMessages').success(`Performance "${title}" successfully deleted.`);
      }
    }
  }
});
