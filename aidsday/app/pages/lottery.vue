<script setup lang="ts">
import {ref} from 'vue'

useHead({
  title: '幸运大抽奖',
})

const isSpinning = ref(false)
const showWinModal = ref(false)
const showLoseModal = ref(false)
const plateRef = ref<HTMLElement | null>(null)

let tip = ref(false);
let prize = reactive({
  is_prize: 0,
  money: "0",
  can_prize: 0,
  name: '',
  prize_id: 1, // 1:谢谢参与，2:0.8，3:1.8，4:2.8，5:3.8，6:5.8
  prizelog_id: '',
});

// 6 个中奖区位置（每个区中心角度：假设 6 等分转盘，每 60 度一个）
const winPositions = [180, 120, 60, 0, 300, 240]; // 度，0 为指针指向位置
const amount = [0, 0.8, 1.8, 2.8, 3.8, 5.8];

const startSpin = async () => {
  let s = await getLucky();
  if (!s) {
    tip.value = true;
    return
  }

  if (isSpinning.value) return // 防止重复点击

  isSpinning.value = true
  showWinModal.value = false
  showLoseModal.value = false

  // 重置到 0 度（确保从头开始，避免上一次残留）
  if (plateRef.value) {
    plateRef.value.style.transition = 'none'
    plateRef.value.style.transform = 'rotate(0deg)'
  }

  // 强制重绘（避免摇晃）
  requestAnimationFrame(() => {
    // 随机选择一个中奖位置（只停在中奖区）
    const randomWinPos = winPositions[prize.prize_id - 1]

    // 随机生成旋转角度：5-8 圈 + 选中奖位置
    const fullCircles = Math.floor(Math.random() * 4 + 5) * 360 // 5-8 圈
    const totalRotation = fullCircles + randomWinPos

    // 应用旋转到底盘
    if (plateRef.value) {
      plateRef.value.style.transition = 'transform 5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' // 5s 平滑缓动
      plateRef.value.style.transform = `rotate(${totalRotation}deg)`
    }
  })

  // 动画结束后显示中奖结果（假设只停在中奖区，总是中奖）
  setTimeout(() => {
    isSpinning.value = false
    if (prize.prize_id > 1) {
      showWinModal.value = true
    } else {
      showLoseModal.value = true
    }
  }, 5000) // 匹配 5s 动画时长
}

// 关闭模态框（返回首页逻辑，可路由跳转）
const closeModal = () => {
  showWinModal.value = false
  showLoseModal.value = false

  // 重置转盘状态（允许重复抽奖）
  if (plateRef.value) {
    plateRef.value.style.transition = 'none'
    plateRef.value.style.transform = 'rotate(0deg)'
  }

  navigateTo({path: '/'});
}

//获取抽奖
const getLucky = async () => {
  const res = await useRequest(`/wxh5/index/postPrize`);
  // console.log(res)
  if (res && res.status && res.status != 0) {
    prize.name = res.msg;
    return false;
  } else {
    prize = Object.assign(prize, res.data);
    return true;
  }
}

</script>

<template>
  <div
      class="min-h-[34rem] h-screen bg-[url(~/assets/image/dati/bg_cover.png)] bg-bottom bg-no-repeat bg-cover relative">
    <img src="~/assets/image/lottery/title.png" class="w-[15.15rem] pt-[4.55rem] pb-[1rem] mx-auto" alt="title">

    <div class="relative flex flex-col pt-[0.8rem]">
      <img ref="plateRef" src="~/assets/image/lottery/prize-plate.png" class="w-[15.15rem] mx-auto" alt="prize-plate">
      <img @click="startSpin" src="~/assets/image/lottery/go.png"
           class="absolute top-[50%] left-[50%] -ml-[2rem] -mt-[2rem] w-[4rem]" alt="go">
    </div>

    <div class="flex flex-col justify-center">
      <button
          @click="startSpin"
          :disabled="isSpinning"
          class="
            px-[2.75rem] py-[0.6rem] mx-auto mt-[1.8rem]
            text-[1.2rem] font-bold text-white

            bg-gradient-to-t from-orange-500 to-amber-400

            shadow-xl rounded-full
            transform transition-transform duration-150 hover:scale-105 active:scale-95
            focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
        "
      >
        {{ isSpinning ? '抽奖中...' : '点击抽奖' }}
      </button>
    </div>

    <!--中奖-->
    <div v-if="showWinModal"
         class="fixed inset-0 bg-black/85 flex flex-col items-center justify-center max-w-[18.75rem] mx-auto p-4 z-50">
      <div class="popup-box w-full max-w-sm md:max-w-md px-2 pt-2 pb-6">
        <div class="text-center mb-[1rem]">
            <span
                class="inline-flex items-center justify-center p-2 rounded-full relative">
                <img src="~/assets/image/star.png" class="w-[0.9rem] mb-2" alt="star">
                <span class="text-yellow-600 font-bold text-[1.2rem] px-2">
                    恭喜你
                </span>
                <img src="~/assets/image/star.png" class="w-[0.6rem] mt-1" alt="star">
            </span>
        </div>
        <div class="mb-[1rem] flex flex-col items-center">
          <span class="text-[0.7rem] text-gray-800 text-center mb-[2rem]">
            获得 <span class="text-orange-500 font-bold text-3xl">{{ amount[prize.prize_id - 1] }}</span> 元红包</span>
          <span class="text-[0.65rem] text-[#999]">您的微信红包已发送，请在微信聊天界面查收</span>
        </div>
        <div class="text-center">
          <button @click="closeModal" class="py-[0.45rem] px-[4.35rem] min-w-[10rem] text-white font-normal text-[0.8rem] rounded-full
                           bg-yellow-400 hover:bg-yellow-500
                           transition duration-150 ease-in-out shadow-md
                           focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50">
            返回首页
          </button>
        </div>
      </div>
    </div>

    <!--未中奖-->
    <div v-if="showLoseModal"
         class="fixed inset-0 bg-black/85 flex flex-col items-center justify-center max-w-[18.75rem] mx-auto p-4 z-50">
      <div class="popup-box w-full max-w-sm md:max-w-md px-2 pt-2 pb-6">
        <div class="text-center mb-[1rem]">
            <span
                class="inline-flex items-center justify-center p-2 rounded-full relative">
                <img src="~/assets/image/star.png" class="w-[0.9rem] mb-2" alt="star">
                <span class="text-yellow-600 font-bold text-[1.2rem] px-2">
                    很遗憾
                </span>
                <img src="~/assets/image/star.png" class="w-[0.6rem] mt-1" alt="star">
            </span>
        </div>
        <div class="mb-[1rem] flex flex-col items-center">
          <span class="text-[1rem] text-gray-800 text-center mb-[1rem]">感谢你的参与</span>
          <span
              class="text-[0.65rem] text-[#999] text-center">偷偷告诉你，没抽中的玩家在活动期内每天都可以答题抽奖赢红包哦！</span>
        </div>
        <div class="text-center">
          <button @click="closeModal" class="py-[0.45rem] px-[4.35rem] min-w-[10rem] text-white font-normal text-[0.8rem] rounded-full
                           bg-yellow-400 hover:bg-yellow-500
                           transition duration-150 ease-in-out shadow-md
                           focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50">
            返回首页
          </button>
        </div>
      </div>
    </div>

    <Toast v-if="tip" v-model:visible="tip" @close="tip = false" :message="prize.name"/>
  </div>
</template>

<style scoped>
/* 转盘初始无旋转，确保中心旋转避免摇晃 */
img[ref="plateRef"] {
  transform-origin: center center;
  will-change: transform; /* 优化动画性能 */
}
</style>