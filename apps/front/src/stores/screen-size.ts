import { Signin, Signup, UserI } from "@/interfaces/user";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const useScreenSize = defineStore("screen-size", () => {
    const windowHeight = ref<number>(window.innerWidth)
    const windowWidth = ref<number>(window.innerWidth)
    const isSizeSM = ref<boolean>(windowWidth.value < 640)
    const isSizeMD = ref<boolean>(windowWidth.value < 768)
    const isSizeLG = ref<boolean>(windowWidth.value < 1024)
    const isSizeXL = ref<boolean>(windowWidth.value < 1280)
    const isSize2XL = ref<boolean>(windowWidth.value < 1536)

    function onScreenSizeUpdate() {
        window.addEventListener('resize', updateScreenSize);
    }

    function removeScreenSizeUpdate() {
        window.removeEventListener('resize', updateScreenSize);
    }

    function updateScreenSize() {
        windowWidth.value = window.innerWidth
        windowHeight.value = window.innerHeight
        isSizeSM.value = windowWidth.value < 640
        isSizeMD.value = windowWidth.value < 768
        isSizeLG.value = windowWidth.value < 1024
        isSizeXL.value = windowWidth.value < 1280
        isSize2XL.value = windowWidth.value < 1536
    }

    return {
        onScreenSizeUpdate,
        removeScreenSizeUpdate,
        isSizeSM,
        isSizeMD,
        isSizeLG,
        isSizeXL,
        isSize2XL,
    };
});
