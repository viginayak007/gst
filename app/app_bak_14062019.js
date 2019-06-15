a(() => {
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
            
            //eg: b2b, cdn, etc.. 
            let getKeysOfObject = Object.keys(fileData);
            
            $scope.typeOfGst = getKeysOfObject.filter((f) => {
                return typeof(fileData[f] === 'object')  && Array.isArray(fileData[f])
            });

            $scope.selectedTypeOfGst = $scope.typeOfGst[0];
            $scope.data = {};
            $scope.header = {};
            
            // b2b
            if(fileData.b2b){
                $scope.data.b2b = [];
                $scope.header.b2b = [];

                fileData.b2b.forEach((b2b, i) => {
                    let eachData = {};
                    Object.keys(b2b).forEach((o) => {
                        if(!$scope.header.b2b.includes(o) && !Array.isArray(b2b[o])){
                            $scope.header.b2b.push(o)
                        }
                        if(!Array.isArray(b2b[o])){
                            eachData[o] = b2b[o];
                        }
                    });
                    
                    b2b.inv.forEach((inv, j) => {
                        Object.keys(inv).forEach((o1) => {
                            if(!$scope.header.b2b.includes(o1) && !Array.isArray(inv[o1])){
                                $scope.header.b2b.push(o1)
                            }

                            if(!Array.isArray(inv[o1])){
                                eachData[o1] = inv[o1];
                            }

                        });

                        inv.itms.forEach(function(itms, k) {
                            Object.keys(itms).forEach((o2) => {
                                if(!$scope.header.b2b.includes(o2) && !Array.isArray(itms[o2])){
                                    $scope.header.b2b.push(o2)
                                }
                                
                                if(!Array.isArray(itms[o2])){
                                    eachData[o2] = itms[o2];
                                }

                                $scope.data.b2b.push(eachData);   
                            });
                        })
                    })
                })
            }

            //cdn
            if(fileData.cdn){
                $scope.data.cdn = [];
                $scope.header.cdn = [];

                fileData.cdn.forEach(function(cdn, i) {
                    let eachData = {};
                    Object.keys(cdn).forEach((o) => {
                        if(!$scope.header.cdn.includes(o) && !Array.isArray(cdn[o])){
                            $scope.header.cdn.push(o)
                        }
                        if(!Array.isArray(cdn[o])){
                            eachData[o] = cdn[o];
                        }
                    });
                    
                    cdn.nt.forEach(function(nt, j){
                        Object.keys(nt).forEach((o1) => {
                            if(!$scope.header.cdn.includes(o1) && !Array.isArray(nt[o1])){
                                $scope.header.cdn.push(o1)
                            }
                            if(!Array.isArray(nt[o1])){
                                eachData[o1] = nt[o1];
                            }
                        });

                      nt.itms.forEach(function(itms, k) {
                        Object.keys(itms).forEach((o2) => {
                            if(!$scope.header.cdn.includes(o2) && !Array.isArray(itms[o2])){
                                $scope.header.cdn.push(o2)
                            }
                            if(!Array.isArray(itms[o2])){
                                eachData[o2] = itms[o2];
                            }
                            $scope.data.cdn.push(eachData);  
                        });
                      })
                    })
                })
            }

            //b2ba
            if(fileData.b2ba){
                $scope.data.b2ba = [];
                $scope.header.b2ba = [];

                fileData.b2ba.forEach((b2ba, i) => {
                    let eachData = {};
                    Object.keys(b2ba).forEach((o) => {
                        if(!$scope.header.b2ba.includes(o) && !Array.isArray(b2ba[o])){
                            $scope.header.b2ba.push(o)
                        }
                        if(!Array.isArray(b2ba[o])){
                            eachData[o] = b2ba[o];
                        }
                    });
                    
                    b2ba.inv.forEach((inv, j) => {
                        Object.keys(inv).forEach((o1) => {
                            if(!$scope.header.b2ba.includes(o1) && !Array.isArray(inv[o1])){
                                $scope.header.b2ba.push(o1)
                            }
                            if(!Array.isArray(inv[o1])){
                                eachData[o1] = inv[o1];
                            }
                        });

                        inv.itms.forEach(function(itms, k) {
                            Object.keys(itms).forEach((o2) => {
                                if(!$scope.header.b2ba.includes(o2) && !Array.isArray(itms[o2])){
                                    $scope.header.b2ba.push(o2)
                                }
                                if(!Array.isArray(itms[o2])){
                                    eachData[o2] = itms[o2];
                                }
                                $scope.data.b2ba.push(eachData);    
                            });
                        })
                    })
                })
            }

            //tcs
            if(fileData.tcs){
                $scope.data.tcs = [];
                $scope.header.tcs = [];

                fileData.tcs.forEach((tcs, i) => {
                    let eachData = {};
                    Object.keys(tcs).forEach((o) => {
                        if(!$scope.header.tcs.includes(o) && !Array.isArray(tcs[o])){
                            $scope.header.tcs.push(o)
                        }
                        if(!Array.isArray(tcs[o])){
                            eachData[o] = tcs[o];
                        }
                    });
                    $scope.data.tcs.push(eachData);    
                    
                })
            }

        }else{
            alert(`File ${fileName} in not of JSON type/file, Kindly upload JSON file`);
        }

        $scope.gstData = [];
    };

    

    $scope.changeTypeOfGst = ((selected) => {
        $scope.selectedTypeOfGst = selected;
    });

    $scope.reset = function() {
        $scope.gstData = {};
    };
  
}])//mainCtrl
})();
    