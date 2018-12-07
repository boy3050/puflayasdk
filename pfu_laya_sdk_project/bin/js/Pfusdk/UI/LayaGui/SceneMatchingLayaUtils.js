var PFU;
(function (PFU) {
    var UI;
    (function (UI) {
        /**
         * 单个元素适配方案，FairyGUI组件导出布局宽高750*1334
         */
        var SceneMatchingLayaUtils = (function () {
            function SceneMatchingLayaUtils() {
            }
            //  #region 适配宽度 方案
            SceneMatchingLayaUtils.GetLogicOffsetH = function () {
                var r = SceneMatchingLayaUtils.WIDTH / SceneMatchingLayaUtils.DESIGN_WIDTH;
                var offset_h = (SceneMatchingLayaUtils.HEIGTH - SceneMatchingLayaUtils.DESIGN_HEIGHT * r) / 2 / r;
                return offset_h;
            };
            /**
             * 获取屏幕顶部坐标
             */
            SceneMatchingLayaUtils.GetLogicSceneBottom = function () {
                var offset_h = SceneMatchingLayaUtils.GetLogicOffsetH();
                var bottom = SceneMatchingLayaUtils.DESIGN_HEIGHT / 2 + SceneMatchingLayaUtils.DESIGN_HEIGHT / 2 + offset_h;
                return bottom;
            };
            /**
             * 获取屏幕底部坐标
             */
            SceneMatchingLayaUtils.GetLogicSceneTop = function () {
                var offset_h = SceneMatchingLayaUtils.GetLogicOffsetH();
                var top = SceneMatchingLayaUtils.DESIGN_HEIGHT / 2 - SceneMatchingLayaUtils.DESIGN_HEIGHT / 2 - offset_h;
                return top;
            };
            /**
             * 设置元素匹配顶部
             * @param com
             */
            SceneMatchingLayaUtils.SetAlignTop = function (com) {
                if (!PFU.WeChatUtils.GetInstance().IsWeGame())
                    return;
                var add = (laya.utils.Browser.onIOS && SceneMatchingLayaUtils.HEIGTH == 2436) ? 60 : 0;
                com.y = SceneMatchingLayaUtils.GetLogicSceneTop() + add + com.y;
            };
            /**
             * 设置元素匹配底部
             * @param com
             */
            SceneMatchingLayaUtils.SetAlignBottom = function (com) {
                if (!PFU.WeChatUtils.GetInstance().IsWeGame())
                    return;
                var off = SceneMatchingLayaUtils.DESIGN_HEIGHT - com.y;
                if (laya.utils.Browser.onIOS && SceneMatchingLayaUtils.HEIGTH == 2436) {
                    off += -64;
                }
                else if (Laya.Browser.onAndroid && PFU.WeChatBannerAd.GetInstance().IsAllSceneOrLiuHaiScene()) {
                    off += -64;
                }
                com.y = SceneMatchingLayaUtils.GetLogicSceneBottom() - off + this.bottomOffset;
            };
            return SceneMatchingLayaUtils;
        }());
        //设计宽高
        SceneMatchingLayaUtils.DESIGN_WIDTH = 750;
        SceneMatchingLayaUtils.DESIGN_HEIGHT = 1334;
        SceneMatchingLayaUtils.bottomOffset = 0;
        UI.SceneMatchingLayaUtils = SceneMatchingLayaUtils;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=SceneMatchingLayaUtils.js.map