<template>
  <div class="fixed z-40 top-1 right-1">
    <button
        @click="toggleMusic"
        :class="buttonClasses"
        :aria-label="isPlaying ? '暂停音乐' : '播放音乐'"
    >
      <!-- SVG 图标（音乐符号） -->
      <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 stroke-[2.5] transition-transform duration-1000 ease-in-out"
          :class="{ 'rotate-360': isPlaying }"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
      >
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
      </svg>
    </button>
  </div>

  <!-- 隐藏的音频元素 -->
  <audio
      ref="audioRef"
      :src="musicUrl"
      loop
      preload="auto"
      style="display: none;"
  ></audio>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import musicUrl from '@/assets/music/yinyue.mp3';  // 导入音频文件（假设在 src/assets）

const isPlaying = ref(false);
const audioRef = ref(null);

const buttonClasses = computed(() => {
  const playing = isPlaying.value;
  return `inline-flex items-center justify-center p-2 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform ${
      playing ? 'bg-blue-500 text-white' : 'bg-red-300 text-red-800'
  }`;
});

// 切换播放/暂停音乐
const toggleMusic = async () => {
  const audio = audioRef.value;

  if (!audio) return;

  if (isPlaying.value) {
    audio.pause();
    isPlaying.value = false;
  } else {
    try {
      // 首次播放需用户交互（浏览器策略）
      await audio.play().catch(e => {
        console.error('播放失败:', e);
        // 可选：提示用户
        alert('播放失败，请检查浏览器设置或文件路径');
      });
      isPlaying.value = true;
    } catch (error) {
      console.error('播放失败', error);
    }
  }
};

// 监听音频事件（可选：更新状态）
onMounted(() => {
  const audio = audioRef.value;
  if (audio) {
    audio.addEventListener('ended', () => {
      isPlaying.value = false;  // 结束时停止（但 loop 已设置）
    });
    audio.addEventListener('error', (e) => {
      console.error('音频加载错误:', e);
    });
  }
});

// 组件卸载时清理
onBeforeUnmount(() => {
  const audio = audioRef.value;
  if (audio && isPlaying.value) {
    audio.pause();
    audio.currentTime = 0;
  }
});
</script>

<style scoped>
/* 旋转动画 */
@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotate-360 {
  animation: rotate360 3s linear infinite;
}
</style>