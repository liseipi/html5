<script setup lang="ts">
import {useDatiStore} from '~/store/datiStore';

useHead({
  title: '调查问卷',
})

const datiStore = useDatiStore();

let qsTip = ref(true);
let qsDom = ref(false);
let statue = ref(false);

const {rightnum, can_prize} = reactive({...datiStore.dati});

//第1步，确定
const sure = () => {
  if(tip.value == '') return;
  qsTip.value = false;
  qsDom.value = true;
}

//第2步，完成
let doneState = ref(false);
const done = async () => {
  if(questionData.value.length != answerData.value.length) {
    doneState.value = true;
    return false;
  }

  await postAnswer();

  qsDom.value = false;
  statue.value = true;
}

let type = ref('A');
let tip = ref('');
let questionData = ref([]);
let answerData = ref([]);
//获取答题
const getQuestion = async () => {
  try {
    const res = await useRequest(`/wxh5/index/getquestionnaire`);
    if (res.status === 0 && res.data) {
      type.value = res.data.type;
      tip.value = res.data.tip;
      questionData.value = res.data.list;
      answerData.value = [];
    }
  } catch (err) {

  }
}

//选择答题项
const changeOption = (option, item) => {
  const existingIndex = answerData.value.findIndex(entry => entry.questionbank_ids === item.id);
  if (existingIndex !== -1) {
    answerData.value[existingIndex].answer = option.key;
  } else {
    answerData.value.push({ questionbank_ids: item.id, answer: option.key });
  }
}

//提交问卷
const postAnswer = async () => {
  let questionbank_ids = answerData.value.map(item => item.questionbank_ids).join(',');
  let answer = answerData.value.map(item => item.answer).join(',');
  const res = await useRequest(`/wxh5/index/postQuestionnaire`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data', // 开启后，上传文件会出错
    },
    query: {questionbank_ids, answer}
  });
}

//初始
onMounted(() => {
  getQuestion();
})

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
        <div class="mb-[1rem]">
          <div v-if="tip" class="text-[0.7rem]/6">
            {{tip}}
          </div>
          <div v-else class="min-h-[6rem] flex justify-center items-center">
            <svg class="mr-3 -ml-1 size-5 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
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
                <span class="text-yellow-600 font-bold text-[0.85rem] px-2">{{type}}问卷</span>
            </span>
        </div>
        <div class="mb-[1rem]">
          <div
              class="relative z-20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-[#FFCA3C] scrollbar-track-slate-300 max-h-[var(--qsspacing)] overflow-y-scroll">

            <div class="mb-[0.5rem]">
              <div class="space-y-[1rem]">
                <div class="space-y-[1rem]" v-for="(item, index) in questionData" :key="index">
                  <div class="font-medium text-[0.7rem] text-gray-800 leading-relaxed" v-html="item.content"></div>
                  <div class="space-y-[1rem]">
                    <label v-for="option in item.option" :key="option.key" @click="changeOption(option, item)"
                        class="flex items-start text-gray-700 cursor-pointer rounded-lg hover:bg-gray-50 transition">
                      <input type="radio" :name="`q${index}`" :value="option.key"
                             class="mt-[0.1rem] mr-3 w-3 h-3 text-yellow-500 focus:ring-yellow-400 border-gray-300">
                      <span class="text-[0.65rem]">
                        <span class="mr-1">{{option.key}}.</span>{{option.content}}
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
            完成答题
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
          <button v-show="can_prize==1" @click="navigateTo({path: '/lottery'})" class="flex-1 py-[0.65rem] text-white font-normal text-[0.75rem] rounded-full
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

    <Toast v-if="doneState" v-model:visible="doneState" @close="doneState = false" message="请完成问卷内容!" />
  </div>
</template>