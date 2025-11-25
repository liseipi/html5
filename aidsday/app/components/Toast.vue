<template>
<!--  <ToastNotification-->
<!--      v-if="toastVisible"-->
<!--      :message="toastMessage"-->
<!--      :autoCloseDelay="3000"-->
<!--      @close="toastVisible = false"-->
<!--      v-model:visible="toastVisible"-->
<!--  />-->

  <Transition name="toast-slide">
    <div
        v-if="visible"
        class="fixed top-2 left-[50%] flex items-center w-full max-w-[14rem] -ml-[7rem] p-1 border border-white bg-gray-800/20 rounded-2xl z-50"
        role="alert"
        aria-live="polite"
    >
      <div class="ml-[0.5rem] text-[0.75rem] text-white font-normal">
        {{ message }}
      </div>
      <div class="flex items-center ms-auto space-x-2 rtl:space-x-reverse">
        <button
            type="button"
            class="ms-auto flex items-center justify-center text-white hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none"
            @click="handleClose"
            aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
              class="w-[1rem] h-[1rem]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
          >
            <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    default: 'Toast!'
  },
  autoCloseDelay: {
    type: Number,
    default: 3000 // 3秒自动关闭
  },
  visible: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])

const visible = ref(props.visible)
let timeoutId = null

const handleClose = () => {
  visible.value = false
  emit('close')
  clearTimeout(timeoutId)
}

onMounted(() => {
  if (props.autoCloseDelay > 0) {
    timeoutId = setTimeout(() => {
      handleClose()
    }, props.autoCloseDelay)
  }
})

onUnmounted(() => {
  clearTimeout(timeoutId)
})
</script>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s ease;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>