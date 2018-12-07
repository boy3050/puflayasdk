/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "sensor_landscape";

//-----libs-begin-----
loadLib("libs/laya.core.js");
loadLib("libs/laya.webgl.js");
loadLib("libs/laya.physics3D.js");
loadLib("libs/laya.d3.js")

loadLib("libs/laya.html.js");
//-----libs-end-------


//-----libs-pluginlibs--begin
loadLib("pluginlibs/base64/base64.min.js")
loadLib("pluginlibs/md5/md5-min.js")
loadLib("pluginlibs/fairygui/fairygui.js")
loadLib("pluginlibs/core/pufsdkcore.js")
loadLib("pluginlibs/core/pufsdkfairyui.js")
//-----libs-pluginlibs--begin

loadLib("js/bundle.js");
