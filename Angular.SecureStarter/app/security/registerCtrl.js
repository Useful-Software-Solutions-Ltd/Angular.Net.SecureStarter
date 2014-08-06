﻿(function () {
    'use strict';

    var controllerId = 'registerCtrl';

    angular.module('app.security')
        .controller(controllerId, ['$scope', 'notifierSvc', 'userSvc', registerCtrl]);

    function registerCtrl($scope, notifierSvc,userSvc) {
        $scope.title = 'Register';
        $scope.registration = {
            email: "",
            username: "",
            password: "",
            confirmPassword: ""            
        };
        $scope.register = register;

        function register() {            
            userSvc.register($scope.registration)
                .then(
                    function (result) {
				        //success		
				        notifierSvc.show({ message: "sucessfully registered", type: "info" });				    
				        signIn();
				    },
				    function (result) {
				        notifierSvc.show({ message: result.error, type: "error" });
				    }
			    );           
        }

        function signIn() {                
            notifierSvc.show({ message: "signing in", type: "warning" });

            var user = {
                id: $scope.registration.email,
                password: $scope.registration.password
            };

            userSvc.signIn(user)
                .then(
                    function (result) {                      
                        notifierSvc.show({ message: "signed in as " + userSvc.username, type: "info" });
                    },
                    function (result) {                        
                        notifierSvc.show({ message: result.error, type: "error" });                        
                    }
                );
        }
    }
})();