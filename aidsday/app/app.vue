<script setup lang="ts">

//第1步：用户授权
// development || production
if (process.env.NODE_ENV === 'production') {
  try {
    const res = await useRequest('/wxh5/Index/jsLogin', {
      params: {
        callbackurl: encodeURIComponent(window.location.href),
      }
    });
    // console.log(typeof res);
    // let result = (typeof res === string) ? JSON.parse(res) : res;
    if (res.data && res.data.url) {
      window.location.href = res.data.url;
    }
  } catch (e) {
    console.log('服务器权限认证出错：', e)
  }

}

//第2步：获取分享信息，初始化配置
const shareData = useShareData();
if (!shareData.value) {
  let res = await useRequest('/wxh5/Index/getJsSignPackage', {
    params: {
      url: encodeURIComponent(window.location.href)
    }
  });
  if (res.status == 0 && res.data) {
    shareData.value = res.data
  }

  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: shareData.value.signPackage.appId, // 必填，公众号的唯一标识
    timestamp: shareData.value.signPackage.timestamp, // 必填，生成签名的时间戳
    nonceStr: shareData.value.signPackage.nonceStr, // 必填，生成签名的随机串
    // rawString: shareData.value.signPackage.rawString,//
    signature: shareData.value.signPackage.signature,// 必填，签名
    jsApiList: [
      'updateAppMessageShareData',
      'updateTimelineShareData',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'showOptionMenu',
    ] // 必填，需要使用的JS接口列表
  });

}

//第3步：应用微信分享
wx.ready(function () {
  // 配置成功后调用
  wx.showOptionMenu();  // 显示右上角菜单，包括分享按钮
  // 自定义分享内容（分享时生效）
  wx.updateAppMessageShareData({
    title: shareData.value.title, // 分享标题
    desc: shareData.value.desc, // 分享描述
    link: shareData.value.url, // link: window.location.href,
    imgUrl: shareData.value.imgUrl, // 分享图标
    success: function () {
      // showToast('分享成功')
    }
  });
  // 朋友圈分享
  wx.updateTimelineShareData({
    title: shareData.value.title,
    desc: shareData.value.desc,
    link: shareData.value.imgUrl,
    imgUrl: shareData.value.imgUrl,
    success: function () {
      // showToast('分享成功')
    }
  });

});

</script>

<template>
  <div class="main">
    <NuxtPage />
    <Music />
  </div>
</template>

