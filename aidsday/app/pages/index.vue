<script setup lang="ts">
import {useUserInfoStore} from '~/store/userStore';

const openid = useCookie('openid');
const userInfoStore = useUserInfoStore();

let showRule = ref(false)

let start = () => {
  showRule.value = false
  navigateTo({path: '/profile'})
}

//获取用户配置
const getConfig = async () => {
  const config = await useRequest<any>(`/wxh5/Index/getConfig`);
  userInfoStore.userInfo = config.data.userinfo;
}

onMounted(() => {
  //获取用户配置
  if (openid.value) {
    getConfig();
  }
});
</script>

<template>
  <div class="index-page">
    <div class="box">
      <img src="~/assets/image/index/home.png" class="h-[40.6rem] w-full" alt="home">

      <img src="~/assets/image/index/title.png" class="absolute top-[3.9rem] left-[2.3rem] w-[14.1rem]" alt="title">
      <span
          class="absolute right-0 top-[6.65rem] text-[0.7rem]
          w-[1.7rem] h-[4.2rem] bg-[#FFCA3C] hover:text-white rounded-s-lg
          flex items-center justify-center px-1 text-center leading-[0.85rem]"
          v-on:click="showRule = true">活动规则</span>
      <img src="~/assets/image/index/men.png" class="absolute top-[14.5rem] left-[2.3rem] w-[6.2rem]" alt="men">
      <img src="~/assets/image/index/lady.png" class="absolute top-[15.5rem] right-[3.05rem] w-[7.1rem]" alt="lady">
      <button v-on:click="start" class="absolute top-[28.5rem] left-[3.4rem] flex items-center justify-center
               bg-[#FFCA3C] hover:bg-yellow-500 border-[#ffffff] border-[0.05rem]
               text-white text-[1.2rem] font-bold
               w-[12rem] h-[3rem]
               rounded-full shadow-lg
               transition duration-200 ease-in-out">
        <span>点击进入挑战赛</span>
        <svg class="ml-1 w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M817.088 484.96l-512-323.744c-9.856-6.24-22.336-6.624-32.512-0.992A31.993 31.993 0 0 0 256 188.256v647.328c0 11.648 6.336 22.4 16.576 28.032A31.82 31.82 0 0 0 288 867.584a32.107 32.107 0 0 0 17.088-4.928l512-323.616A31.976 31.976 0 0 0 832 512a31.976 31.976 0 0 0-14.912-27.04z"
              fill="#ffffff"></path>
        </svg>
      </button>
      <div
          class="absolute top-[35rem] left-[5.2rem] flex flex-col items-center text-center text-[#2A7B51] text-[0.65rem] font-bold">
        <span>广州市公共卫生委员会办公室</span>
        <span>（广州市卫生健康委员会）</span>
        <span>广州市卫生健康宣传教育中心</span>
        <span class="pt-2">出品</span>
      </div>
    </div>

    <!--活动规则弹窗内容-->
    <div v-show="showRule" class="fixed inset-0 bg-black/85 flex flex-col items-center justify-center p-6 z-50">
      <div class="popup-box w-full max-w-sm md:max-w-md px-6 pt-2 pb-6">
        <div class="text-center mb-6">
            <span
                class="inline-flex items-center justify-center p-2 rounded-full relative">
                <img src="~/assets/image/star.png" class="w-[0.9rem] mb-2" alt="star">
                <span class="text-yellow-600 font-bold text-[0.85rem] px-2">
                    游戏规则
                </span>
                <img src="~/assets/image/star.png" class="w-[0.6rem] mt-1" alt="star">
            </span>
        </div>
        <div class="space-y-4 mb-8">
          <ul class="text-gray-700 text-base space-y-3">
            <li class="flex items-start">
              <span class="text-xl leading-none mr-2">•</span>
              <span>挑战赛一共 <strong class="text-red-500">10 题</strong></span>
            </li>
            <li class="flex items-start">
              <span class="text-xl leading-none mr-2">•</span>
              <span>答对 <strong class="text-green-600">8 题</strong> 即可抽红包！</span>
            </li>
            <li class="flex items-start">
              <span class="text-xl leading-none mr-2">•</span>
              <span>遇到困难？<strong class="text-blue-500">锦囊来助力！</strong></span>
            </li>
          </ul>
        </div>
        <div class="text-center">
          <button v-on:click="start" class="py-[0.65rem] px-[1.65rem] min-w-[10rem] text-white font-normal text-[0.75rem] rounded-full
                           bg-yellow-400 hover:bg-yellow-500
                           transition duration-150 ease-in-out shadow-md
                           focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50">
            我已知晓，马上挑战
          </button>
        </div>
      </div>

      <div class="pt-8">
        <button v-on:click="showRule=false"
                class="mt-3 p-[0.15rem] rounded-full border-2 border-white text-white hover:bg-white hover:text-gray-800 transition">
          <svg class="w-[1.5rem] h-[1.5rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.index-page {
  background-color: #89dffb;
  height: 40.6rem;
  min-height: 100vh;
  @apply flex justify-center items-end;
}

.box {
  height: 40.6rem;
  max-width: 18.75rem;
  margin: 0 auto;
  @apply relative;
}
</style>