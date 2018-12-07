namespace PFU.UI {
    /**
     * 单个元素适配方案，FairyGUI组件导出布局宽高750*1334
     */
    export class SceneMatchingLayaUtils {

        //设计宽高
        public static DESIGN_WIDTH = 750;
        public static DESIGN_HEIGHT = 1334;

        //物理屏幕宽高比
        public static WIDTH;
        public static HEIGTH;

        public static bottomOffset = 0;
        //  #region 适配宽度 方案

        public static GetLogicOffsetH(): number {
            let r = SceneMatchingLayaUtils.WIDTH / SceneMatchingLayaUtils.DESIGN_WIDTH;
            let offset_h = (SceneMatchingLayaUtils.HEIGTH - SceneMatchingLayaUtils.DESIGN_HEIGHT * r) / 2 / r;
            return offset_h;
        }

        /**
         * 获取屏幕顶部坐标
         */
        public static GetLogicSceneBottom(): number {
            let offset_h = SceneMatchingLayaUtils.GetLogicOffsetH();
            let bottom = SceneMatchingLayaUtils.DESIGN_HEIGHT / 2 + SceneMatchingLayaUtils.DESIGN_HEIGHT / 2 + offset_h;
            return bottom;
        }

        /**
         * 获取屏幕底部坐标
         */
        public static GetLogicSceneTop(): number {
            let offset_h = SceneMatchingLayaUtils.GetLogicOffsetH();
            let top = SceneMatchingLayaUtils.DESIGN_HEIGHT / 2 - SceneMatchingLayaUtils.DESIGN_HEIGHT / 2 - offset_h;
            return top;
        }

        /**
         * 设置元素匹配顶部
         * @param com 
         */
        public static SetAlignTop(com: Laya.Component) {
            if (!WeChatUtils.GetInstance().IsWeGame()) return;

            let add = (laya.utils.Browser.onIOS && SceneMatchingLayaUtils.HEIGTH == 2436) ? 60 : 0;
            com.y = SceneMatchingLayaUtils.GetLogicSceneTop() + add + com.y;
        }

        /**
         * 设置元素匹配底部
         * @param com 
         */
        public static SetAlignBottom(com: Laya.Component) {
            if (!WeChatUtils.GetInstance().IsWeGame()) return;
            let off = SceneMatchingLayaUtils.DESIGN_HEIGHT - com.y;
            if (laya.utils.Browser.onIOS && SceneMatchingLayaUtils.HEIGTH == 2436) {
                off += -64;
            }
            else if(Laya.Browser.onAndroid && WeChatBannerAd.GetInstance().IsAllSceneOrLiuHaiScene())
            {
                off +=-64;
            }
            com.y = SceneMatchingLayaUtils.GetLogicSceneBottom() - off + this.bottomOffset;
        }

        // /**
        //  * 设置元素匹配顶部
        //  * @param com 
        //  */
        // public static SetLayaSpriteAlignTop(com: Laya.Sprite) {
        //     let add = (laya.utils.Browser.onIOS && SceneMatchingLayaUtils.HEIGTH == 2436) ? 60 : 0;
        //     com.y = SceneMatchingLayaUtils.GetLogicSceneTop() + add + com.y;
        // }

        // /**
        //  * 设置元素匹配底部
        //  * @param com 
        //  */
        // public static SetLayaSpriteAlignBottom(com: fairygui.GObject) {
        //     let off = SceneMatchingLayaUtils.DESIGN_HEIGHT - com.y;

        //     if (laya.utils.Browser.onIOS && SceneMatchingLayaUtils.HEIGTH == 2436) {
        //         off += 64;
        //     }
        //     com.y = SceneMatchingLayaUtils.GetLogicSceneBottom() - off;
        // }
    }

}