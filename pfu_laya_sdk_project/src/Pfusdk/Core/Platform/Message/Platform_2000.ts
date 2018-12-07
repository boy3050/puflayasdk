/*
* 接收服务器推送聊天消息
*/
namespace PFU {
    export class Platform_2000_Response {
        public items: Array<Platform_2000_resp_Data>;

    }

    export class Platform_2000_resp_Data {
        public type: number;
        public time: number;
        public text: string;
        public senderUid: number;
        public action: number;
    }
}