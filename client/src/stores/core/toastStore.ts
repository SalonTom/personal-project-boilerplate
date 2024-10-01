import { defineStore } from "pinia";
import { IToast, ToastType } from "../../models/interfaces/core/IToast";
import { ref } from "vue";


export const useToastsStore = defineStore('toastsStore', () => {
    const toasts = ref<IToast[]>([]);

    const showToast = (title : string, message : string, type : ToastType) => {
        const toastId = toasts.value.length;
        toasts.value.push({ id : toastId, title, message, type });

        setTimeout(() => {
            toasts.value = toasts.value.filter(toast => toast.id != toastId);
        }, 5000);
    }

    return { toasts, showToast }
})