<script setup lang="ts">
useHead({
  title: '分享',
})

const wxShare = () => {
  wx.ready(function () {
    //更新：在分享前可以先更新分享的信息
    // wx.updateAppMessageShareData({
    //   title: newTitle,
    //   desc: newDesc,
    // });

    // 触发：显示微信分享菜单
    wx.showOptionMenu();  // 弹出微信右上角菜单（需在 jsApiList 中添加 'showOptionMenu'）
  });
}
</script>

<template>
  <div class="min-h-[34rem] h-screen bg-[url(~/assets/image/dati/bg_cover.png)] bg-bottom bg-no-repeat bg-size-[18.75rem_34rem] relative">

    <div class="min-h-[34rem] bg-black/85 flex flex-col items-center justify-center w-full h-screen mx-auto p-5 z-30">
      <div class="popup-box w-full px-5 pt-2 pb-2 relative z-10 notch-circle">
        <div class="notch-circle-left [--notch-top:20rem]" style="--notch-top:20rem"></div>
        <div class="notch-circle-right [--notch-top:20rem]"></div>
        <div class="flex justify-start items-center mb-4">
          <img src="https://via.placeholder.com/48x48/FF6B35/FFFFFF?text=👩" alt="用户头像"
               class="w-[2.4rem] h-[2.4rem] text-[12px] rounded-full mr-3 border-2 border-white shadow-md">
          <h3 class="text-[1rem] font-bold text-gray-800">大脸喵</h3>
        </div>

        <p class="text-[0.65rem] text-gray-800 leading-relaxed">
          在防艾知识挑战赛中，你以卓越的表现，十题全部答对，展现了全面、扎实的艾滋病防控知识素养。特授予你“防艾达人”的光荣称号。
        </p>

        <img src="~/assets/image/qs/peers.png" class="h-[7.5rem] mx-auto" alt="peers">

        <p class="pt-[2rem] text-[0.65rem] text-gray-400 leading-relaxed">
          愿你继续传递这份科学与关爱，共筑零歧视、零传播的未来。
        </p>
        <p class="pt-[0.5rem] text-[0.65rem] text-black text-right leading-relaxed">
          日期：2025年11月18日
        </p>

        <hr class="border-t border-dashed border-gray-200 my-2"/>

        <div class="flex items-center justify-end">
          <span class="text-[0.8rem]">长按识别，参加防艾达 人挑战赛赢红包➡️</span>
          <img src="~/assets/image/qrcode.png" class="w-[4rem]" alt="qrcode">
        </div>

      </div>

      <div class="flex items-center justify-end pt-[1.3rem] space-x-[2rem]">
        <button @click="wxShare">
          <img src="~/assets/image/weixin.png" class="w-[2.19rem]" alt="">
          <span class="text-[0.6rem] text-[#D1D1D1]">微信好友</span>
        </button>
        <button>
          <img src="~/assets/image/xizai.png" class="w-[2.19rem]" alt="">
          <span class="text-[0.6rem] text-[#D1D1D1]">保存图片</span>
        </button>
        <button>
          <img src="~/assets/image/link.png" class="w-[2.19rem]" alt="">
          <span class="text-[0.6rem] text-[#D1D1D1]">生成链接</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notch {
  --line-position: 78%;
}
</style>