function Authentication($http, $rootScope, Session, AUTH_EVENTS) {
    return {
        login: login,
        isAuthenticated: isAuthenticated,
        logout: logout,
        isActive: isActive,
        isAdmin: isAdmin,
        signUp: signUp
    };

    function login(email, password) {
        var promise = $http.post("http://localhost:3000/login", {
            email: email,
            password: password
        });

        return promise.then(function(response) {
            $rootScope.$emit(AUTH_EVENTS.loggedIn, response.data);
            Session.create(response.headers("Authorization"), response.data);
            return response;
        });
    }

    function signUp(email, password) {
        var promise = $http.post("http://localhost:3000/sign-up", {
            email: email,
            password: password
        });
    }

    function isAuthenticated() {
        return Session.isActive();
    }

    function logout() {
        $rootScope.$emit(AUTH_EVENTS.loggedOut, {});
        Session.destroy();
    }

    function isActive() {
        return Session.isActive();
    }

    function isAdmin() {
        return Session.get("isAdmin");
    }
}

angular
    .module("auth")
    .service("Authentication", Authentication);
