import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  authorize(sessionData, block) {
    block('access-token', sessionData.accessToken);
    block('expiry', sessionData.expiry);
    block('uid', sessionData.uid);
    block('client', sessionData.client);
    block('token-type', sessionData.tokenType);
  }
});
