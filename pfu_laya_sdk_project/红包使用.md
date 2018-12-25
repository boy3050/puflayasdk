# 红包使用

## 准备工作

    1 确保前期SDK接入工作结束
    2 检查是否添加request合法域名
    3 确保替换最新的资源

## 显示隐藏红包按钮

    点击红包按钮，每天首次弹出7天领取界面，领过后才会弹出红包余额界面。

    PfuSdk.ShowRedPacketBtn();
    PfuSdk.HideRedPacketBtn();

## 主动显示 7天领取红包界面

    若想每次天首次进入游戏弹出7天领取红包界面，则需要主动调用该接口。超出登录天数则不会再弹出界面

    PfuSdk.PopupRedPacketEverydayWindow();

## 设置红包按钮位置

    PfuSdk.SetRedPacketBtnPos(vx,vy);

## 红包掉落

    1 判定是否可以弹出

    PfuSdk.CanGetRedPacket():boolean;

    2 直接弹出红包

    PfuSdk.PopupRedPacket(this,(type)=>{
        if(type == PfuSdk.SUCCESS)
        {
            //领取成功
            return;
        }
        //跳过领取
    });

