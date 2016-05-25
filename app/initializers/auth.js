import ENV from 'transitions/config/environment';
import Auth from 'npm:j-toker';

export function initialize(application) {
  Auth.configure({
    apiUrl: ENV.apiURL,
    storage: 'localStorage'
  });

  var AuthManager = Ember.Object.extend({
    manager: Auth
  });

  // Access AuthHelper in routes/controllers through this.get('auth').manager
  application.register('auth:main', AuthManager);
  application.inject('route', 'auth', 'auth:main');
  application.inject('component:login-form', 'auth', 'auth:main');
}

export default {
  name: 'auth',
  initialize: initialize
};
