<script setup lang="ts">
import { PropType, defineProps } from 'vue';
import { IToast, ToastType } from '../../../models/interfaces/core/IToast';

/** Component props */
const props = defineProps({
    toast : {
        type: Object as PropType<IToast>,
        required: true
    }
});

/** Toast texts colors for each type */
const toastTextColor : Record<ToastType, string>  = {
    info : 'text-toast-info-text',
    warning : 'text-toast-warning-text',
    danger : 'text-toast-danger-text',
    success : 'text-toast-success-text'
};

/** Toast backgronds colors for each type */
const toastBgColor : Record<ToastType, string>  = {
    info : 'bg-toast-info-bg',
    warning : 'bg-toast-warning-bg',
    danger : 'bg-toast-danger-bg',
    success : 'bg-toast-success-bg'
};
</script>

<template>

    <div class="border-solid border-[1px] border-slate-200 rounded-[4px] shadow-md">
        <div class="flex gap-4 items-center py-4 pl-4 pr-6">

            <!-- Icon -->
            <div 
                class="p-1 rounded-lg"
                :class="[toastTextColor[props.toast.type], toastBgColor[props.toast.type]]">

                <!-- TODO : Add icon relative to the type of the toast -->
            </div>

            <!-- Title and message -->
            <div class="flex flex-col max-w-80">
                <div v-if="!!props.toast.title"
                    class="font-semibold"
                    :class="toastTextColor[props.toast.type]">

                    {{ $t(`${ props.toast.title }`) ?? props.toast.title }}
                </div>
                <div v-if="!!props.toast.message" class="w-full text-ellipsis overflow-hidden">
                    <span class="text-sm text-slate-500">
                        {{ $t(`${ props.toast.message }`) ?? props.toast.message }}
                    </span>
                </div>
            </div>
        </div>

        <div class="h-1 bg-slate-200" style="animation: timer 5s ease-in-out;"></div>
    </div>
</template>

<style>
@keyframes timer {
    0% {
        width: 100%;
    }

    100% {
        width: 0%;
    }
}
</style>