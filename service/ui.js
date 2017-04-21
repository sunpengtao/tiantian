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
