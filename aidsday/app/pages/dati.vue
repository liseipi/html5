<script setup lang="ts">
import {useUserInfoStore} from '~/store/userStore';
import {useDatiStore} from '~/store/datiStore';

useHead({
  title: '开始答题',
})

const userInfoStore = useUserInfoStore();
const {gender} = reactive({...userInfoStore});
const datiStore = useDatiStore();

let questionData = ref([]);
let answerData = ref([]);
//获取答题
const getQuestion = async () => {
  try {
    const res = await useRequest(`/wxh5/index/getquestion`);
    if (res.status === 0 && res.data) {
      questionData.value = res.data;
      answerData.value = [];
    }
  } catch (err) {

  }
}

//选择答题项
let optionKey = ref(''); //用户选择的项：A/B/C
let datiStatue = ref(false); //正在答题状态
let answerStatue = ref(false); //答题 对/错 状态
let questionIndex = ref(0); //正在回答的题号
const changeOption = async (option, item) => {
  optionKey.value = option.key;
  questionIndex.value = item.id;
  datiStatue.value = true;

  //回答错误里内容滚动回到顶部
  await nextTick();
  tipDom.value?.scrollTo({ top: 0, behavior: 'smooth' });

  //选择后立即计算回答
  answerStatue.value = calcAnswer(item.answer);
}

//计算回答
const calcAnswer = (answer) => {
  return optionKey.value == answer;
}

//答题结果
let endQuest = ref(false);
let endQuestData = reactive({
  rightnum: 0,
  msg: '',
  is_prize: 0,
  prize_status: 0
});

//下一题
const nextQuestion = () => {
  datiStatue.value = false;
  answerData.value.push({questionbank_ids: questionIndex.value, answer: optionKey.value});
  // console.log(answerData.value)
  optionKey.value = '';
  if (answerData.value.length == questionData.value.length) {
    endQuest.value = true;
    //最后一题就发送答案到后台
    postAnswer();
  }
}

