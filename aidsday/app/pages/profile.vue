<script setup lang="ts">
useHead({
  title: '填写个人资料',
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center bg-cover bg-center bg-[#51BDDA] relative">
    <img src="~/assets/image/profile/bg_cover.png" class="w-full" alt="bg">
    
    <div class="absolute top-0 left-0 w-full px-6">
      <h2 class="text-[1.2rem] font-normal text-white pt-[5.5rem] leading-tight">
        请选择您的身份
      </h2>
      <div class="flex gap-4 w-full max-w-xl pt-[1.6rem] mb-12">
        <div class="flex-1">
          <div class="flex flex-col items-center">
            <div class="w-full h-36 border-2 border-[#FFCA3C] rounded-xl mb-4 flex items-center justify-center overflow-hidden">
              <img src="~/assets/image/profile/boy.png" alt="小哥哥插画" class="object-cover h-full w-full">
            </div>

            <p class="text-sm font-light text-gray-500">机智聪明</p>
            <div class="mt-2 py-1 px-6 bg-yellow-400 text-white border border-white rounded-full font-bold text-base shadow-md">
              小哥哥
            </div>
          </div>
        </div>
        <div class="flex-1">
          <div class="flex flex-col items-center">
            <div class="w-full h-36 border-2 border-white rounded-xl mb-4 flex items-center justify-center overflow-hidden">
              <img src="~/assets/image/profile/girl.png" alt="小姐姐插画" class="object-cover h-full w-full">
            </div>

            <p class="text-sm font-light text-gray-500">才思敏捷</p>
            <div
                class="mt-2 py-1 px-6 bg-white text-[#5AD3E7] rounded-full border border-gray-300 font-bold text-base shadow-sm">
              小姐姐
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-[1.2rem] font-normal text-white pt-[1.5rem] leading-tight">
        请选择您的年龄
      </h2>
      <div class="grid grid-cols-3 gap-4 pt-[1.6rem] w-full max-w-xl">
        <div class="w-[5rem] h-[1.8rem] text-center rounded-full cursor-pointer
                        bg-yellow-400 text-white border border-white font-normal
                        peer-checked:bg-yellow-400 peer-checked:text-white peer-checked:border-yellow-400
                        transition duration-150 ease-in-out">
          0-17岁
        </div>
        <div class="w-[5rem] h-[1.8rem] text-center rounded-full text-[#5AD3E7] cursor-pointer
                        border border-gray-300 bg-white font-normal
                        peer-checked:bg-yellow-400 peer-checked:text-white peer-checked:border-yellow-400
                        transition duration-150 ease-in-out">
          18-25岁
        </div>
        <div class="w-[5rem] h-[1.8rem] text-center rounded-full text-[#5AD3E7] cursor-pointer
                        border border-gray-300 bg-white font-normal
                        peer-checked:bg-yellow-400 peer-checked:text-white peer-checked:border-yellow-400
                        transition duration-150 ease-in-out">
          26-40岁
        </div>
        <div class="w-[5rem] h-[1.8rem] text-center rounded-full text-[#5AD3E7] cursor-pointer
                        border border-gray-300 bg-white font-normal
                        peer-checked:bg-yellow-400 peer-checked:text-white peer-checked:border-yellow-400
                        transition duration-150 ease-in-out">
          41-60岁
        </div>
        <div class="w-[5rem] h-[1.8rem] text-center rounded-full text-[#5AD3E7] cursor-pointer
                        border border-gray-300 bg-white font-normal
                        peer-checked:bg-yellow-400 peer-checked:text-white peer-checked:border-yellow-400
                        transition duration-150 ease-in-out">
          61岁及以上
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>

</style>