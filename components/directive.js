/**
 * Created by SPT on 2017/2/20.
 */
var app = angular.module('app');
app.controller('actionCtrl',function ($scope){});
app.controller('slideCtrl',function ($scope){});
app.controller('loginCtrl',function ($scope){});
app.directive('appMain', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'components/main/main.html',
        controller: 'mainCtrl'
    };
});
app.directive('appAction', function () {
    return {
        restrict: 'E',
        scope:true,
        templateUrl: 'components/action.html',
        controller: 'actionCtrl'
    };
});
app.directive('appSlide', function () {
    return {
        restrict: 'E',
        scope:true,
        templateUrl: 'components/slideBox.html',
        controller: 'slideCtrl'
    };
});
app.directive('appLogin', function () {
    return {
        restrict: 'E',
        scope:true,
        templateUrl: 'components/login.html',
        controller: 'loginCtrl'
    };
});

document.createElement('app-main');
document.createElement('app-action');
document.createElement('app-slide');
document.createElement('app-login');
//document.createElement('main-footer');

