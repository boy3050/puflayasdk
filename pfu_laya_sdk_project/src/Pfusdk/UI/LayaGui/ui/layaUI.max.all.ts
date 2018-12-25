
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class BannerUIUI extends View {
		public img_icon:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"mouseThrough":true,"height":1334},"child":[{"type":"Button","props":{"width":750,"var":"img_icon","skin":"comp/Img_bg_2.png","height":210,"bottom":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.BannerUIUI.uiView);

        }

    }
}

module ui {
    export class BoxWindowUI extends View {
		public Img_title:Laya.Button;
		public closeBtn:Laya.Button;
		public boxlist:Laya.List;
		public boxitem:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"width":750,"visible":false,"height":1334},"child":[{"type":"Image","props":{"x":0,"width":750,"top":0,"skin":"comp/Img_bg_1.png","height":1334,"bottom":0}},{"type":"Image","props":{"x":0,"width":750,"visible":true,"top":0,"skin":"comp/Img_bg_2.png","height":163}},{"type":"Button","props":{"width":750,"var":"Img_title","top":116,"stateNum":1,"name":"Img_title","height":319}},{"type":"Text","props":{"y":22,"x":284,"width":199,"text":"5588游戏","height":48,"fontSize":45,"font":"Microsoft YaHei","color":"#000000","bold":true}},{"type":"Button","props":{"y":22,"x":36,"width":61,"var":"closeBtn","stateNum":1,"skin":"comp/Btn_xclose.png","height":57}},{"type":"List","props":{"x":0,"width":750,"var":"boxlist","top":417,"spaceY":3,"height":887},"child":[{"type":"Box","props":{"width":750,"var":"boxitem","renderType":"render","height":175},"child":[{"type":"Image","props":{"y":5,"x":0,"width":750,"skin":"comp/Img_bg_2.png","height":175}},{"type":"Image","props":{"y":37,"x":28,"width":120,"skin":"comp/Img_bg_2.png","name":"img_icon","height":120}},{"type":"Button","props":{"width":177,"top":54,"stateNum":1,"skin":"comp/anniu_1.png","right":32,"height":84},"child":[{"type":"Label","props":{"y":22,"x":52,"text":"开始","fontSize":33,"font":"Microsoft YaHei","color":"#792900","bold":true}}]},{"type":"Label","props":{"y":27,"x":184,"width":163,"text":"小猪跑酷","name":"txt_name","height":42,"fontSize":31,"font":"Microsoft YaHei","color":"#000000","bold":true}},{"type":"Label","props":{"y":79,"x":181,"wordWrap":true,"width":351,"text":"ss","name":"txt_desc","height":76,"fontSize":25,"font":"Microsoft YaHei","color":"#000000","bold":false}},{"type":"Label","props":{"y":32,"wordWrap":true,"width":95,"text":"5000万","right":282,"name":"txt_num","height":40,"fontSize":23,"font":"Microsoft YaHei","color":"#f80400","bold":false,"align":"right"}},{"type":"Label","props":{"y":32,"wordWrap":true,"width":183,"text":"人在线","right":101,"height":40,"fontSize":23,"font":"Microsoft YaHei","color":"#000000","bold":false,"align":"left"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.BoxWindowUI.uiView);

        }

    }
}

module ui {
    export class ClickBannerUIUI extends View {
		public cancel:Laya.Image;
		public loaderImg:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334,"centerY":0.5,"centerX":0.5},"child":[{"type":"Image","props":{"y":813,"x":331,"var":"cancel","skin":"comp/dianjifuhuo.png"}},{"type":"Image","props":{"width":750,"var":"loaderImg","height":1600,"centerY":0.5,"centerX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ClickBannerUIUI.uiView);

        }

    }
}

module ui {
    export class MoreGameUIUI extends View {
		public showLift:Laya.FrameAnimation;
		public hideLift:Laya.FrameAnimation;
		public moregameCtl:Laya.Sprite;
		public btn_left:Laya.Button;
		public btn_right:Laya.Button;
		public box:Laya.Box;
		public img_title:Laya.Image;
		public boxlist:Laya.List;
		public boxitem:Laya.Box;
		public boxList_left:Laya.Box;
		public btn_list_open:Laya.Image;
		public boxlist_array_left:Laya.List;
		public boxitemleft:Laya.Box;
		public btn_redpackageicon:Laya.Sprite;
		public moneyNumStr:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"width":750,"mouseThrough":true,"height":1334},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":750,"var":"moregameCtl","mouseThrough":true,"height":1334},"child":[{"type":"Button","props":{"y":567,"x":7,"width":177,"var":"btn_left","top":567,"stateNum":1,"left":7,"height":84}},{"type":"Button","props":{"y":567,"x":710,"width":177,"var":"btn_right","top":567,"stateNum":1,"right":40,"height":84,"anchorX":1}},{"type":"Box","props":{"y":0,"x":0,"var":"box","mouseThrough":true},"child":[{"type":"Image","props":{"y":1119,"width":113,"var":"img_title","skin":"comp/Img_hy.png","right":332,"height":25}},{"type":"Image","props":{"y":1157,"x":24,"width":710,"visible":false,"skin":"comp/Img_zjmdt.png","right":16,"height":164,"bottom":13}},{"type":"List","props":{"y":1160,"x":0,"width":750,"var":"boxlist","spaceX":1,"repeatY":1},"child":[{"type":"Box","props":{"width":130,"var":"boxitem","renderType":"render","height":130},"child":[{"type":"Image","props":{"width":130,"name":"img_icon","height":130}},{"type":"Sprite","props":{"y":65,"x":65,"width":0,"renderType":"mask","height":0},"child":[{"type":"Circle","props":{"radius":60,"lineWidth":1,"fillColor":"#ff0000"}}]}]}]}]},{"type":"Box","props":{"y":298,"x":-367,"width":0,"visible":false,"var":"boxList_left","mouseThrough":true,"height":0},"compId":23,"child":[{"type":"Image","props":{"y":153,"x":367,"width":51,"var":"btn_list_open","skin":"comp/zx_jt_di.png","rotation":0,"mouseEnabled":true,"height":94,"sizeGrid":"21,15,32,15"}},{"type":"Image","props":{"y":-25,"x":-12,"width":379,"skin":"comp/zx_jt_di.png","height":469,"sizeGrid":"21,15,32,15"}},{"type":"Image","props":{"y":197,"x":392,"skin":"comp/zx_jiantou.png","scaleX":-1,"anchorY":0.5,"anchorX":0.5},"compId":33},{"type":"List","props":{"y":-22,"x":-7,"width":371,"var":"boxlist_array_left","spaceY":0,"spaceX":0,"repeatY":3,"repeatX":0,"height":478},"child":[{"type":"Box","props":{"y":6,"x":-5,"width":125,"var":"boxitemleft","renderType":"render","height":153},"child":[{"type":"Image","props":{"y":50,"x":61,"width":100,"pivotY":50,"pivotX":50,"name":"img_icon","height":100}},{"type":"Label","props":{"y":103,"x":0,"wordWrap":true,"width":121,"text":"更多游戏FK更多游戏FK","overflow":"hidden","name":"gameName","height":45,"fontSize":20,"color":"#ffffff","anchorY":0,"anchorX":0,"align":"center"}}]}]}]}]},{"type":"Sprite","props":{"y":865,"x":656,"width":123,"visible":false,"var":"btn_redpackageicon","pivotY":71,"pivotX":61,"mouseEnabled":true,"height":141},"child":[{"type":"Image","props":{"y":106,"x":3,"skin":"comp/hongbao_tb2.png"}},{"type":"Image","props":{"skin":"comp/hongbao_tb1.png"}},{"type":"Text","props":{"y":110,"x":9,"width":102,"var":"moneyNumStr","text":"¥19.65","pivotY":0.5,"pivotX":0.5,"height":20,"fontSize":20,"color":"#FFFF00","align":"center"}}]}],"animations":[{"nodes":[{"target":23,"keyframes":{"x":[{"value":-367,"tweenMethod":"linearNone","tween":true,"target":23,"key":"x","index":0},{"value":12,"tweenMethod":"linearNone","tween":true,"target":23,"key":"x","index":12}]}},{"target":33,"keyframes":{"scaleX":[{"value":-1,"tweenMethod":"linearNone","tween":false,"target":33,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":33,"key":"scaleX","index":12}]}}],"name":"showLift","id":1,"frameRate":24,"action":0},{"nodes":[{"target":23,"keyframes":{"x":[{"value":12,"tweenMethod":"linearNone","tween":true,"target":23,"key":"x","index":0},{"value":-367,"tweenMethod":"linearNone","tween":true,"target":23,"key":"x","index":12}]}},{"target":33,"keyframes":{"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":false,"target":33,"key":"scaleX","index":0},{"value":-1,"tweenMethod":"linearNone","tween":true,"target":33,"key":"scaleX","index":12}]}}],"name":"hideLift","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.MoreGameUIUI.uiView);

        }

    }
}

module ui {
    export class RedPacketUIUI extends View {
		public com_openredpackage:Laya.Sprite;
		public bg_loader:Laya.Sprite;
		public btn_red_open:Laya.Image;
		public openredactiontip:laya.display.Text;
		public openredTip2:laya.display.Text;
		public btn_close:Laya.Image;
		public com_tixianredpackage:Laya.Sprite;
		public loader_tixian:Laya.Sprite;
		public btn_tixian:laya.display.Text;
		public btn_close_tixian:Laya.Image;
		public moneyNum:laya.display.Text;
		public com_awradredpackage:Laya.Sprite;
		public loader_award:Laya.Sprite;
		public btn_tixian_award:laya.display.Text;
		public btn_close_award:Laya.Image;
		public moneyNum_award:laya.display.Text;
		public allMoney_award:laya.display.Text;
		public com_everyday:Laya.Sprite;
		public loader_everyday:Laya.Sprite;
		public list_six:Laya.List;
		public seven:Laya.Box;
		public seven_text:laya.display.Text;
		public btn_double_btn:Laya.Image;
		public btn_red_everyday_skip:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"mouseThrough":true,"height":1334},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":750,"visible":false,"var":"com_openredpackage","height":1334},"child":[{"type":"Texture","props":{"y":-133,"x":0,"width":750,"skin":"comp/img_box_1.png","height":1600}},{"type":"Sprite","props":{"y":319,"x":132,"width":517,"var":"bg_loader","pivotY":0.5,"pivotX":0.5,"height":695}},{"type":"Image","props":{"y":632,"x":299,"var":"btn_red_open","skin":"comp/hb_b_kai.png"}},{"type":"Text","props":{"y":403,"x":328,"text":"恭喜","fontSize":63,"color":"#feffd5"}},{"type":"Text","props":{"y":521,"x":245,"text":"你获得一个现金红包","fontSize":33,"color":"#FEDB6C"}},{"type":"Text","props":{"y":571,"x":330,"var":"openredactiontip","text":"看视频领取","fontSize":25,"color":"#FEA963"}},{"type":"Text","props":{"y":896,"x":246,"var":"openredTip2","text":"看视频有几率翻倍！","fontSize":33,"color":"#FEFFD5"}},{"type":"Text","props":{"y":948,"x":222,"text":"游戏过程中可能出现现金红包","fontSize":26,"color":"#952B24"}},{"type":"Image","props":{"y":349,"x":594,"var":"btn_close","skin":"comp/hb_kq_b_x.png"}}]},{"type":"Sprite","props":{"y":0,"x":0,"width":750,"visible":false,"var":"com_tixianredpackage","height":1334},"child":[{"type":"Texture","props":{"y":-133,"x":0,"width":750,"skin":"comp/img_box_1.png","height":1600}},{"type":"Sprite","props":{"y":319,"x":132,"width":517,"var":"loader_tixian","pivotY":0.5,"pivotX":0.5,"height":695}},{"type":"Text","props":{"y":381,"x":311,"text":"现金红包","fontSize":40,"color":"#CE8B52"}},{"type":"Text","props":{"y":523,"x":225,"text":"余额:","fontSize":30,"color":"#F94A05"}},{"type":"Text","props":{"y":673,"x":289,"text":"红包满20元可提现","fontSize":25,"color":"#CE8B52"}},{"type":"Text","props":{"y":827,"x":335,"var":"btn_tixian","text":"提现","mouseEnabled":true,"fontSize":50,"color":"#FEFFD5"}},{"type":"Text","props":{"y":901,"x":222,"text":"游戏过程中可能出现现金红包","fontSize":26,"color":"#992D27"}},{"type":"Image","props":{"y":349,"x":594,"var":"btn_close_tixian","skin":"comp/hb_kq_b_x.png"}},{"type":"Text","props":{"y":483,"x":294,"width":200,"var":"moneyNum","text":"12.00","pivotY":0.5,"pivotX":0.5,"height":80,"fontSize":80,"color":"#F94A05","align":"center"}},{"type":"Text","props":{"y":523,"x":503,"text":"元","fontSize":30,"color":"#F94A05"}}]},{"type":"Sprite","props":{"y":0,"x":0,"width":750,"visible":false,"var":"com_awradredpackage","height":1334},"child":[{"type":"Texture","props":{"y":-133,"x":0,"width":750,"skin":"comp/img_box_1.png","height":1600}},{"type":"Sprite","props":{"y":319,"x":132,"width":517,"var":"loader_award","pivotY":0.5,"pivotX":0.5,"height":695}},{"type":"Text","props":{"y":381,"x":273,"text":"获得现金红包","fontSize":40,"color":"#CE8B52"}},{"type":"Text","props":{"y":523,"x":277,"text":"+","fontSize":30,"color":"#F94A05"}},{"type":"Text","props":{"y":673,"x":289,"text":"红包满20元可提现","fontSize":25,"color":"#CE8B52"}},{"type":"Text","props":{"y":827,"x":335,"var":"btn_tixian_award","text":"提现","mouseEnabled":true,"fontSize":50,"color":"#FEFFD5"}},{"type":"Text","props":{"y":901,"x":222,"text":"游戏过程中可能出现现金红包","fontSize":26,"color":"#992D27"}},{"type":"Image","props":{"y":349,"x":594,"var":"btn_close_award","skin":"comp/hb_kq_b_x.png"}},{"type":"Text","props":{"y":483,"x":294,"width":200,"var":"moneyNum_award","text":"12.00","pivotY":0.5,"pivotX":0.5,"height":80,"fontSize":80,"color":"#F94A05","align":"center"}},{"type":"Text","props":{"y":523,"x":503,"text":"元","fontSize":30,"color":"#F94A05"}},{"type":"Text","props":{"y":590,"x":367,"text":"余额:","fontSize":21,"color":"#F94A05"}},{"type":"Text","props":{"y":587,"x":417,"width":66,"var":"allMoney_award","text":"12.00","height":25,"fontSize":25,"color":"#F94A05","align":"center"}},{"type":"Text","props":{"y":590,"x":486,"text":"元","fontSize":21,"color":"#F94A05"}}]},{"type":"Sprite","props":{"y":0,"x":0,"width":750,"visible":false,"var":"com_everyday","height":1334},"child":[{"type":"Texture","props":{"y":-133,"x":0,"width":750,"skin":"comp/img_box_1.png","height":1600}},{"type":"Sprite","props":{"y":238,"x":57,"width":635,"var":"loader_everyday","pivotY":0.5,"pivotX":0.5,"height":857}},{"type":"Image","props":{"y":151,"x":170,"skin":"comp/meiridenglu.png"}},{"type":"List","props":{"y":313,"x":129,"width":505,"var":"list_six","spaceY":10,"spaceX":80,"repeatY":2,"repeatX":3,"mouseEnabled":false,"height":361},"child":[{"type":"Box","props":{"y":0,"x":0,"width":114,"renderType":"render","height":174},"child":[{"type":"Image","props":{"width":114,"skin":"comp/meitian_hb.png","name":"img_icon","height":130}},{"type":"Image","props":{"y":131,"x":0,"skin":"comp/dijitian_di.png"}},{"type":"Label","props":{"y":139,"x":28,"text":"第1天","name":"deveryNum","fontSize":23,"color":"#966549"}}]}]},{"type":"Box","props":{"y":685,"x":324,"width":114,"var":"seven","renderType":"render","mouseEnabled":false,"height":174},"child":[{"type":"Image","props":{"width":114,"skin":"comp/meitian_hb.png","name":"img_icon","height":130}},{"type":"Image","props":{"y":133,"x":-38,"width":195,"skin":"comp/dijitian_di.png","sizeGrid":"0,24,0,22","height":40}},{"type":"Text","props":{"y":142,"x":-23,"var":"seven_text","text":"第7天(翻倍领取)","fontSize":23,"color":"#966549"}}]},{"type":"Image","props":{"y":890,"x":209,"var":"btn_double_btn","skin":"comp/button_fxjs.png"}},{"type":"Image","props":{"y":1021,"x":315,"visible":true,"var":"btn_red_everyday_skip","skin":"comp/button_zjlq.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.RedPacketUIUI.uiView);

        }

    }
}

module ui {
    export class SdkDialogUIUI extends View {
		public dialogtext:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"width":750,"mouseThrough":true,"height":1334},"child":[{"type":"Image","props":{"y":639,"x":-543,"width":1836,"skin":"comp/img_box_1.png","sizeGrid":"33,28,19,28","height":55}},{"type":"Text","props":{"y":666,"x":377,"width":750,"var":"dialogtext","valign":"middle","text":"示111语","pivotY":27,"pivotX":375,"name":"dialogtext","height":55,"fontSize":28,"color":"#ffffff","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.SdkDialogUIUI.uiView);

        }

    }
}
