<template>
  <div class="fixed z-50 left-0 bottom-0">
    <button
        @click="playRandomMelody"
        :class="buttonClasses"
        :aria-label="status ? '暂停音乐' : '播放音乐'"
    >
      <!-- SVG 图标（音乐符号） -->
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
      </svg>
    </button>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isPlaying = ref(false);
const status = ref('Tone.js 已加载，点击随机播放');
const currentMelody = ref([]);
let toneLoaded = false;
let synth = null;
let loop = null;
let scriptElement = null;

const buttonClasses = computed(() => {
  const playing = isPlaying.value;
  return `inline-flex items-center justify-center p-2 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
      playing ? 'bg-blue-500 text-white' : 'bg-red-300 text-red-800'
  }`;
});

// 动态加载 Tone.js
const loadToneJs = () => {
  if (toneLoaded || scriptElement) return;

  scriptElement = document.createElement('script');
  scriptElement.src = 'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js';
  scriptElement.async = true;

  scriptElement.onload = () => {
    console.log('Tone.js 加载成功');
    toneLoaded = true;
    status.value = 'Tone.js 已加载，点击随机播放';
  };

  scriptElement.onerror = () => {
    console.error('Tone.js 加载失败');
    status.value = '加载失败';
  };

  document.head.appendChild(scriptElement);
};

// 生成随机旋律（8 个音符，从 C 大调音阶随机选）
const generateRandomMelody = () => {
  const scale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
  const melody = [];
  for (let i = 0; i < 8; i++) {
    melody.push(scale[Math.floor(Math.random() * scale.length)]);
  }
  return melody;
};

// 随机播放旋律（循环）
const playRandomMelody = async () => {
  if (!toneLoaded) {
    loadToneJs();
    return;
  }

  if (isPlaying.value) {
    stopMelody();
    return
  };

  try {
    // 首次启动音频上下文
    if (Tone.context.state === 'suspended') {
      await Tone.start();
    }

    // 创建合成器
    if (!synth) {
      synth = new Tone.Synth().toDestination();
    }

    // 生成随机旋律
    const melody = generateRandomMelody();
    currentMelody.value = melody;
    let step = 0;

    // 使用 Tone.Loop 循环播放
    loop = new Tone.Loop((time) => {
      const note = melody[step % melody.length];
      synth.triggerAttackRelease(note, '8n', time);
      step++;
    }, '8n'); // 每个音符 200ms

    loop.start(0);
    await Tone.Transport.start();

    isPlaying.value = true;
    status.value = '随机旋律循环播放中...';
  } catch (error) {
    console.error('播放失败', error);
    status.value = '播放失败';
  }
};

// 停止播放
const stopMelody = () => {
  if (isPlaying.value) {
    Tone.Transport.stop();
    if (loop) {
      loop.dispose();
      loop = null;
    }
    isPlaying.value = false;
    currentMelody.value = [];
    status.value = '已停止，点击重新随机播放';
  }
};

// 组件挂载时准备
onMounted(() => {
  loadToneJs();
});

// 组件卸载时清理
onBeforeUnmount(() => {
  if (synth) {
    synth.dispose();
  }
  if (loop) {
    loop.dispose();
  }
  if (scriptElement && scriptElement.parentNode) {
    scriptElement.parentNode.removeChild(scriptElement);
  }
  Tone.Transport.stop();
});
</script>

<style scoped>
.music-player {
  padding: 20px;
  text-align: center;
}
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
}
button:disabled {
  opacity: 0.5;
}
p {
  margin: 10px 0;
}
</style>