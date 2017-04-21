/**
 * Created by SPT on 2017/4/10.
 */
var app = angular.module('app')
app.service('http', function ($http,$q,ui,waiting) {
    this.post = function (url, params,isintercept) {
        return request('POST', url, params,isintercept)
    };


var request = function (method, url, param,isintercept) {
        var  defered = $q.defer();

        waiting.open();
        var params={
            "header":{"type":"J"},
            "body":param
        };
        $http({
            method: method,
            url: url,
            data:params,
            headers: {contentType: "application/json"},
            timeout: 3000,
            responseType: 'json'
    }).success(function (data) {
    var body=data.body;
    if(isintercept==undefined){
       if(errorMsg(body)===false) {
           return
       }
    }
    defered.resolve(data);
}).error(function (data,Status) {
    if(isintercept==undefined){
        if(intercept(data,Status)===false){
            return
        }
    }
    defered.reject(data);
});
return defered.promise
};


//后台报错信息
function errorMsg(body) {
    if(body.errorMsg!=''){
        ui._alert("提示",body.errorMsg);
        return false
    };
}

//连接后台失败信息
function intercept(data,Status) {
    var statuNum=(""+Status).substr(0,1);
        if(statuNum=="4"||statuNum=="-"){
            ui._alert("提示",'断开与服务器连接');
        }
        if(statuNum=="5"){
            ui._alert("提示",'后台报错');
        }
        return false
    };
});