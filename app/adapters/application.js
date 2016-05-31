import JSONAPIAdapter from 'ember-data/adapters/json-api';
import ENV from 'transitions/config/environment';
import Auth from 'npm:j-toker';

if (!Auth.configured) {
  // Check if user device supports localStorage. If not, auth token
  // information will have been stored in cookies
  var test = 'test';
  var storageType;

  try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      storageType = 'localStorage';
  } catch(e) {
      storageType = 'cookies';
  }

    Auth.configure({
      apiUrl: ENV.apiURL,
      storage: storageType
    });
}

export default JSONAPIAdapter.extend({
  host: ENV.apiURL,
  headers: {
    // TODO: get values from those stored by j-toker
    "access-token": Auth.retrieveData('authHeaders')['access-token'],
    "client": Auth.retrieveData('authHeaders')['client'],
    "uid": Auth.retrieveData('authHeaders')['uid'],
    "expiry": Auth.retrieveData('authHeaders')['expiry'],
    "token-type": "Bearer"
  }
});
