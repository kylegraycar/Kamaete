import JSONAPIAdapter from 'ember-data/adapters/json-api';
import ENV from 'transitions/config/environment';

export default JSONAPIAdapter.extend({
  host: ENV.apiURL,
  headers: {
    // TODO: get values from those stored by j-toker
    "access-token": "Krbo2-I6HMFCx3vN-nDdkw",
    "client": "dZ0_DC3t5DOXEmKnAhgvYg",
    "uid": "poop@butt.com",
    "expiry": "1465376925",
    "token-type": "Bearer"
  }
});
