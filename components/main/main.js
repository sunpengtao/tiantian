var app = angular.module('app');
app.controller('mainCtrl', function ($scope, $state, $window , $ionicActionSheet ,$ionicViewSwitcher, locals , moreBut) {
    var vm = $scope.vm = {
        tittle: "",
        oneClass: true,
        configCont: $scope.$on('$stateChangeSuccess', function (event, state) {
            vm.oldUrl = state.name;
            vm.tittle = state.tittle;
            vm.header = state.header;
            vm.footer = state.footer;
            vm.iconLeft = state.iconLeft;
            vm.more = state.more;
            vm.cut = vm.cut1 = "display:none;";
            var cont = "display:block;opacity:0;";
            vm.cut1 = cont + "top:-10px";
            vm.cut = cont + "top:0px";
            setTimeout(function () {
                var cont2 = "opacity:1;transition:0.5s all;";
                vm.cut1 = cont2 + "top:0px";
                vm.cut = cont2 + "top:10px";
            }, 10)
        }),
        //公共返回事件
        goback: function () {
            var url=locals.get("lastUrl");
            if (url!==undefined) {
                $state.go(url);
            } else {
                $state.go("indexHome");
            }
        },
        //底部按钮切换事件
        munClass: function (num) {
            vm.oneClass = vm.twoClass = vm.threeClass = false;
            if (num == "one") {
                vm.oneClass = true;
            } else if (num == "two") {
                vm.twoClass = true;
            } else {
                vm.threeClass = true;
            }
        }
    };
    vm.clickMore=function(){
        moreBut(vm.tittle)
    };
    //进入页面跳转indexHome
    $state.go('login');
    $ionicViewSwitcher.nextDirection("none")
});