import Ember from 'ember';
import ENV from 'transitions/config/environment';
import Session from 'ember-simple-auth/services/session';

const { RSVP, run } = Ember;

export default Session.extend({

  store: Ember.inject.service(),

  // Current user is set by authenticator
  currentUser: {},

  createNewAccount(email, password, passwordConfirmation) {
    return new RSVP.Promise((resolve, reject) => {
      let data = {
        email,
        password,
        password_confirmation: passwordConfirmation,
        confirm_success_url: ENV.hostname + '/email-confirmed'
      };

      Ember.$.ajax({
        url: ENV.apiURL + '/auth/',
        method: 'POST',
        data,
        crossDomain: true,
      }).then((response) => {
        run(null, resolve, response);
      },

      (xhr) => {
        run(null, reject, xhr.responseJSON || xhr.responseText);
      });
    });
  },

  deleteAccount() {
    return new RSVP.Promise((resolve, reject) => {
      if (this.get('isAuthenticated')) {
        let data = this.get('data.authenticated');

        Ember.$.ajax({
          url: ENV.apiURL + '/auth/',
          method: 'DELETE',
          crossDomain: true,

          headers: {
            'access-token': data.accessToken,
            uid: data.uid,
            expiry: data.expiry,
            client: data.client
          }
        }).then(() => {
          resolve();
        },

        () => {
          reject();
        });
      } else {
        reject();
      }
    });
  }

});