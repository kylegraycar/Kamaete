import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('performances');
  this.route('login');
  this.route('register');
  this.route('account-settings', { path: '/settings' });
  this.route('confirm-email');
  this.route('email-confirmed');
});

export default Router;
