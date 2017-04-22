/**
 * Created by SPT on 2017/2/20.
 */
var app = angular.module('app');
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('default', {
            url: '',
            controller: function ($scope, $state,locals,$ionicViewSwitcher) {
                if(locals.get('login')){
                    $state.go('indexHome')
                }else {
                    $state.go('login')
                };
                $ionicViewSwitcher.nextDirection("none")
            }
        })
        .state('indexHome', {
            url: '/controllers/indexHome',
            tittle: '客厅',
            cache:false,
            footer: true,
            views: {
                '': {
                    templateUrl: "controllers/indexHome/indexHome.html",
                    controller: 'indexHomeCtrl'
                }
            }
        })
        .state('info', {
            url: '/controllers/info',
            tittle: '数据统计',
            footer: true,
            cache:false,
            views: {
                '': {
                    templateUrl: "controllers/info/info.html",
                    controller: 'infoCtrl'
                }
            }
        })
        .state('login', {
            url: '/controllers/login',
            tittle: '登录',
            cache:false,
            views: {
                '': {
                    templateUrl: "controllers/login/login.html",
                    controller: 'loginsCtrl'
                }
            }
        })
        .state('protocol', {
            url: '/controllers/login/protocol',
            tittle: '注册协议',
            header:true,
            cache:false,
            views: {
                '': {
                    templateUrl: "controllers/login/protocol.html",
                    controller: 'protocolCtrl'
                }
            }
        })
        .state('timer', {
            url: '/controllers/timer',
            tittle: '时间轴',
            footer: true,
            cache:false,
            views: {
                '': {
                    templateUrl: "controllers/time/timer.html",
                    controller: 'timerCtrl'
                }
            }
        })
        .state('search', {
            url: '/controllers/search',
            tittle: '搜索',
            cache:false,
            header: true,
            views: {
                '': {
                    templateUrl: "controllers/actions/search.html",
                    controller: 'searchCtrl'
                }
            }
        })
        .state('account', {
            url: '/controllers/actions/account',
            tittle: '个人流水',
            cache:false,
            header:true,
            more:true,
            views: {
                '': {
                    templateUrl: "controllers/actions/account.html",
                    controller: 'accountCtrl'
                }
            }
        })
        .state('birthday', {
            url: '/controllers/actions/birthday',
            tittle: '生日提醒',
            header: true,
            cache:false,
            views: {
                '': {
                    templateUrl: "controllers/actions/birthday.html",
                    controller: 'birthdayCtrl'
                }
            }
        })
        .state('habit', {
            url: '/controllers/actions/habit',
            tittle: '习惯养成',
            header: true,
            cache:false,
            views: {
                '': {
                    templateUrl: "controllers/actions/habit.html",
                    controller: 'habitCtrl'
                }
            }
        })
        .state('studyPlan', {
            url: '/controllers/actions/studyPlan',
            tittle: '学习计划',
            header: true,
            cache:false,
            views: {
                '': {
                    templateUrl: "controllers/actions/studyPlan.html",
                    controller: 'studyPlanCtrl'
                }
            }
        })
        .state('doctor', {
            url: '/controllers/actions/doctor',
            tittle: '私人医生',
            header: true,
            cache:false,
            views: {
                '': {
                    templateUrl: "controllers/actions/doctor.html",
                    controller: 'doctorCtrl'
                }
            }
        })
        .state('woman', {
            url: '/controllers/actions/woman',
            tittle: '女生',
            header: true,
            cache:false,
            views: {
                '': {
                    templateUrl: "controllers/actions/woman.html",
                    controller: 'womanCtrl'
                }
            }
        })
        .state('manage', {
            url: '/controllers/actions/manage',
            tittle: '理财计算器',
            header: true,
            cache:false,
            views: {
                '': {
                    templateUrl: "controllers/actions/manage.html",
                    controller: 'manageCtrl'
                }
            }
        })
        .state('repayment', {
            url: '/controllers/actions/repayment',
            tittle: '定期还款',
            header: true,
            cache:false,
            views: {
                '': {
                    templateUrl: "controllers/actions/repayment.html",
                    controller: 'repaymentCtrl'
                }
            }
        })

    $urlRouterProvider.otherwise('controllers/indexHome');
});