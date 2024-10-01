<script setup lang="ts">
import { RouterView } from 'vue-router';
import ToastComponent from './components/core/toasts/ToastComponent.vue';
import { useToastsStore } from './stores/core/toastStore';
</script>

<template>

  {{ $t('HELLO_WORLD') }}

  <!-- Toasts -->
  <teleport to='#toasts-container'>
    <Transition>
      <div class="flex flex-col items-end gap-3 z-[15000]">
        <TransitionGroup>
          <template v-for="toast in useToastsStore().toasts">
            <ToastComponent :toast="toast"></ToastComponent>
          </template>
        </TransitionGroup>
      </div>
    </Transition>
  </teleport>

  <RouterView/>
</template>


<style>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.2s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>