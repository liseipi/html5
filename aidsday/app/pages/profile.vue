<script setup lang="ts">
import {useUserInfoStore} from '~/store/userStore';

useHead({
  title: '填写个人资料',
});

const userInfoStore = useUserInfoStore();

// 默认值设置为 -1，表示未选择
let gender = ref<number>(-1); // 0: 小哥哥, 1: 小姐姐
let age = ref<number>(-1); // 存储选中的年龄组起始值

let tip = ref(false);
const start = () => {
  if (gender.value == -1 || age.value == -1) {
    tip.value = true
  } else {
    tip.value = false
    navigateTo({ path: '/dati' });
  }
}

const setGender = (value) => {
  gender.value = value;
  userInfoStore.setGender(value);
}

const setAge = (value) => {
  age.value = value;
  userInfoStore.setAge(value);

  start();
}

</script>

<template>
  <div class="min-h-screen flex flex-col items-center bg-cover bg-center bg-[#51BDDA] relative">
    <img src="~/assets/image/profile/bg_cover.png" class="w-full" alt="bg">

    <div class="absolute top-0 left-0 w-full px-6">
      <h2 class="text-[1.2rem] font-normal text-white pt-[4rem] leading-tight">请选择您的身份</h2>
      <div class="flex gap-4 w-full max-w-xl pt-[1.6rem] mb-[1rem]">
        <div @click="setGender(0)" class="flex-1 cursor-pointer">
          <div class="flex flex-col items-center">
            <div
                class="w-full h-36 border-2 rounded-xl mb-4 flex items-center justify-center overflow-hidden transition duration-200"
                :class="{
                'border-[#FFCA3C]': gender === 0, // 选中时边框色
                'border-white': gender !== 0,     // 未选中时边框色
              }"
            >
              <img src="~/assets/image/profile/boy.png" alt="小哥哥插画" class="object-cover h-full w-full">
            </div>

            <p class="text-sm font-light text-gray-500">机智聪明</p>

            <div
                class="mt-2 py-1 px-6 rounded-full font-bold text-base shadow-md transition duration-200"
                :class="{
                'bg-yellow-400 text-white border border-white': gender === 0,     // 选中时样式
                'bg-white text-[#5AD3E7] border border-gray-300': gender !== 0, // 未选中时样式
              }"
            >
              小哥哥
            </div>
          </div>
        </div>
        <div @click="setGender(1)" class="flex-1 cursor-pointer">
          <div class="flex flex-col items-center">
            <div
                class="w-full h-36 border-2 rounded-xl mb-4 flex items-center justify-center overflow-hidden transition duration-200"
                :class="{
                'border-[#FFCA3C]': gender === 1, // 选中时边框色
                'border-white': gender !== 1,     // 未选中时边框色
              }"
            >
              <img src="~/assets/image/profile/girl.png" alt="小姐姐插画" class="object-cover h-full w-full">
            </div>

            <p class="text-sm font-light text-gray-500">才思敏捷</p>

            <div
                class="mt-2 py-1 px-6 rounded-full font-bold text-base shadow-md transition duration-200"
                :class="{
                'bg-yellow-400 text-white border border-white': gender === 1,     // 选中时样式
                'bg-white text-[#5AD3E7] border border-gray-300': gender !== 1, // 未选中时样式
              }"
            >
              小姐姐
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-[1.2rem] font-normal text-white pt-[1rem] leading-tight">请选择您的年龄</h2>
      <div class="grid grid-cols-3 gap-4 pt-[1.6rem] w-full max-w-xl">
        <div
            @click="setAge(0)"
            class="w-[5rem] h-[1.8rem] text-[0.7rem] flex items-center justify-center rounded-full cursor-pointer font-normal transition duration-150 ease-in-out"
            :class="{
            'bg-yellow-400 text-white border border-white font-bold': age === 0,        // 选中样式
            'text-[#5AD3E7] border border-gray-300 bg-white': age !== 0, // 未选中样式
          }"
        >
          0-17岁
        </div>

        <div
            @click="setAge(18)"
            class="w-[5rem] h-[1.8rem] text-[0.7rem] flex items-center justify-center rounded-full cursor-pointer font-normal transition duration-150 ease-in-out"
            :class="{
            'bg-yellow-400 text-white border border-white font-bold': age === 18,        // 选中样式
            'text-[#5AD3E7] border border-gray-300 bg-white': age !== 18, // 未选中样式
          }"
        >
          18-25岁
        </div>

        <div
            @click="setAge(26)"
            class="w-[5rem] h-[1.8rem] text-[0.7rem] flex items-center justify-center rounded-full cursor-pointer font-normal transition duration-150 ease-in-out"
            :class="{
            'bg-yellow-400 text-white border border-white font-bold': age === 26,        // 选中样式
            'text-[#5AD3E7] border border-gray-300 bg-white': age !== 26, // 未选中样式
          }"
        >
          26-40岁
        </div>

        <div
            @click="setAge(41)"
            class="w-[5rem] h-[1.8rem] text-[0.7rem] flex items-center justify-center rounded-full cursor-pointer font-normal transition duration-150 ease-in-out"
            :class="{
            'bg-yellow-400 text-white border border-white font-bold': age === 41,        // 选中样式
            'text-[#5AD3E7] border border-gray-300 bg-white': age !== 41, // 未选中样式
          }"
        >
          41-60岁
        </div>

        <div
            @click="setAge(61)"
            class="w-[5rem] h-[1.8rem] text-[0.7rem] flex items-center justify-center rounded-full cursor-pointer font-normal transition duration-150 ease-in-out"
            :class="{
            'bg-yellow-400 text-white border border-white font-bold': age === 61,        // 选中样式
            'text-[#5AD3E7] border border-gray-300 bg-white': age !== 61, // 未选中样式
          }"
        >
          61岁及以上
        </div>
      </div>

<!--      <div class="flex">-->
<!--        <button @click="start"-->
<!--                class="flex-1-->
<!--              px-[2.75rem] py-[0.6rem] mx-auto mt-[2rem]-->
<!--              text-[1rem] font-bold text-white-->
<!--              bg-gradient-to-r from-orange-500 to-amber-400 border border-white-->
<!--              rounded-full-->
<!--          "-->
<!--        >-->
<!--          开始答题-->
<!--        </button>-->
<!--      </div>-->

    </div>

    <Toast v-if="tip" v-model:visible="tip" @close="tip = false" message="请选择身份和年龄!" />
  </div>
</template>