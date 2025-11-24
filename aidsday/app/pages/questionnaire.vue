<script setup lang="ts">
import {useDatiStore} from '~/store/datiStore';

useHead({
  title: '调查问卷',
})

const datiStore = useDatiStore();

let qsTip = ref(true);
let qsDom = ref(false);
let statue = ref(false);

const {rightnum, is_prize, prize_status} = reactive({...datiStore.dati});

//第1步，确定
const sure = () => {
  qsTip.value = false;
  qsDom.value = true;
}

//第2步，完成
const done = () => {
  qsDom.value = false;
  statue.value = true;
}

</script>

<template>
  <div class="min-h-[34rem] h-screen bg-[url(~/assets/image/dati/bg_cover.png)] bg-bottom bg-no-repeat bg-size-[18.75rem_34rem] relative">
<!--    <img src="~/assets/image/dati/bg_cover.png" class="w-full" alt="bg">-->

    <!--调查问卷提示-->
    <div v-show="qsTip" class="fixed inset-0 flex flex-col items-center justify-center max-w-[18.75rem] mx-auto p-6 z-50">
      <div class="popup-box w-full max-w-sm md:max-w-md px-6 pt-2 pb-6">
        <div class="text-center mb-[1rem]">
            <span
                class="inline-flex items-center justify-center p-2 rounded-full relative">
                <img src="~/assets/image/star.png" class="w-[0.9rem] mb-2" alt="star">
                <span class="text-yellow-600 font-bold text-[0.85rem] px-2">
                    调查问卷
                </span>
                <img src="~/assets/image/star.png" class="w-[0.6rem] mt-1" alt="star">
            </span>
        </div>
        <div class="mb-8">
          <ul class="text-base/6">
            <li class="flex items-start pb-[1rem]">
              <span
                  class="text-[0.7rem] text-gray-800">接下来还有一份调查问卷，一共5道题，希望大家抽空填写一下（答题时间预计小于一分钟）。</span>
            </li>
            <li class="flex items-start">
              <span class="text-[0.7rem] text-gray-800">本次调查问卷不记名，仅作为学术研究使用。调查问卷的选择情况不计入本次防艾达人挑战赛的积分，请大家根据自己的认识情况填写。感谢大家！</span>
            </li>
          </ul>
        </div>
        <div class="text-center">
          <button @click="sure" class="py-[0.65rem] px-[1.65rem] min-w-[10rem] text-white font-normal text-[1rem] rounded-full
                           bg-yellow-400 hover:bg-yellow-500
                           transition duration-150 ease-in-out shadow-md
                           focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50">
            确定
          </button>
        </div>
      </div>
    </div>

    <!--问卷-->
    <div v-show="qsDom" class="fixed inset-0 flex flex-col items-center justify-center max-w-[18.75rem] mx-auto p-4 z-50">
      <div class="popup-box w-full max-w-sm md:max-w-md px-3 pt-2 pb-6">
        <div class="text-center mb-[1rem]">
            <span class="inline-flex items-center justify-center p-2 rounded-full relative">
                <span class="text-yellow-600 font-bold text-[0.85rem] px-2">A问卷</span>
            </span>
        </div>
        <div class="mb-8">
          <div
              class="relative z-20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-[#FFCA3C] scrollbar-track-slate-300 max-h-[var(--qsspacing)] overflow-y-scroll">

            <div class="mb-6">
              <div class="space-y-[1rem]">
                <div class="space-y-[1rem]">
                  <p class="font-medium text-[0.7rem] text-gray-800 leading-relaxed">
                    1. 艾滋病病毒感染者和艾滋病患者是否将其感染状况告知配偶或者与有性关系者，是他们的自由，不受法律约束吗?(单选)
                  </p>
                  <div class="space-y-[1rem]">
                    <label
                        class="flex items-start text-gray-700 cursor-pointer rounded-lg hover:bg-gray-50 transition">
                      <input type="radio" name="q1" value="A"
                             class="mt-[0.1rem] mr-3 w-3 h-3 text-yellow-500 focus:ring-yellow-400 border-gray-300">
                      <span class="text-[0.65rem]">
                      <span class="mr-1">A.</span>
                      是，是否告知完全取决于个人意愿
                  </span>
                    </label>

                    <label
                        class="flex items-start text-gray-700 cursor-pointer rounded-lg hover:bg-gray-50 transition">
                      <input type="radio" name="q1" value="B"
                             class="mt-[0.1rem] mr-3 w-3 h-3 text-yellow-500 focus:ring-yellow-400 border-yellow-500"
                             checked>
                      <span class="text-[0.65rem]">
                      <span class="mr-1">B.</span>
                      如果严格采取防护措施，可不告知
                  </span>
                    </label>

                    <label
                        class="flex items-start text-gray-700 cursor-pointer rounded-lg hover:bg-gray-50 transition">
                      <input type="radio" name="q1" value="C"
                             class="mt-[0.1rem] mr-3 w-3 h-3 text-yellow-500 focus:ring-yellow-400 border-gray-300">
                      <span class="text-[0.65rem]">
                        <span class="mr-1">C.</span>
                        应当告知，但可通过医疗卫生机构代为沟通
                    </span>
                    </label>

                    <label
                        class="flex items-start text-gray-700 cursor-pointer rounded-lg hover:bg-gray-50 transition">
                      <input type="radio" name="q1" value="D"
                             class="mt-[0.1rem] mr-3 w-3 h-3 text-yellow-500 focus:ring-yellow-400 border-gray-300">
                      <span class="text-[0.65rem]">
                      <span class="mr-1">D.</span>
                      不知道
                    </span>
                    </label>
                  </div>
                </div>

                <div class="space-y-[1rem]">
                  <p class="font-medium text-[0.7rem] text-gray-800 leading-relaxed">
                    2. 医疗卫生机构可以因就诊者是艾滋病病毒感染者或者艾滋病病人而推诿或者拒绝对其其他疾病进行治疗吗?(单选)
                  </p>
                  <div class="space-y-[1rem]">
                    <label
                        class="flex items-start text-gray-700 cursor-pointer rounded-lg hover:bg-gray-50 transition">
                      <input type="radio" name="q2" value="A"
                             class="mt-[0.1rem] mr-3 w-3 h-3 text-yellow-500 focus:ring-yellow-400 border-gray-300">
                      <span class="text-[0.65rem]">
                      <span class="mr-1">A.</span>
                      是
                  </span>
                    </label>

                    <label
                        class="flex items-start text-gray-700 cursor-pointer rounded-lg hover:bg-gray-50 transition">
                      <input type="radio" name="q2" value="B"
                             class="mt-[0.1rem] mr-3 w-3 h-3 text-yellow-500 focus:ring-yellow-400 border-yellow-500"
                             checked>
                      <span class="text-[0.65rem]">
                      <span class="mr-1">B.</span>
                      否
                  </span>
                    </label>

                    <label
                        class="flex items-start text-gray-700 cursor-pointer rounded-lg hover:bg-gray-50 transition">
                      <input type="radio" name="q2" value="C"
                             class="mt-[0.1rem] mr-3 w-3 h-3 text-yellow-500 focus:ring-yellow-400 border-gray-300">
                      <span class="text-[0.65rem]">
                        <span class="mr-1">C.</span>
                        不知道
                    </span>
                    </label>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="text-center">
          <button @click="done" class="py-[0.65rem] px-[1.65rem] min-w-[10rem] text-white font-normal text-[1rem] rounded-full
                           bg-yellow-400 hover:bg-yellow-500
                           transition duration-150 ease-in-out shadow-md
                           focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50">
            确定
          </button>
        </div>
      </div>
    </div>

    <!--答题完成|达人-->
    <div v-show="statue && rightnum>=8" class="fixed inset-0 flex flex-col items-center justify-center max-w-[18.75rem] h-full mx-auto p-6 z-30">
      <div class="popup-box w-full max-w-sm md:max-w-md px-6 pt-2 pb-6 relative z-10">
        <div class="absolute left-[2.8rem] -top-[5rem] z-50">
          <img src="~/assets/image/qs/expert.png" class="w-[10.7rem]"  alt="expert">
        </div>

        <div class="text-center pt-24 pb-4">
          <p class="text-xl font-semibold mb-2">太厉害了!</p>
          <p class="text-[0.75rem] text-gray-800 leading-relaxed">
            你以
            <span class="text-orange-500 font-bold text-2xl">{{rightnum}}</span>
            题答对的战绩完美通关，
          </p>
          <p class="text-[0.75rem] text-gray-800 leading-relaxed mb-4">
            获得 <span class="text-red-500 font-bold">“防艾达人”</span> 称号!
          </p>
          <p class="text-[0.75rem] text-gray-600">请收下这份荣誉。</p>
        </div>

        <hr class="border-t border-dashed border-gray-200 my-4"/>

        <div class="flex items-center my-6">
          <!--          <hr class="flex-grow border-gray-200">-->
          <span class="mx-auto text-[0.65rem] text-[#999] text-center whitespace-nowrap">快去抽取你的幸运红包吧!</span>
          <!--          <hr class="flex-grow border-gray-200">-->
        </div>

        <div class="flex flex-row gap-2">
          <button @click="navigateTo({path: '/share'})" class="flex-1 py-[0.65rem] text-white font-normal text-[0.75rem] rounded-full
                           bg-yellow-400 hover:bg-yellow-500">
            生成海报
          </button>
          <button @click="navigateTo({path: '/lottery'})" class="flex-1 py-[0.65rem] text-white font-normal text-[0.75rem] rounded-full
                           bg-yellow-400 hover:bg-yellow-500">
            抽幸运红包
          </button>
        </div>
      </div>
    </div>
    <!--答题完成|同行者-->
    <div v-show="statue && rightnum<8" class="fixed inset-0 flex flex-col items-center justify-center max-w-[18.75rem] h-full mx-auto p-6 z-30">
      <div class="popup-box w-full max-w-sm md:max-w-md px-6 pt-2 pb-6 relative z-10">
        <div class="absolute left-[2.8rem] -top-[5rem] z-50">
          <img src="~/assets/image/qs/peers.png" class="w-[10.7rem]"  alt="peers">
        </div>

        <div class="text-center pt-24 pb-4">
          <p class="text-[0.75rem] font-semibold mb-2">感谢你的积极参与！</p>
          <p class="text-[0.75rem] text-gray-800 leading-relaxed">
            你答对了
            <span class="text-orange-500 font-bold text-2xl">{{rightnum}}</span>
            题，
          </p>
          <p class="text-[0.75rem] text-gray-800 leading-relaxed mb-4">
            成为 <span class="text-red-500 font-bold">“防艾同行者”</span> !
          </p>
          <p class="text-[0.75rem] text-gray-600 text-left">了解正确的知识，是我们携手抗击艾滋病的第一步。 不如再来挑战一次吧！</p>
        </div>

        <hr class="border-t border-dashed border-gray-200 my-4"/>

        <div class="flex items-center my-6">
          <!--          <hr class="flex-grow border-gray-200">-->
          <span class="mx-auto text-[0.65rem] text-[#999] text-center whitespace-nowrap">挑战成功就会赢取抽幸运红包机会哦！</span>
          <!--          <hr class="flex-grow border-gray-200">-->
        </div>

        <div class="flex flex-row gap-2">
          <button @click="navigateTo({path: '/'})" class="flex-1 py-[0.65rem] text-white font-normal text-[0.75rem] rounded-full
                           bg-yellow-400 hover:bg-yellow-500">
            再学一次，马上进阶
          </button>
        </div>
      </div>
    </div>

  </div>
</template>