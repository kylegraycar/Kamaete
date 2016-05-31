import AuthenticatedRoute from 'transitions/routes/authenticated';

export default AuthenticatedRoute.extend({
  model() {
    return this.store.findAll('performance');
  },

  actions: {
    error(error, _transition) {
      debugger;
      if (error) {
        // Do something; logging maybe?
      }
    }
  }
});
