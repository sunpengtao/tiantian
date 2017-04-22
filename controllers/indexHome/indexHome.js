/**
 * Created by SPT on 2017/2/20.
 */
var app = angular.module('app');
app.controller('indexHomeCtrl', function ($ionicScrollDelegate,$scope,$state,$ionicViewSwitcher,$ionicSideMenuDelegate,locals,ary,demo,gradeColor,ui,message) {
    var vm = $scope.vm = {
        cutNum:0,
        cutNum1:0,
        timer:[],
        action:[],
        activeSlide:0,
        Search:false,
        popFt:true,
        four:[{},{},{},{}],
        timer1:demo.sunpengtao.timer,
        actions:ary.actions,
        bannerUrl:"background-image:url('img/jpg/banner1.jpg')",
        home:[{name:"大厅",num:"0"},{name:"书房",num:"1"},{name:"卧室",num:"2"},{name:"厨房",num:"3"}],
        leftAction:[{src:"ic_test",name:"暂定功能",url:"search"},{src:"ic_test",name:"暂定功能",url:"search"},{src:"ic_test",name:"暂定功能",url:"search"},{src:"ic_test",name:"暂定功能",url:"search"}],
        pDom:document.getElementsByClassName('controllerBox')[0].getElementsByTagName('p'),
        goActions:function(url){
            $state.go(url)
        },
        controllerBox:function(num){
            if(num==vm.cutNum1){
                return
            };
            var num1;
            vm.cutNum1=num1=parseInt(num);
            //点击切换文字
            for(var i=0;i<4;i++){
                vm.pDom[i].style.fontSize="16px";
                vm.pDom[i].style.fontWeight="normal";
            };
            vm.pDom[num1].style.fontSize="18px";
            vm.pDom[num1].style.fontWeight="bold";
            vm.bannerUrl="background-image:url('img/jpg/banner"+(num1+1)+".jpg')";
            vm.styleBox='left:'+(num1*25)+'%';
            vm.activeSlide=num1;
            //滑动切换功能模块

        },
        actionBox:function(index){
            vm.action=[];
            for(var i=0;i<vm.actions.length;i++){
                if(vm.actions[i].type==index)(
                    vm.action.push(vm.actions[i])
                );
            };
        },
        //滑动box事件;
        slideHasChanged:function(index){
        //滑动切换文字
        vm.controllerBox(index);
        //滑动切换功能模块
        vm.actionBox(index);
        //切换后初始化位置
        $ionicScrollDelegate.$getByHandle('leftScroll').scrollTo(0,0,[true]);
        },
        avatar:function(){
            if(locals.get("login")==null||locals.get("login")==undefined){
                $state.go('login');
                return
            };
            if(vm.cutNum==0){
                //点击头像打开左滑栏
                vm.popFt=false;
                vm.cut="left:230px;transform:scale(0.8,0.8);";
                vm.cut1="transform:scale(0.9,0.9);left:40px;top:85px";
                vm.cut2="background-color:#84c0f2";
                vm.cutNum++;
                vm.leftActionLi(1);
            }else{
                vm.popFt=true;
                //点击头像恢复主视图
                vm.cut=vm.cut1=vm.cut2="";
                vm.cutNum=0;
                vm.leftActionLi(0);
            }
        },
        leftActionLi:function(num){
            var leftNum = $(".leftActionLi").size();
            var left;
            if(num){
                left="0px";
            }else {
                left="-300px";
            };
            for(var i=0;i<leftNum;i++){
                $('.leftActionLi').eq(i).css({transition:"0.4s all "+(i+1)*0.1+"s",left:left});
            };
        },
        close:function(tittle,cont,url){
            vm.avatar();
            ui._confirm(tittle,cont,url,function(){locals.set("login",null);})
        }
    };
    //进入执行
    vm.actionBox(0);
    for(var i=0;i<vm.timer1.length;i++){
        vm.timer1[i].color=gradeColor(vm.timer1[i].eventGrade);
        vm.timer.push(vm.timer1[i]);
    };
    $scope.$on("onRepeatFinished", function () {
        vm.leftActionLi();
    });
});
