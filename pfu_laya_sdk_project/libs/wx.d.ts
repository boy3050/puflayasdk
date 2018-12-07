
interface wx 
{
    shareAppMessage(object:any):void
    onShareAppMessage(object:any):void
    getOpenDataContext():any
    vibrateShort():void
    vibrateLong():void
    showShareMenu():void
    setStorageSync(key:string, value:string):void
    getStorageSync(key:string):string
    previewImage(object:any):void
    login(object:any):void
    request(object:any):void
    getUserInfo(object:any):void
    showModal(object:any):void
    authorize(object:any):void
    OpenSetting(object:any):void
    onShow(object:any):void
    onHide(object:any):void
    createBannerAd(object:any):any
    createRewardedVideoAd(object:any):any
    setUserCloudStorage(object:any):void
    HideShareMenu():void
    getLaunchOptionsSync():any
    onMessage(object:any):void
    navigateToMiniProgram(object:any):void
    getSystemInfoSync():any
    loadSubpackage(object:any):any
    updateShareMenu(object:any):void
    getShareInfo(object:any):void
    createInnerAudioContext():any;
    //阿拉丁统计事件
    aldSendEvent(eventName:any,value:any):void;

    getSetting(object:any):void;

    env:any;
    getFileSystemManager():any;
    downloadFile(object:any):void;

    getUpdateManager():any;
}

/** An intrinsic object that provides basic mathematics functionality and constants. */
declare const wx: wx;