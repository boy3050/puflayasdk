/*
* 通过分享进入游戏发送消息
*/
namespace PFU {
    export class Platform_1333_Request {
        //需要处理的玩家uid列表,以逗号拼接,最多处理10项
        public uids: string;
    }

    export class Platform_1333_Response {
        public state: number;
        public infos: Array<Platform_1333_ResData>;
    }

    export class Platform_1333_ResData {
        public uid: number;
        public name: string;
        public sex: number;
        public level: number;
        //头像地址
        public pickUrl: string;
    }
}