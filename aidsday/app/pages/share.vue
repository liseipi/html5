<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
// import html2canvas from "html2canvas";
import html2canvas from "html2canvas-pro";
import {useUserInfoStore} from '~/store/userStore';
import {useDatiStore} from '~/store/datiStore';

useHead({
  title: '分享',
})

const router = useRouter()
const userInfoStore = useUserInfoStore();
const datiStore = useDatiStore();

const { wxheadpic, wxname } = reactive({...userInfoStore.userInfo});
const { rightnum } = reactive({...datiStore.dati});

//微信分享
let shareGuide = ref<HTMLElement | null>(null);
const wxShare = () => {
  shareGuide.value!.style.display = 'block';
}
const closeShare = () => {
  shareGuide.value!.style.display = 'none';
}

// 日期
const currentDate = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // 月从 0 开始，补零
  const day = String(now.getDate()).padStart(2, '0') // 日补零
  return `${year}年${month}月${day}日`
})

// 生成图片
let canvas: HTMLCanvasElement | null = null;
let generatedImg: HTMLElement | null;
const generateHtmlImage = async () => {
  try {
    /**
     * scale: 2：提升图片分辨率
     * useCORS: true：处理外部图片（如微信头像、CDN 图标）的跨域问题。如果图片跨域失败，可先用后端接口转为 base64。
     * allowTaint: true：允许 Canvas 被“污染”（跨域），否则 toDataURL() 会报错
     * backgroundColor: '#ffffff' // 背景色，如果元素透明 transparent
     */

    // const posterRef = ref<HTMLElement | null>(null);
    const poster = document.getElementById('poster');
    generatedImg = document.getElementById('generatedImg');

    if (!poster) {
      console.error('Poster 元素未找到');
      return;
    }
    if (!generatedImg) {
      console.error('GeneratedImg 元素未找到');
      return;
    }

    await nextTick();
    // console.log('Poster 元素：', poster);

    // 等待 poster 内所有图片加载完成（关键：html2canvas 需要元素完全就绪）
    const images = poster.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      return new Promise((resolve, reject) => {
        if (img.complete) {
          resolve(img);
        } else {
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`图片加载失败: ${img.src}`));
        }
      });
    });

    await Promise.all(imagePromises);

    // 生成 Canvas
    canvas = await html2canvas(poster as HTMLElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: 'transparent',
    });

    // 转为 base64 PNG 并设置到 img
    const imgData = canvas.toDataURL('image/png');
    // console.log('图片数据：', imgData);
    generatedImg.src = imgData;
    generatedImg.style.display = 'block'; // 显示生成的图片

    // 隐藏原dom显示
    poster.style.display = 'none';

  } catch (e) {
    console.error('生成失败：', e);
  }
}

// 下载图片函数
let tip = ref(false);
const downloadImage = () => {
  tip.value = true;

  //下面的功能在微信H5页面中不可用
  /*
  //判断图片先生成完成
  if (!canvas || !generatedImg) {
    alert('请先生成图片！');
    return;
  }

  // 用 toBlob 创建 Blob（更高效，支持大图）
  canvas.toBlob((blob) => {
    if (!blob) return;

    // 创建 Blob URL
    const url = URL.createObjectURL(blob);

    // 创建下载链接
    const a = document.createElement('a');
    a.href = url;
    a.download = `防艾达人海报_${new Date().toISOString().split('T')[0]}.png`; // 文件名：防艾达人海报_YYYY-MM-DD.png
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // 释放 URL
    URL.revokeObjectURL(url);

    console.log('下载成功！');
  }, 'image/png', 1.0); // 质量 1.0
  */
}

const onClose = () => {
  if (router.options.history.state.back) {
    router.back()
  } else {
    navigateTo('/')  // 回首页或其他默认页
  }
}

const link = ref('https://hiv.xhwxpos.com/html/'); // 要复制的链接
const copied = ref(false); // 状态：是否已复制
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(link.value);
    copied.value = true;
    // 可选：1秒后重置状态
    setTimeout(() => { copied.value = false; }, 1000);
  } catch (err) {
    console.error('复制失败：', err);
    // Fallback for older browsers
    fallbackCopyTextToClipboard(link.value);
  }
};

