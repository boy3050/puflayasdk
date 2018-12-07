/*
* 通过分享进入游戏发送消息
*/
namespace PFU {
    export class Platform_2201_Request {
        //类型(5更多游戏6交叉推广8分享出去次数)
        public type: number;
        //图片id
        public picId:string;
    }

    export class Platform_2201_Response {
        public state: number;
    }
}