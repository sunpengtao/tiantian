/**
 * Created by SPT on 2017/4/12.
 */
var app = angular.module('app');
//应用状态
app.filter('actionStatus', function () {
    return function (value) {
        if(value==null||value==undefined){
            return value
        };
        if (value == "Y") {
            return "启用";
        }
        if (value == "N") {
            return "未启用";
        }
        if (value == "D"){
            return "删除";
        }
    };
});
//试验状态
app.filter('trialState', function () {
    return function (value) {
        if(value==null||value==undefined){
            return value
        };
        if (value == "0") {
            return "未运行";
        }
        if (value == "1") {
            return "运行中";
        }
        if (value == "2"){
            return "已停止";
        }
        if (value == "3"){
            return "已发布";
        }
        if (value == "4"){
            return "删除";
        }
    };
})