/**
 * Created by SPT on 2017/2/22.
 */
var app=angular.module('app');
app.controller('accountCtrl',function($scope,locals){
   var vm=$scope.vm={};
   //alert('sdsdsd');
   locals.set('lastUrl',"login");
});