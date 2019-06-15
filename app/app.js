(() => {
    'use strict';
    
angular.module('gst', ['ngRoute',
    'ngCookies',
    'ngSanitize'
    ]
)

.config(['$routeProvider', '$httpProvider', '$qProvider', function ($routeProvider, $httpProvider, $qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $routeProvider
      .when('/', {
        controller: 'homeCtrl',
        templateUrl: 'modules/home.html'
      })
      .otherwise({
        redirectTo: '/'
    });
}])

.directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function (scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);

            element.on('change', function (onChangeEvent) {
            var reader = new FileReader();

            reader.onload = function (onLoadEvent) {
                scope.$apply(function () {
                    fn(scope, {
                        $fileContent: onLoadEvent.target.result
                    });
                });
            };

            reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
})

.controller('homeCtrl', ['$http', '$scope', function($http, $scope) {
    $scope.url = '/ftpRequestHandler';
    $scope.gstData = {};
    $scope.selectedTypeOfGst = 0;
    
    $scope.sortType = ["Group By" , "Normalize"]
    
    $scope.gstHeader = {};

    $scope.browse = function() {
        document.getElementById('uploadFile').click();
    };

    
    $scope.uploadGSTDataFile = ($fileContent) => {
        let fileName = document.getElementById('uploadFile');
        fileName = fileName.value.replace(/^.*[\\\/]/, '');
        let fileType = (fileName.split(/[.]/g)).pop();
        
        if(fileType === 'json'){
            $scope.fileName = fileName;
            var fileData = angular.fromJson($fileContent);
            if(fileData){
                fetch('http://localhost:3008/normalize', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(fileData)
                  })
                  .then(function (data) {
                    console.log(data);
                  })
                  .catch(function (error) {
                    console.log('Request failed', error);
                  });


            }else{
                alert(`File ${fileName} in not of JSON type/file, Kindly upload JSON file`);     
            }

        }else{
            alert(`File ${fileName} in not of JSON type/file, Kindly upload JSON file`);
        }

    };

    $scope.fire = () => {
        fetch('http://localhost:3008/fire', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({'send':'yes'})
            }).then(function (data) {
                console.log(data);
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }

    $scope.changeTypeOfGst = ((selected) => {
        $scope.selectedTypeOfGst = selected;
    });

    $scope.reset = function() {
        $scope.gstData = {};
    };
  
}])//mainCtrl
})();
    