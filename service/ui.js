/**
 * Created by Administrator on 2017/2/25.
 */
//弹出框
var app=angular.module('app');
app.factory('ui',function($ionicPopup,$state){
        return{
            _alert:function(title,cont,url,backcall){
                var confirmPopup = $ionicPopup.alert({
                     title: title,
                     template: cont,
                     cancelText:"取消",
                     okText:"确定"
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        if(backcall){
                            backcall();
                        }
                        if(url){
                            $state.go(url);
                        }
                    }
                });

            },
            _confirm:function(title,cont,url,backcall){
                var confirmPopup = $ionicPopup.confirm({
                    title: title,
                    template: cont,
                    cancelText:"取消",
                    okText:"确定"
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        if(backcall){
                            backcall();
                        }
                        if(url){
                            $state.go(url);
                        }
                    };
                });
            }
        }
});
//为空弹出层
app.factory('alertCont',function(ui){
    return {
        _null:function(value){
            //弹出状态为空
            if(value==''||value==null){
                ui._alert("提示","输入内容不能为空");
                return true
            }else{
                return false
            }
        }
    };
});
//更多选项
app.service("moreBut",function($ionicActionSheet,$state){
    return function (tle){
        var h1={
            个人流水:{buttons:[{text:"高级功能"},{text:"智能提醒"}],url:[{go:"indexHome"},{go:"indexHome"}]},
            不告诉你:{buttons:[{text:"高级功能"},{text:"智能提醒"}],url:[{go:"indexHome"},{go:"indexHome"}]},
        };
        $ionicActionSheet.show({
            buttons:h1[tle].buttons,
            cancelText: '取消',
            buttonClicked: function(index) {
                $state.go(h1[tle].url[index].go)
            }
        });
    };
});
app.service('waiting', function ($timeout) {
    var team ;
    this.open = function () {
        var self = this;
        document.querySelector('.modal_waiting').style.display = 'block';
        document.querySelector('.modal_backdrop').style.display = 'block';
        $timeout.cancel(team);
        team = $timeout(function () {
            self.close();
        }, 60000)
    };
    this.close = function () {
        document.querySelector('.modal_waiting').style.display = 'none';
        document.querySelector('.modal_backdrop').style.display = 'none';
    }
});
app.service('message', function ($timeout) {
    var num=0; num1=0;
    this.addDom=function (type,cont) {
        var domcont='';
        var doms=angular.element($(".messages"));
        var sure='<div class="ta_c mb_15 h35 bc_r2 p_r"><span class="p_a t_4 l_40"><i class="ic ic25 ic_noSure"></i></span><span class="lh_35">'+cont+'</span></div>';

        var nosure='<div class="ta_c mb_15 h35 bc_g3 p_r"><span class="p_a t_4 l_40"><i class="ic ic25 ic_sure2"></i></span><span class="lh_35">'+cont+'</span></div>';
        doms.empty().css({display:"none"});
        domcont=type==0?sure:nosure;
        doms.css({display:"block"}).append(domcont);
        num++;
        setTimeout(function () {
            num1++;
            if(num1==num){
                doms.empty().css({display:"none"});
            };
        },3500);
    };

});