// Fallback 方法（兼容旧浏览器）
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      copied.value = true;
      setTimeout(() => { copied.value = false; }, 1000);
    } else {
      console.error('Fallback: 复制失败');
    }
  } catch (err) {
    console.error('Fallback: 复制失败', err);
  }
  document.body.removeChild(textArea);
}

onMounted(async () => {
  await generateHtmlImage();
})
</script>

<template>
  <div class="min-h-[34rem] h-screen bg-[url(~/assets/image/dati/bg_cover.png)] bg-bottom bg-no-repeat bg-size-[18.75rem_34rem] relative">

    <button @click="onClose"
            class="fixed right-2 top-2 p-[0.15rem] rounded-full border-2 border-white text-white
                         hover:bg-white hover:text-gray-800 hover:rotate-90 transition duration-300">
      <svg class="w-[1.2rem] h-[1.2rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <div class="min-h-[34rem] bg-black/85 flex flex-col items-center justify-center w-full h-screen mx-auto p-5 z-30">
      <div id="poster" class="popup-box w-full px-5 pt-2 pb-2 relative z-10 notch-circle">
        <div class="notch-circle-left [--notch-top:20rem]" style="--notch-top:20rem"></div>
        <div class="notch-circle-right [--notch-top:20rem]"></div>
        <div class="flex justify-start items-center mb-4">
          <img :src="wxheadpic" alt="用户头像"
               class="w-[2.4rem] h-[2.4rem] text-[12px] rounded-full mr-3 border-2 border-white shadow-md">
          <h3 class="text-[1rem] font-bold text-gray-800">{{wxname}}</h3>
        </div>

        <p class="text-[0.65rem] text-gray-800 leading-relaxed">
          在防艾知识挑战赛中，你以卓越的表现，十题答对{{rightnum}}题，展现了全面、扎实的艾滋病防控知识素养。特授予你“防艾达人”的光荣称号。
        </p>

        <img src="~/assets/image/qs/peers.png" class="h-[7.5rem] mx-auto" alt="peers">

        <p class="pt-[2rem] text-[0.65rem] text-gray-400 leading-relaxed">
          愿你继续传递这份科学与关爱，共筑零歧视、零传播的未来。
        </p>
        <p class="pt-[0.5rem] text-[0.65rem] text-black text-right leading-relaxed">
          日期：{{currentDate}}
        </p>

        <hr class="border-t border-dashed border-gray-200 my-2"/>

        <div class="flex items-center justify-end">
          <span class="text-[0.8rem]">长按识别，参加防艾达 人挑战赛赢红包 ➡️</span>
          <img src="~/assets/image/qrcode.png" class="w-[4rem]" alt="qrcode">
        </div>

      </div>
      <img id="generatedImg" src="" alt="generatedImg" style="display: none;">

      <div class="flex items-center justify-end pt-[1.3rem] space-x-[2rem]">
        <button @click="wxShare">
          <img src="~/assets/image/weixin.png" class="w-[2.19rem]" alt="">
          <span class="text-[0.6rem] text-[#D1D1D1]">微信好友</span>
        </button>
        <button @click="downloadImage">
          <img src="~/assets/image/xizai.png" class="w-[2.19rem]" alt="">
          <span class="text-[0.6rem] text-[#D1D1D1]">保存图片</span>
        </button>
        <button @click="copyLink">
          <img src="~/assets/image/link.png" class="w-[2.19rem]" alt="">
          <span class="text-[0.6rem] text-[#D1D1D1]">生成链接</span>
        </button>
      </div>
    </div>

    <div ref="shareGuide" @click="closeShare" class="fixed top-0 inset-0 bg-black/85 hidden">
      <img src="~/assets/image/share.jpeg" class="w-full rounded-b-lg" alt="share" />
    </div>

    <Toast v-if="tip" v-model:visible="tip" @close="tip = false" message="请长按保存图片!" />
    <Toast v-if="copied" v-model:visible="copied" @close="copied = false" message="已复制链接，请在微信聊天窗口中发送并打开。" />
  </div>
</template>

<style scoped>
.notch {
  --line-position: 78%;
}
</style>