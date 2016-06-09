import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import ENV from 'transitions/config/environment';
import Ember from 'ember';

const { RSVP, isEmpty, run } = Ember;

export default DeviseAuthenticator.extend({
  session: Ember.inject.service(),
  serverTokenEndpoint: ENV.apiURL + '/auth/sign_in',

  restore(data) {
    return new RSVP.Promise((resolve, reject) => {
      if (!isEmpty(data.accessToken) && !isEmpty(data.expiry) &&
          !isEmpty(data.tokenType) && !isEmpty(data.uid) && !isEmpty(data.client)) {
        Ember.$.ajax({
          url: ENV.apiURL + '/auth/validate_token',
          method: 'GET',
          crossDomain: true,
          dataType: 'json',

          headers: {
            'access-token': data.accessToken,
            client: data.client,
            uid: data.uid
          }
        }).then((response) => {
          this.get('session').currentUser = response.data;
          resolve(data);
        },

        () => {
          reject();
        });
      } else {
        reject();
      }
    });
  },

  authenticate(args) {
    return new RSVP.Promise((resolve, reject) => {
      if (args.type === 'login') {
        const { email, password } = args;
        const { identificationAttributeName } = this.getProperties('identificationAttributeName');
        const data = { password };
        data[identificationAttributeName] = email;

        this.makeRequest(data).then((response, status, xhr) => {
          //save the five headers needed to send to devise-token-auth
          //when making an authorized API call
          var result = {
            accessToken: xhr.getResponseHeader('access-token'),
            expiry: xhr.getResponseHeader('expiry'),
            tokenType: xhr.getResponseHeader('token-type'),
            uid: xhr.getResponseHeader('uid'),
            client: xhr.getResponseHeader('client')
          };

          this.get('session').currentUser = response.data;

          run(null, resolve, result);
        },

        (xhr) => {
          run(null, reject, xhr.responseJSON || xhr.responseText);
        });
      } else if (args.type === 'registration') {
        run(null, resolve, args.tokenData);
      }
    });
  },

  invalidate(data) {
    Ember.$.ajax({
      url: ENV.apiURL + '/auth/sign_out',
      method: 'DELETE',
      async: false,
      crossDomain: true,

      headers: {
        'access-token': data.accessToken,
        client: data.client,
        uid: data.uid
      }
    });

    return this._super();
  }
});
