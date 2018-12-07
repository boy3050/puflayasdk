SET CDIR=%~dp0release\web\
uglifyjs %CDIR%js/Pfusdk/UI/LayaGui/SceneMatchingLayaUtils.js %CDIR%js/Pfusdk/UI/LayaGui/PfuSdkLayaUI.js %CDIR%js/Pfusdk/UI/LayaGui/ui/layaUI.max.all.js %CDIR%js/Pfusdk/UI/LayaGui/FirstSceneBoxUI.js %CDIR%js/Pfusdk/UI/LayaGui/MoreGameUI.js %CDIR%js/Pfusdk/UI/LayaGui/PfuBannerUI.js -o %CDIR%pufsdklayagui.js -b
