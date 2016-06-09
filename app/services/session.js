import Ember from 'ember';
import ENV from 'transitions/config/environment';
import Session from 'ember-simple-auth/services/session';

const { RSVP, run } = Ember;

export default Session.extend({

  store: Ember.inject.service(),

  // Current user is the data sent by the server upon successful authentication
  currentUser: {},

  createNewAccount(email, name, password, passwordConfirmation) {
    return new RSVP.Promise((resolve, reject) => {
      let data = {
        email,
        name,
        password,
        password_confirmation: passwordConfirmation,
        confirm_success_url: ENV.hostname + '/email-confirmed'
      };

      Ember.$.ajax({
        url: ENV.apiURL + '/auth/',
        method: 'POST',
        data,
        crossDomain: true,
      }).then((response, status, xhr) => {
        var result = {
          accessToken: xhr.getResponseHeader('access-token'),
          expiry: xhr.getResponseHeader('expiry'),
          tokenType: xhr.getResponseHeader('token-type'),
          uid: xhr.getResponseHeader('uid'),
          client: xhr.getResponseHeader('client')
        };

        this.currentUser = response.data;
        this.updateCurrentUserIdentifier();
        run(null, resolve, result);
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
  },

  updateCurrentUserIdentifier() {
    this.currentUser.identifier = this.currentUser.name || this.currentUser.email;
  }

});
