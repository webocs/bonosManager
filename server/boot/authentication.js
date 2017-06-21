'use strict';

module.exports = function enableAuthentication(server) {
  // enable authentication
  
  /* Passing a datasource to the enableAuth() method as shown here will let LoopBack take care of
   attaching any built-in models required by the access control feature, which is suitable for most applications.
  */

  server.enableAuth({ datasource: 'mongoDs' });
  /*
  Important: When using multiple user models, you should not let LoopBack auto-attach built-in 
  models required by the access control feature. Instead, call the enableAuth() method with no
  argument and manually define all models required in the server/model-config.json configuration file.
  */
};
