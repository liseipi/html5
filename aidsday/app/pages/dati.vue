<script setup lang="ts">
useHead({
  title: '开始答题',
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center bg-cover bg-center relative">
    <img src="~/assets/image/dati/bg_cover.png" class="w-full" alt="bg">

    <img src="~/assets/image/dati/girl.png" class="absolute z-20 top-[4.6rem] w-[4.45rem] left-[2.25rem]" alt="tips">
    <img src="~/assets/image/dati/tips.png" class="absolute top-[4.6rem] w-[4.6rem] right-0" alt="tips">
    <div class="absolute top-[7.1rem] left-[8.1rem]">
      <span class="font-medium font-sans text-[1.6rem] tracking-widest">
        <strong class="text-[#FFCA3C]">1</strong>
        <strong class="text-white">/10</strong>
      </span>
    </div>
    <div class="absolute top-[10rem] left-0 w-full px-6">
      <div class="w-full max-w-lg bg-white rounded-3xl shadow-xl z-10 p-4">
        <div class="text-[0.85rem] font-semibold pt-[1.5rem] text-gray-800">以下说法错误的是 ( )</div>
        <div class="space-y-[0.8rem] pt-[1.2rem]">
          <div class="px-4 py-2 rounded-xl border border-gray-200 shadow-sm hover:border-blue-400 flex">
            <span class="font-bold text-[0.7rem] mr-2 text-gray-700">A</span>
            <span class="text-[#333] text-[0.7rem]">HIV 通过性接触、血液和母婴三种途径传播，其中性传播是我国感染的最主要传播途径。</span>
          </div>

          <div class="px-4 py-2 rounded-xl border-[0.05rem] border-[#FFCA3C] bg-yellow-50 flex">
            <span class="font-bold text-[0.7rem]  mr-2 text-[#FFCA3C]">B</span>
            <span class="text-[#FFCA3C] text-[0.7rem]">目前，艾滋病有疫苗可以预防。</span>
          </div>

          <div class="px-4 py-2 rounded-xl border border-gray-200 shadow-sm hover:border-blue-400 flex">
            <span class="font-bold text-[0.7rem] mr-2 text-gray-700">C</span>
            <span class="text-[#333] text-[0.7rem]">日常接触如握手、吃饭、公共卫生间等不传播艾滋病。</span>
          </div>

          <div class="px-4 py-2 rounded-xl border border-gray-200 shadow-sm hover:border-blue-400 flex">
            <span class="font-bold text-[0.7rem] mr-2 text-gray-700">D</span>
            <span class="text-[#333] text-[0.7rem]">故意传播艾滋病的行为既不道德，又要承担法律责任。</span>
          </div>

        </div>

      </div>

      <div class="relative pt-6">
        <button class="w-[10.7rem] h-[2.6rem] flex items-center justify-center mx-auto
                       bg-yellow-400 hover:bg-yellow-500 border-[0.05rem]
                       text-white text-[1rem] font-bold
                       rounded-full shadow-xl
                       transition duration-200 ease-in-out z-30 mb-8">
          提交答案
        </button>
      </div>
    </div>

    <!--学习防艾锦囊-->
    <div class="fixed inset-0 bg-black/85 flex flex-col items-center justify-center p-6 z-50 hidden">
      <div class="popup-box w-full max-w-sm md:max-w-md px-6 pt-2 pb-6">
        <div class="text-center mb-[1rem]">
            <span
                class="inline-flex items-center justify-center p-2 rounded-full relative">
                <img src="~/assets/image/star.png" class="w-[0.9rem] mb-2" alt="star">
                <span class="text-yellow-600 font-bold text-[0.85rem] px-2">
                    防艾锦囊
                </span>
                <img src="~/assets/image/star.png" class="w-[0.6rem] mt-1" alt="star">
            </span>
        </div>
        <div class="mb-8">
          <ul>
            <li class="flex items-start">
              <span class="text-[0.7rem] leading-none mr-2">•</span>
              <span class="text-[0.7rem] text-gray-800">艾滋病是一种危害大、病死率高的重大传染病，目前既不可治愈，也没有疫苗。艾滋病是 HIV 感染的最严重形式。</span>
            </li>
            <li class="flex items-start">
              <span class="text-[0.7rem] leading-none mr-2">•</span>
              <span class="text-[0.7rem] text-gray-800">HIV通过通过性接触、血液和母婴三种途径传播，其中性传播是我国感染的最主要传播途径。日常接触如握手、吃饭、拥抱、公用卫生间等不会传播艾滋病病毒。蚊虫叮咬不会传播艾滋病病毒。</span>
            </li>
            <li class="flex items-start">
              <span class="text-[0.7rem] leading-none mr-2">•</span>
              <span class="text-[0.7rem] text-gray-800">HIV感染者和艾滋病患者都是艾滋病的受害者，应该得到理解和关心，但故意传播艾滋病的行为既不道德，也要承担法律责任。</span>
            </li>
          </ul>
        </div>
        <div class="text-center">
          <button class="py-[0.65rem] px-[1.65rem] min-w-[10rem] text-white font-normal text-[0.75rem] rounded-full
                           bg-yellow-400 hover:bg-yellow-500
                           transition duration-150 ease-in-out shadow-md
                           focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50">
            我已学习
          </button>
        </div>
      </div>

      <div class="pt-8">
        <button
            class="mt-3 p-[0.15rem] rounded-full border-2 border-white text-white hover:bg-white hover:text-gray-800 transition">
          <svg class="w-[1.5rem] h-[1.5rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!--女生回答正确-->
    <div class="fixed inset-0 bg-black/85 flex flex-col items-center justify-center p-6 z-50 hidden">
      <div class="popup-box w-full max-w-sm md:max-w-md px-6 pt-2 pb-6 relative">
        <div class="absolute -top-[8.2rem]">
          <img src="~/assets/image/dati/girl_correct.png" class="w-[11.75rem]"  alt="girl_correct">
        </div>
        <div class="flex flex-col justify-center items-center mb-8">
          <img src="~/assets/image/dati/correct.png" class="w-[3rem]" alt="correct">
          <span class="text-[1.2rem] text-[#AECD42]">回答正确</span>
        </div>
        <div class="text-center">
          <button class="py-[0.65rem] px-[1.65rem] min-w-[10rem] text-white font-normal text-[0.75rem] rounded-full
                           bg-yellow-400 hover:bg-yellow-500
                           transition duration-150 ease-in-out shadow-md
                           focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50">
            下一题
          </button>
        </div>
      </div>
    </div>
    <!--女生回答错误-->
    <div class="fixed inset-0 bg-black/85 flex flex-col items-center justify-center p-6 z-50 hidden">
      <div class="popup-box w-full max-w-sm md:max-w-md px-6 pt-2 pb-6 relative">
        <div class="absolute left-[2rem] -top-[7rem]">
          <img src="~/assets/image/dati/girl_mistake.png" class="w-[10.7rem]"  alt="girl_mistake">
        </div>
        <div class="flex flex-col justify-center items-center pt-[1rem] mb-[1.25rem]">
          <img src="~/assets/image/dati/mistake.png" class="w-[3rem]" alt="mistake">
          <span class="text-[1.2rem] text-[#AECD42]">回答错误</span>
        </div>
        <div class="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-[#FFCA3C] scrollbar-track-slate-300 mb-4 h-[10.5rem] overflow-y-scroll">
          <ul class="h-full">
            <li class="flex items-start">
              <span class="text-[0.7rem] leading-none mr-2">•</span>
              <span class="text-[0.7rem] text-gray-800">艾滋病是一种危害大、病死率高的重大传染病，目前既不可治愈，也没有疫苗。艾滋病是 HIV 感染的最严重形式。</span>
            </li>
            <li class="flex items-start">
              <span class="text-[0.7rem] leading-none mr-2">•</span>
              <span class="text-[0.7rem] text-gray-800">HIV通过通过性接触、血液和母婴三种途径传播，其中性传播是我国感染的最主要传播途径。日常接触如握手、吃饭、拥抱、公用卫生间等不会传播艾滋病病毒。蚊虫叮咬不会传播艾滋病病毒。</span>
            </li>
            <li class="flex items-start">
              <span class="text-[0.7rem] leading-none mr-2">•</span>
              <span class="text-[0.7rem] text-gray-800">HIV感染者和艾滋病患者都是艾滋病的受害者，应该得到理解和关心，但故意传播艾滋病的行为既不道德，也要承担法律责任。</span>
            </li>
          </ul>
        </div>
        <div class="text-center">
          <button class="py-[0.65rem] px-[1.65rem] min-w-[10rem] text-white font-normal text-[0.75rem] rounded-full
                           bg-yellow-400 hover:bg-yellow-500
                           transition duration-150 ease-in-out shadow-md
                           focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50">
            下一题
          </button>
        </div>
      </div>
    </div>

    <!--男生回答正确-->
    <div class="fixed inset-0 bg-black/85 flex flex-col items-center justify-center p-6 z-50 hidden">
      <div class="popup-box w-full max-w-sm md:max-w-md px-6 pt-2 pb-6 relative">
        <div class="absolute -top-[8.3rem]">
          <img src="~/assets/image/dati/boy_correct.png" class="w-[11.75rem]"  alt="boy_correct">
        </div>
        <div class="flex flex-col justify-center items-center mb-8">
          <img src="~/assets/image/dati/correct.png" class="w-[3rem]" alt="correct">
          <span class="text-[1.2rem] text-[#AECD42]">回答正确</span>
        </div>
        <div class="text-center">
          <button class="py-[0.65rem] px-[1.65rem] min-w-[10rem] text-white font-normal text-[0.75rem] rounded-full
                           bg-yellow-400 hover:bg-yellow-500
                           transition duration-150 ease-in-out shadow-md
                           focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50">
            下一题
          </button>
        </div>
      </div>
    </div>
    <!--男生回答错误-->
    <div class="fixed inset-0 bg-black/85 flex flex-col items-center justify-center p-6 z-50 hidden">
      <div class="popup-box w-full max-w-sm md:max-w-md px-6 pt-2 pb-6 relative">
        <div class="absolute left-[2.8rem] -top-[8rem]">
          <img src="~/assets/image/dati/boy_mistake.png" class="w-[10.7rem]"  alt="boy_mistake">
        </div>
        <div class="flex flex-col justify-center items-center pt-[1rem] mb-[1.25rem]">
          <img src="~/assets/image/dati/mistake.png" class="w-[3rem]" alt="mistake">
          <span class="text-[1.2rem] text-[#AECD42]">回答错误</span>
        </div>
        <div class="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-[#FFCA3C] scrollbar-track-slate-300 mb-4 h-[10.5rem] overflow-y-scroll">
          <ul class="h-full">
            <li class="flex items-start">
              <span class="text-[0.7rem] leading-none mr-2">•</span>
              <span class="text-[0.7rem] text-gray-800">艾滋病是一种危害大、病死率高的重大传染病，目前既不可治愈，也没有疫苗。艾滋病是 HIV 感染的最严重形式。</span>
            </li>
            <li class="flex items-start">
              <span class="text-[0.7rem] leading-none mr-2">•</span>
              <span class="text-[0.7rem] text-gray-800">HIV通过通过性接触、血液和母婴三种途径传播，其中性传播是我国感染的最主要传播途径。日常接触如握手、吃饭、拥抱、公用卫生间等不会传播艾滋病病毒。蚊虫叮咬不会传播艾滋病病毒。</span>
            </li>
            <li class="flex items-start">
              <span class="text-[0.7rem] leading-none mr-2">•</span>
              <span class="text-[0.7rem] text-gray-800">HIV感染者和艾滋病患者都是艾滋病的受害者，应该得到理解和关心，但故意传播艾滋病的行为既不道德，也要承担法律责任。</span>
            </li>
          </ul>
        </div>
        <div class="text-center">
          <button class="py-[0.65rem] px-[1.65rem] min-w-[10rem] text-white font-normal text-[0.75rem] rounded-full
                           bg-yellow-400 hover:bg-yellow-500
                           transition duration-150 ease-in-out shadow-md
                           focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50">
            下一题
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>