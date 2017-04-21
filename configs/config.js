/**
 * Created by SPT on 2017/2/20.
 */
var app = angular.module('app');
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('default', {
            url: '',
            controller: function ($scope, $state,locals) {
                if(locals.get('login')){
                    $state.go('indexHome')
                }else {
                    $state.go('login')
                };
            }
        })
        .state('indexHome', {
            url: '/controllers/indexHome',
            tittle: '客厅',
            footer: true,
            views: {
                '': {
                    templateUrl: "controllers/indexHome.html",
                    controller: 'indexHomeCtrl'
                }
            }
        })
        .state('info', {
            url: '/controllers/info',
            tittle: '数据统计',
            footer: true,
            views: {
                '': {
                    templateUrl: "controllers/info.html",
                    controller: 'infoCtrl'
                }
            }
        })
        .state('login', {
            url: '/controllers/login/login',
            tittle: '登录',
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
            views: {
                '': {
                    templateUrl: "controllers/timer.html",
                    controller: 'timerCtrl'
                }
            }
        })
        .state('search', {
            url: '/controllers/search',
            tittle: '搜索',
            header: true,
            views: {
                '': {
                    templateUrl: "controllers/search.html",
                    controller: 'searchCtrl'
                }
            }
        })
        .state('account', {
            url: '/controllers/account/account',
            tittle: '个人流水',
            header:true,
            more:true,
            views: {
                '': {
                    templateUrl: "controllers/account/account.html",
                    controller: 'accountCtrl'
                }
            }
        })
        .state('birthday', {
            url: '/controllers/birthday',
            tittle: '生日提醒',
            header: true,
            views: {
                '': {
                    templateUrl: "controllers/birthday.html",
                    controller: 'birthdayCtrl'
                }
            }
        })
        .state('habit', {
            url: '/controllers/habit',
            tittle: '习惯养成',
            header: true,
            views: {
                '': {
                    templateUrl: "controllers/habit.html",
                    controller: 'habitCtrl'
                }
            }
        })
        .state('studyPlan', {
            url: '/controllers/studyPlan',
            tittle: '学习计划',
            header: true,
            views: {
                '': {
                    templateUrl: "controllers/studyPlan.html",
                    controller: 'studyPlanCtrl'
                }
            }
        })
        .state('doctor', {
            url: '/controllers/doctor',
            tittle: '私人医生',
            header: true,
            views: {
                '': {
                    templateUrl: "controllers/doctor.html",
                    controller: 'doctorCtrl'
                }
            }
        })
        .state('woman', {
            url: '/controllers/woman',
            tittle: '女生',
            header: true,
            views: {
                '': {
                    templateUrl: "controllers/woman.html",
                    controller: 'womanCtrl'
                }
            }
        })
        .state('manage', {
            url: '/controllers/manage',
            tittle: '理财计算器',
            header: true,
            views: {
                '': {
                    templateUrl: "controllers/manage.html",
                    controller: 'manageCtrl'
                }
            }
        })
        .state('repayment', {
            url: '/controllers/repayment',
            tittle: '定期还款',
            header: true,
            views: {
                '': {
                    templateUrl: "controllers/repayment.html",
                    controller: 'repaymentCtrl'
                }
            }
        })

    $urlRouterProvider.otherwise('controllers/indexHome');
});