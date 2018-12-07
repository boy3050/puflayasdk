/*
* 通过分享进入游戏发送消息
*/
namespace PFU {
    export class Platform_1332_Request {
        //分享人uid
        public shareUid: number;
        //邀请玩哪个游戏
        public rinviteGameid: number = 1;
        //点击分享位置id
        public rinvitePos: number;
        //来源appId,从哪个app跳转过来的,可不传
        public isNew: boolean;

    }

    export class Platform_1332_Response {
        public state: number;
    }
}