/**
 * Created by SPT on 2017/3/17.
 */
var app = angular.module('app');
app.controller('loginsCtrl',function($scope,$state,ui,alertCont,inputReg,locals,equals,getTime){
  var vm=$scope.vm={
      butCont:"登录",
      protocolSure:"ic_sure2",
      butStyles:["top:350px","top:420px","top:420px"],
      butConts:["登录","注册","设置"],
      activeSlides:[0,1,2],
      begins:[0,2,6],
      lasts:[2,6,10],
      lens:[2,4,4],
      recoveryNum:0,
      prompts:['请输入6-16位英文或数字','密码不相同'],
      inputCont:[[{src:"ic_userName",cont:"请输入登录账号",type:"text"},{src:"ic_passWorld",cont:"请输入登录密码",type:"password"}],
           [{src:"ic_userName",cont:"请输入登录账号",type:"text"},{src:"ic_passWorld",cont:"请输入登录密码",type:"password"},{src:"ic_surePassWorld",cont:"确认登录密码",type:"password"},{src:"ic_123Code",cont:"输入安全码(找回密码用)",type:"password"}],
           [{src:"ic_userName",cont:"请输入要找回的账号",type:"text"},{src:"ic_123Code",cont:"请输入安全码",type:"password"},{src:"ic_passWorld",cont:"请输入新的登录密码",type:"password"},{src:"ic_surePassWorld",cont:"确认新的登录密码",type:"password"}]
    ],
      sureBut:function(){
          if(vm.protocolSure=="ic_sure2"){
              vm.protocolSure="ic_sure1";
          }else {
              vm.protocolSure="ic_sure2";
          };
      },
      succeed:function(type,ind){
          function cut(index,index1){
              vm.pmt[index].css({right:'0'}).text(vm.prompts[index1]);
          };
          function cut1(index){
              return vm.value[index].val()
          };
          function cut2(index){
              vm.pmt1[index].css({right:'0'})
          };
          var num=0;
          var num1=0;
          var begen,last;
            if(ind!=undefined){
                //console.log(type,ind);
                begen=ind;
                last=ind+1;

            }else{
                for(i in vm.value){
                    if(num==1){
                        return
                    };
                    if(alertCont._null(cut1(i))){
                        num=1;
                    };
                };
                begen=0;
                last=vm.value.length;
            }
          //console.log(vm.pmt.length);
          for(var i=begen;i<last;i++){
              if(num==0){
                  if(inputReg.numEnglish(cut1(i))){
                      if(cut1(i)!=""){
                          cut(i,0);
                          num1=1;
                      }
                  }else {
                      if((type=="注册"&&i==2&&cut1(1)!=cut1(2))||(type=="设置"&&i==3&&cut1(2)!=cut1(3))){
                          if(type=="注册"){
                              cut(2,1);
                          }else {
                              cut(3,1);
                          }
                      }else {
                          cut2(i);
                      }
                  }
              };
          };
          if(ind!=undefined){
              return
          }
          if(num1==0&&num==0){
              var aryName=equals(locals.get('user'),"userName",cut1(0));
              console.log(aryName);
              if(type=="登录"){
                  if(aryName&&aryName[0].password==cut1(1)){
                      // vm.recoveryPmt(vm.obegin,vm.olast);
                      // vm.activeSlide=0;
                      locals.set('login',aryName);
                      $state.go("indexHome");
                  }else {
                      ui._alert("提示",'用户名或密码错误');
                  };
                  return
              }
              if(type=="注册"&&cut1(1)!=cut1(2)){
                  cut(2,1);
                  return
              }else if(type=="注册"){
                  if(aryName){
                      ui._alert("提示","用户名已存在");
                      return
                  }
                  if(vm.protocolSure!="ic_sure2"){
                      ui._alert("提示","拒绝注册协议");
                      return
                  }
                  locals.set('user',{userName:cut1(0),password:cut1(2),Code123:cut1(3),timeCode:getTime.now()},1);
                  locals.set('login',{userName:cut1(0),password:cut1(2),Code123:cut1(3),timeCode:getTime.now()});
                  //console.log(cut1(0));
                  ui._alert("恭喜注册成功","<p class='ta_l f_12 pd_15'>注册信息:<br/>1 .账号: <span class='cl_r'> "+cut1(0)+"</span><br/>2 .密码: <span class='cl_r'> "+cut1(1)+"</span><br/>2.安全码: <span class='cl_r'>"+cut1(3)+" </span><span class='d_b'><i class='f_r'>请牢记</i></span><p>","indexHome",function(){vm.recoveryPmt(vm.obegin,vm.olast);vm.activeSlide=0;});
                  return
              }
              if(type=="设置"&&cut1(2)!=cut1(3)){
                  cut(3,1);
                  return
              }else if(aryName) {
                  var cont=locals.get('user');
                  var num=0;
                  for(i in cont){
                      if(cont[i].Code123==cut1(1)&&cont[i].userName==cut1(0)){
                            var newCode=cont[i].timeCode;
                            cont[i]={userName:cut1(0),password:cut1(3),Code123:cut1(1),timeCode:newCode};
                           num=1;
                      }
                  }
                  //console.log(cont)
                  if(num==0){
                      ui._alert("提示","用户名或安全码不正确");
                      return
                  }
                  ui._alert("设置成功","<p class='ta_l f_12 pd_15'>1 .新密码: <span class='cl_r'> "+cut1(3)+"</span><i class='f_r'>请牢记</i></span><p>","",function(){vm.slideHasChanged(0);});
                  locals.set('user',cont);
              }else {
                  ui._alert("提示","用户名或安全码不正确")
              }
          };
      },
      slideHasChanged:function(index){
          vm.butStyle=vm.butStyles[index];
          vm.butCont=vm.butConts[index];
          vm.activeSlide=vm.activeSlides[index];
          vm.getDom(vm.begins[index],vm.lasts[index],vm.lens[index]);
      },
      //获取焦点初始化表单
      inputFocus:function(ind,type){
          //console.log(ind);
          function back(ind){
              vm.pmt[ind].css({right:'-140px'});
              vm.pmt1[ind].css({right:'-40px'});
          };
          back(ind);
          if(type=="注册"&&ind==1){
              back(ind+1);
          }
          if(type=="设置"&&ind==2){
              back(ind+1);
          }
      },

      recoveryPmt:function(begin,last){
          vm.recoveryNum++;
          for(var i=begin;i<last;i++){
              if(vm.recoveryNum>4){
                  $(".val").eq(i).val("").blur();
              };
              $(".prompt").css({right:'-140px'});
              $(".prompt1").css({right:'-40px'});
              //console.log(j+","+i)
          };
      },
      getDom:function(begin,last,len){
          vm.recoveryPmt(vm.obegin,vm.olast);
          vm.value=[];
          vm.pmt=[];
          vm.pmt1=[];
          for(var i=begin,j=0;i<last,j<len;i++,j++){
              vm.value[j]=$(".val").eq(i);
              vm.pmt[j]=$(".prompt").eq(i);
              vm.pmt1[j]=$(".prompt1").eq(i);
              //console.log(j+","+i)
          };
          vm.obegin=begin,vm.olast=last;
      }
  };
    $scope.$on("onRepeatFinished", function () {
        vm.getDom(0,2,2)
    });
});