//提交回答问题
const postAnswer = async () => {
  let questionbank_ids = answerData.value.map(item => item.questionbank_ids).join(',');
  let answer = answerData.value.map(item => item.answer).join(',');
  const res = await useRequest(`/wxh5/index/postAnswer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data', // 开启后，上传文件会出错
    },
    query: {questionbank_ids, answer}
  });
  if (res.status == 0 && res.data) {
    endQuestData = Object.assign(endQuestData, res.data);
    datiStore.setDati(res.data);
    navigateTo({path: '/questionnaire'});
  }
}

//显示锦囊
let showTip = ref(false);
let tipDom = ref<HTMLElement | null>(null);
let tipText = computed(() => {
  return questionData.value[answerData.value.length];
})
let showTipText = async () => {
  showTip.value = true;
}

//初始
onMounted(() => {
  getQuestion();
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center bg-cover bg-center relative">
    <img src="~/assets/image/dati/bg_cover.png" class="w-full" alt="bg">

    <img v-if="gender==1" src="~/assets/image/dati/boy.png"
         class="absolute z-20 top-[4.6rem] w-[4.45rem] left-[2.25rem]" alt="boy">
    <img v-if="gender==2" src="~/assets/image/dati/girl.png"
         class="absolute z-20 top-[4.6rem] w-[4.45rem] left-[2.25rem]" alt="girl">

    <img @click="showTipText" src="~/assets/image/dati/tips.png" v-if="questionData.length>0"
         class="animate-bounce absolute top-[4.6rem] w-[4.6rem] right-0" alt="tips">

    <div v-if="questionData.length>0" class="absolute top-[7.1rem] left-[8.1rem]">
      <span class="font-medium font-sans text-[1.6rem] tracking-widest">
        <strong class="text-[#FFCA3C]">{{
            answerData.length + 1 > questionData.length ? questionData.length : answerData.length + 1
          }}</strong>
        <strong class="text-white">/{{ questionData.length }}</strong>
      </span>
    </div>

    <div class="absolute top-[10rem] left-0 w-full px-6">
      <div class="w-full max-w-lg bg-white rounded-3xl shadow-xl z-10 p-4">
        <div v-if="questionData.length==0"
             class="relative pt-[2rem] min-h-[20rem] text-[1rem] text-black text-center text-nowrap">
          正在生成问题...
        </div>
        <div v-else>
          <div class="min-h-[16rem]" v-for="(item, index) in questionData" :key="index"
               v-show="answerData.length==index">
            <div class="text-[0.85rem] font-semibold pt-[1.5rem] text-gray-800" v-html="item.content"></div>
            <div class="space-y-[0.8rem] py-[1.2rem]">
              <div v-for="(option, i) in item.option" :key="i" @click="changeOption(option, item)"
                   v-show="option.content"
                   class="px-4 py-2 rounded-xl shadow-sm hover:border-blue-400 flex"
                   :class="{
                      'border-[0.05rem] border-[#FFCA3C] bg-yellow-50': optionKey === option.key,
                      'border border-gray-200': optionKey != option.key,
                   }"
              >
                <span class="font-bold text-[0.7rem] mr-2 text-gray-700">{{ option.key }}</span>
                <span class="text-[#333] text-[0.7rem]"> {{ option.content }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-show="answerData.length==questionData.length" class="min-h-[16rem]">
          <div class="flex items-center justify-center w-full p-5 bg-neutral-primary" data-component-loader="">
            <div role="status">
              <svg class="mr-3 -ml-1 size-5 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
                <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <span class="text-[0.8rem]">正在提交答题...</span>
          </div>
        </div>
      </div>
      <!--      <div v-show="questionData.length>0" class="relative pt-6">-->
      <!--        <button class="w-[10.7rem] h-[2.6rem] flex items-center justify-center mx-auto-->
      <!--                       bg-yellow-400 hover:bg-yellow-500 border-[0.05rem]-->
      <!--                       text-white text-[1rem] font-bold-->
      <!--                       rounded-full shadow-xl-->
      <!--                       transition duration-200 ease-in-out z-30 mb-8">-->
      <!--          提交答案-->
      <!--        </button>-->
      <!--      </div>-->
    </div>

    <!--学习防艾锦囊-->
    <div v-show="showTip" class="fixed inset-0 bg-black/85 flex flex-col items-center justify-center p-6 z-50">
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
        <div class="mb-[1rem]">
          <div class="space-y-1 text-[0.7rem] text-gray-800" v-html="tipText?.tip"></div>
        </div>
        <div class="text-center">
          <button @click="showTip=false" class="py-[0.65rem] px-[1.65rem] min-w-[10rem] text-white font-normal text-[0.75rem] rounded-full
                           bg-yellow-400 hover:bg-yellow-500
                           transition duration-150 ease-in-out shadow-md
                           focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50">
            我已学习
          </button>
        </div>
      </div>

      <div class="pt-8">
        <button @click="showTip=false"
            class="mt-3 p-[0.15rem] rounded-full border-2 border-white text-white hover:bg-white hover:text-gray-800 transition">
          <svg class="w-[1.5rem] h-[1.5rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!--回答正确-->
    <div v-show="datiStatue&&answerStatue"
         class="fixed inset-0 bg-black/85 flex flex-col items-center justify-center p-6 z-50">
      <div class="popup-box w-full max-w-sm md:max-w-md px-6 pt-2 pb-6 relative">
        <div class="absolute -top-[8.2rem]">
          <img v-show="gender==1" src="~/assets/image/dati/boy_correct.png" class="w-[11.75rem]" alt="boy_correct">
          <img v-show="gender==2" src="~/assets/image/dati/girl_correct.png" class="w-[11.75rem]" alt="girl_correct">
        </div>
        <div class="flex flex-col justify-center items-center mb-8">
          <img src="~/assets/image/dati/correct.png" class="w-[3rem]" alt="correct">
          <span class="text-[1.2rem] text-[#AECD42]">回答正确</span>
        </div>
        <div class="text-center">
          <button @click="nextQuestion" class="py-[0.65rem] px-[1.65rem] min-w-[10rem] text-white font-normal text-[0.75rem] rounded-full
                           bg-yellow-400 hover:bg-yellow-500
                           transition duration-150 ease-in-out shadow-md
                           focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50">
            {{ questionData.length == answerData.length + 1 ? '答题结束' : '下一题' }}
          </button>
        </div>
      </div>
    </div>
    <!--回答错误-->
    <div v-show="datiStatue&&!answerStatue"
         class="fixed inset-0 bg-black/85 flex flex-col items-center justify-center p-6 z-50">
      <div class="popup-box w-full max-w-sm md:max-w-md px-6 pt-2 pb-6 relative">
        <div class="absolute left-[2rem] -top-[7rem]">
          <img v-show="gender==1" src="~/assets/image/dati/boy_mistake.png" class="w-[10.7rem]" alt="boy_mistake">
          <img v-show="gender==2" src="~/assets/image/dati/girl_mistake.png" class="w-[10.7rem]" alt="girl_mistake">
        </div>
        <div class="flex flex-col justify-center items-center pt-[1rem] mb-[1.25rem]">
          <img src="~/assets/image/dati/mistake.png" class="w-[3rem]" alt="mistake">
          <span class="text-[1.2rem] text-[#AECD42]">回答错误</span>
        </div>
        <div ref="tipDom"
            class="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-[#FFCA3C] scrollbar-track-slate-300 mb-4 h-[10.5rem] overflow-y-scroll">
          <div class="space-y-1 text-[0.7rem] text-gray-800" v-html="tipText?.tip"></div>
        </div>
        <div class="text-center">
          <button @click="nextQuestion" class="py-[0.65rem] px-[1.65rem] min-w-[10rem] text-white font-normal text-[0.75rem] rounded-full
                           bg-yellow-400 hover:bg-yellow-500
                           transition duration-150 ease-in-out shadow-md
                           focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50">
            {{ questionData.length == answerData.length + 1 ? '答题结束' : '下一题' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>