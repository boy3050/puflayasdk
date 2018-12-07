var PFU;
(function (PFU) {
    var UI;
    (function (UI) {
        /**
         * 单个元素适配方案，FairyGUI组件导出布局宽高750*1334
         */
        var SceneMatchingUtils = (function () {
            function SceneMatchingUtils() {
            }
            //  #region 适配宽度 方案
            SceneMatchingUtils.GetLogicOffsetH = function () {
                var r = SceneMatchingUtils.WIDTH / SceneMatchingUtils.DESIGN_WIDTH;
                var offset_h = (SceneMatchingUtils.HEIGTH - SceneMatchingUtils.DESIGN_HEIGHT * r) / 2 / r;
                return offset_h;
            };
            /**
             * 获取屏幕顶部坐标
             */
            SceneMatchingUtils.GetLogicSceneBottom = function () {
                var offset_h = SceneMatchingUtils.GetLogicOffsetH();
                var bottom = SceneMatchingUtils.DESIGN_HEIGHT / 2 + SceneMatchingUtils.DESIGN_HEIGHT / 2 + offset_h;
                return bottom;
            };
            /**
             * 获取屏幕底部坐标
             */
            SceneMatchingUtils.GetLogicSceneTop = function () {
                var offset_h = SceneMatchingUtils.GetLogicOffsetH();
                var top = SceneMatchingUtils.DESIGN_HEIGHT / 2 - SceneMatchingUtils.DESIGN_HEIGHT / 2 - offset_h;
                return top;
            };
            /**
             * 设置元素匹配顶部
             * @param com
             */
            SceneMatchingUtils.SetAlignTop = function (com) {
                if (!PFU.WeChatUtils.GetInstance().IsWeGame())
                    return;
                var add = (laya.utils.Browser.onIOS && SceneMatchingUtils.HEIGTH == 2436) ? 60 : 0;
                com.y = SceneMatchingUtils.GetLogicSceneTop() + add + com.y;
            };
            /**
             * 设置元素匹配底部
             * @param com
             */
            SceneMatchingUtils.SetAlignBottom = function (com) {
                if (!PFU.WeChatUtils.GetInstance().IsWeGame())
                    return;
                var off = SceneMatchingUtils.DESIGN_HEIGHT - com.y;
                if (laya.utils.Browser.onIOS && SceneMatchingUtils.HEIGTH == 2436) {
                    off += 64;
                }
                else if (Laya.Browser.onAndroid && PFU.WeChatBannerAd.GetInstance().IsAllSceneOrLiuHaiScene()) {
                    off += 64;
                }
                com.y = SceneMatchingUtils.GetLogicSceneBottom() - off;
            };
            return SceneMatchingUtils;
        }());
        //设计宽高
        SceneMatchingUtils.DESIGN_WIDTH = 750;
        SceneMatchingUtils.DESIGN_HEIGHT = 1334;
        UI.SceneMatchingUtils = SceneMatchingUtils;
    })(UI = PFU.UI || (PFU.UI = {}));
})(PFU || (PFU = {}));
//# sourceMappingURL=SceneMatchingUtils.js.map