import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'transitions/config/environment';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.apiURL,
  authorizer: 'authorizer:devise-token'
});
