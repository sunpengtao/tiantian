/**
 * Created by SPT on 2017/2/21.
 */
var app = angular.module('app');
app.factory('locals', ['$window', function () {
    return {
        //存储
        set: function (key, value,add) {
            function setlocal(key,value){
                localStorage.setItem(key,JSON.stringify(value));
            }
            function getlocal(key){
                return JSON.parse(localStorage.getItem(key));
            }
            if(add){
                var judge=getlocal(key) != null;
                if(judge==false){
                    var empty=[];
                    empty.push(value);
                    setlocal(key,empty);
                }else{
                    var Old=getlocal(key);
                    Old.push(value);
                    setlocal(key,Old);
                };
            }else {
                setlocal(key,value);
            };
        },
        //读取
        get: function (key) {
            return JSON.parse(localStorage.getItem(key));
        },
        //删除
        remove: function (key) {
            localStorage.removeItem(key)
        }
    }
}]);
//显示事件级别颜色
app.service("gradeColor",function(){
    return  function (num){
        switch(num){
            case "1":
                return 'bc_b';
                break;
            case "2":
                return 'bc_y1';
                break;
            case "3":
                return 'bc_o';
                break;
            case "4":
                return 'bc_r';
                break;
            default:
                return 'bc_b';
                break;
        }
    }
});
//模糊搜索;
app.service("search",function(){
    return  function (array,obj,value){
        if(array!=undefined){
            var len = array.length;
            var arr = [];
            for(var i=0;i<len;i++){
                if(obj){
                    if(array[i][obj].indexOf(value)>=0){
                        arr.push(array[i]);
                    };
                }else {
                    if(array[i].indexOf(value)>=0){
                        arr.push(array[i]);
                    };
                }
            };
            if(arr.length!=0){
                return arr;
            }else {
                return false
            };
        }else {
            return false
        }

    };
});
//判断数组里面的对象是否包含指定的内容
app.service("equals",function(){
    return  function (array,obj,value){
        if(array!=undefined||array!=null){
            var arr=[];
            var num=0;
            array.map(function(item){
                if(item[obj]==value){
                    num=1;
                    arr.push(item);
                }
            });
            if(num==0){
                return false
            }else{
                return arr
            }
        }else {
            return false
        }
    };
});
//获取时间信息
app.service("getTime",function(){
        time=new Date();
        hours=time.getHours();
        minutes=time.getMinutes();
        seconds=time.getSeconds();
        year=time.getFullYear();
        month=time.getMonth()+1;
        date=time.getDate();
        day=time.getDay();
        function one(num){
            var num1;
            if(num<10){
               num1="0"+num;
            }else {
                num1=num
            }
            return num1
        }
    return {
        now:function(){
            //19940914091284
            return ""+year+one(month)+one(date)+one(hours)+one(minutes)+one(seconds);
        },
        clocks:function(){
            //21:21:21
            return one(hours)+':'+one(minutes)+':'+one(seconds);
        },
        part:function (){
            if(hours>=0&&hours<=5){
                return "深夜了，应该熟睡";
            };
            if(hours>6&&hours<=9){
                return "早上好";
            };
            if(hours>9&&hours<=11){
                return "上午好";
            };
            if(hours>11&&hours<=14){
                return "中午好";
            };
            if(hours>14&&hours<=20){
                return "下午好";
            };
            if(hours>20&&hours<24){
                return "晚上好";
            };
        }
    };
});
//正则
app.factory("inputReg",function(){
    return  {
        numEnglish:function(value){
            var reg = /^[0-9a-zA-Z]{6,16}$/;
            if(reg.test(value)){
                return false
            }else{
                return true
            }
        }
    }
});
//利用angular指令监听ng-repeat渲染完成后执行脚本
app.directive('onRepeatFinish',function(){
    return {
        link: function(scope,element,attr){
            if(scope.$last == true){
                scope.$emit('onRepeatFinished');
            }
        }
    }
});
