// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'lbServices',
    'ui.router',
    'ngCookies'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('compras', {
        url: '',
        templateUrl: 'views/compras.html',
        controller: 'ComprasController',
        authenticate: true
      });

     $stateProvider.state('home', {
              controller: '',
              templateUrl: 'views/home/home.view.html',
              url: ''
          });

      //Loopback provided login controller (auth.js)
      $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'views/login/login.view.html',
        controller: 'AuthLoginController'
      });

      $stateProvider.state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      })
      //Loopback provided register controller (auth.js)
      /* $stateProvider.state('register', {
          controller: 'RegisterController',
          templateUrl: 'views/register/register.view.html',
          url: ''
          });
*/
      $stateProvider.state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      })
    $urlRouterProvider.otherwise('compras');
  }])
  .run(['$rootScope', '$state', 'LoopBackAuth', 'AuthService', function($rootScope, $state, LoopBackAuth, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      // redirect to login page if not logged in
      if (toState.authenticate && !LoopBackAuth.accessTokenId) {
        event.preventDefault(); //prevent current page from loading

        // Maintain returnTo state in $rootScope that is used
        // by authService.login to redirect to after successful login.
        // http://www.jonahnisenson.com/angular-js-ui-router-redirect-after-login-to-requested-url/
        $rootScope.returnTo = {
          state: toState,
          params: toParams
        };

        $state.go('forbidden');
      }
    });

    // Get data from localstorage after pagerefresh
    // and load user data into rootscope.
    if (LoopBackAuth.accessTokenId && !$rootScope.currentUser) {
      AuthService.refresh(LoopBackAuth.accessTokenId);
    }
  }]);