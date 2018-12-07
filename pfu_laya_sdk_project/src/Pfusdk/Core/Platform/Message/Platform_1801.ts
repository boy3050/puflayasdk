/*
* 更新用户数据协议
*/
namespace PFU {
    export class Platform_1801_Request {
        //名称 不需要更新时传值
        public name: string;
        public sex: number = -1;
        public level: number = -1;
        public energy: number = 1;
        public coin: number = -1;
        public ingot: number = -1;
        public mapId: number = -1;
        public pic: number = -1;
        //头像链接
        public picUrl: string;

    }

    export class Platform_1801_Response {
        public state: number;
    }
}