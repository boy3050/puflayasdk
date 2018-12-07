var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var BannerUIUI = (function (_super) {
        __extends(BannerUIUI, _super);
        function BannerUIUI() {
            return _super.call(this) || this;
        }
        BannerUIUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.BannerUIUI.uiView);
        };
        return BannerUIUI;
    }(View));
    BannerUIUI.uiView = { "type": "View", "props": { "width": 750, "mouseThrough": true, "height": 1334 }, "child": [{ "type": "Button", "props": { "width": 750, "var": "img_icon", "skin": "comp/Img_bg_2.png", "height": 210, "bottom": 0 } }] };
    ui.BannerUIUI = BannerUIUI;
})(ui || (ui = {}));
(function (ui) {
    var BoxWindowUI = (function (_super) {
        __extends(BoxWindowUI, _super);
        function BoxWindowUI() {
            return _super.call(this) || this;
        }
        BoxWindowUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.BoxWindowUI.uiView);
        };
        return BoxWindowUI;
    }(View));
    BoxWindowUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "x": 0, "width": 750, "top": 0, "skin": "comp/Img_bg_1.png", "height": 1334, "bottom": 0 } }, { "type": "Image", "props": { "x": 0, "width": 750, "visible": false, "top": 0, "skin": "comp/Img_bg_2.png", "height": 163 } }, { "type": "Button", "props": { "width": 750, "var": "Img_title", "top": 116, "stateNum": 1, "name": "Img_title", "height": 319 } }, { "type": "Text", "props": { "y": 22, "x": 284, "width": 199, "text": "5588游戏", "height": 48, "fontSize": 45, "font": "Microsoft YaHei", "color": "#000000", "bold": true } }, { "type": "Button", "props": { "y": 22, "x": 36, "width": 61, "var": "closeBtn", "stateNum": 1, "skin": "comp/Btn_xclose.png", "height": 57 } }, { "type": "List", "props": { "x": 0, "width": 750, "var": "boxlist", "top": 417, "spaceY": 3, "height": 887 }, "child": [{ "type": "Box", "props": { "width": 750, "var": "boxitem", "renderType": "render", "height": 175 }, "child": [{ "type": "Image", "props": { "y": 5, "x": 0, "width": 750, "skin": "comp/Img_bg_2.png", "height": 175 } }, { "type": "Image", "props": { "y": 37, "x": 28, "width": 120, "skin": "comp/Img_bg_2.png", "name": "img_icon", "height": 120 } }, { "type": "Button", "props": { "width": 177, "top": 54, "stateNum": 1, "skin": "comp/anniu_1.png", "right": 32, "height": 84 }, "child": [{ "type": "Label", "props": { "y": 22, "x": 52, "text": "开始", "fontSize": 33, "font": "Microsoft YaHei", "color": "#792900", "bold": true } }] }, { "type": "Label", "props": { "y": 27, "x": 184, "width": 163, "text": "小猪跑酷", "name": "txt_name", "height": 42, "fontSize": 31, "font": "Microsoft YaHei", "color": "#000000", "bold": true } }, { "type": "Label", "props": { "y": 79, "x": 181, "wordWrap": true, "width": 351, "text": "ss", "name": "txt_desc", "height": 76, "fontSize": 25, "font": "Microsoft YaHei", "color": "#000000", "bold": false } }, { "type": "Label", "props": { "y": 32, "wordWrap": true, "width": 95, "text": "5000万", "right": 282, "name": "txt_num", "height": 40, "fontSize": 23, "font": "Microsoft YaHei", "color": "#f80400", "bold": false, "align": "right" } }, { "type": "Label", "props": { "y": 32, "wordWrap": true, "width": 183, "text": "人在线", "right": 101, "height": 40, "fontSize": 23, "font": "Microsoft YaHei", "color": "#000000", "bold": false, "align": "left" } }] }] }] };
    ui.BoxWindowUI = BoxWindowUI;
})(ui || (ui = {}));
(function (ui) {
    var MoreGameUIUI = (function (_super) {
        __extends(MoreGameUIUI, _super);
        function MoreGameUIUI() {
            return _super.call(this) || this;
        }
        MoreGameUIUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.MoreGameUIUI.uiView);
        };
        return MoreGameUIUI;
    }(View));
    MoreGameUIUI.uiView = { "type": "View", "props": { "width": 750, "mouseThrough": true, "height": 1334 }, "child": [{ "type": "Button", "props": { "width": 177, "var": "btn_left", "top": 567, "stateNum": 1, "left": 7, "height": 84 } }, { "type": "Button", "props": { "width": 177, "var": "btn_right", "top": 567, "stateNum": 1, "right": 40, "height": 84, "anchorX": 1 } }, { "type": "Image", "props": { "width": 113, "var": "img_title", "top": 1117, "skin": "comp/Img_hy.png", "right": 325, "height": 25 } }, { "type": "List", "props": { "y": 1160, "width": 750, "var": "boxlist", "spaceX": 1, "repeatY": 1 }, "child": [{ "type": "Image", "props": { "y": 5, "x": 24, "width": 710, "skin": "comp/Img_zjmdt.png", "right": 16, "height": 164, "bottom": 13 } }, { "type": "Box", "props": { "width": 130, "var": "boxitem", "renderType": "render", "height": 130 }, "child": [{ "type": "Image", "props": { "width": 130, "skin": "comp/Img_bg_2.png", "name": "img_icon", "height": 130 } }, { "type": "Sprite", "props": { "y": 65, "x": 65, "width": 0, "renderType": "mask", "height": 0 }, "child": [{ "type": "Circle", "props": { "radius": 60, "lineWidth": 1, "fillColor": "#ff0000" } }] }] }] }] };
    ui.MoreGameUIUI = MoreGameUIUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map