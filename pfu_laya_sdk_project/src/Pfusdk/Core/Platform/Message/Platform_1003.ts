namespace PFU {
    /*
    * 平台登录协议
    */
    export class Platform_1003_Request {
        //渠道(必传),微信渠道="weixin"
        public Channel: string;
        //服务器id,默认1
        public sid: number = 1;
        //平台登录的token
        public ext3: string;
        //来源appId,从哪个app跳转过来的,可不传
        public srcid: string;
        //自己的appId
        public selfid: string;
        //邀请者Uid
        public rinviteUid: number;
        //在线总时长
        public onlineTime: number;
    }

    export class Platform_1003_Response {
        //状态码
        public state: number;
        //登录id,,充值的时候返回
        public loginId: string;
        //登录token
        public loginToken: string;
        //是否创建角色 2没有 1有
        public havename: number;
        //角色创建时间
        public rolectime: number;

        //角色Uid
        public uid: number;

        //当前服务器时间
        public stime: number;
        //sessionkey
        public sk: string;
        //名称
        public name: string;
        //性别 1男0女
        public sex: number;
        //等级
        public level: number;
        //体力
        public energy: number;
        //金币
        public coin: number;
        //钻石
        public ingot: number;
        //最高关卡数
        public mapId: number;
        //本地头像 1-10
        public pic: number;
        //头像链接
        public picUrl: string;
    }
}