/**
 * Authentication routing
 *
 * @param $httpProvider
 * @param $stateProvider
 */
function config($httpProvider, $stateProvider) {
  
  $httpProvider.interceptors.push("AuthInterceptor");
  
  $stateProvider
    .state('login', {
      url: '/login',
      parent: 'main',
      templateUrl: 'app/authentication/templates/login.html',
      controller: 'LogInCtrl as login',
      data: {
        pageTitle: 'Book Shop - Login'
      }
    })
    .state('sign', {
      url: '/sign-up',
      parent: 'main',
      templateUrl: 'app/authentication/templates/sign-up.html',
      controller: 'SignUpCtrl as signUp',
      data: {
        pageTitle: 'Book Shop - Sign Up'
      }
    })
    .state('accountEdit', {
      url: '/account/edit',
      parent: 'main',
      templateUrl: 'app/authentication/templates/account-editor.html',
      controller: 'AccountEditorCtrl as edit',
      data: {
        pageTitle: 'Book Shop - Edit Account'
      }
    })
    .state('updatePassword', {
      url: '/account/edit/change-password',
      parent: 'main',
      templateUrl: 'app/authentication/templates/update-password.html',
      controller: 'UpdatePassCtrl as update',
      data: {
        pageTitle: 'Book Shop - Update Password'
      }
    })
    .state('forgotPassword', {
      url: '/account/forgot-password',
      parent: 'main',
      templateUrl: 'app/authentication/templates/forgot-password.html',
      controller: 'ForgotPassCtrl as forgot',
      data: {
        pageTitle: 'Book Shop - Forgot Password'
      }
    })
    .state({
      name: "resetPassword",
      url: "/account/reset-password?email&code",
      parent: 'main',
      templateUrl: "app/authentication/templates/reset-password.html",
      controller: "ResetPasswordCtrl as resetPassword",
      data: {
        pageTitle: 'Book Shop - Reset Password'
      }
    });
}

angular
  .module("auth", ["ui.router", "templates"])
  .config(config);

