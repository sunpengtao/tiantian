angular.module('app').constant('port',{
        root:"/inmanage/",
        login:"IM01001.do",//登录接口
        logout:"IM01004.do",//注销登录
        applyInfo:"HD01001.do",//首页应用列表查询   王文辉
        applyState:"HD01004.do",//修改应用状态接口  王文辉
        InfoCreate:"HD01002.do",//新建应用接口
        details:"HD02001.do",//查询试验接口
        audienceInfo:"HD05001.do",//受众分组查询接口
        variableInfo:"HD03001.do",//查询全部变量（分页）
        versionInfo:"HD04001.do",//版本信息查询
        trialInfo:"HD02002.do",//新建试验接口
        versionInfoCreate:"HD04002.do",//新增版本信息
        varCreate:"HD03003.do",//新增变量接口
        api:function(api) {
            return  this.root + this[api];
        }
    }
);