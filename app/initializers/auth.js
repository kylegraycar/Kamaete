import ENV from 'transitions/config/environment';
import Auth from 'npm:j-toker';

// Check if user device supports localStorage, and if not, store auth token
// information in cookies
var test = 'test';
var storageType;

try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    storageType = 'localStorage';
} catch(e) {
    storageType = 'cookies'
}

export function initialize(application) {
  Auth.configure({
    apiUrl: ENV.apiURL,
    storage: storageType
  });

  var AuthManager = Ember.Object.extend({
    manager: Auth,

    tokenInfo() {
      return this.manager.retrieveData('authHeaders');
    }
  });

  // Access AuthHelper in injected modules through this.get('auth').manager
  application.register('auth:main', AuthManager);
  application.inject('route', 'auth', 'auth:main');
  application.inject('component:login-form', 'auth', 'auth:main');
  application.inject('component:session-management', 'auth', 'auth:main');
}

export default {
  name: 'auth',
  initialize: initialize
};
