<script setup lang="ts">
import { ref, watch, type PropType, type Ref } from 'vue';

/**
 * Props for the component.
 * item -> object filled by the form.
 * requiredFields -> list of ields required.
 * onSubmit -> method to call when submitting the form.
 */
const props = defineProps({
    item: {
        type: Object as PropType<any>,
        required: true
    },
    requiredFields : Object as PropType<string[]>,
    onSubmit : Function as PropType<(...args: any[]) => any>
})

/** Ref to the item passed to the form. */
const formItem = ref(props.item);

/** Properties required but mssing on the item. */
const missingProperties : Ref<string[]> = ref([]);

/**
 * Method to validate the form.
 * @returns true if all required fields ok, false otherwise.
 */
async function validateFormAsync() {
    const itemKeys : string[] = Object.keys(props.item);

    if (props.requiredFields) {
        missingProperties.value = props.requiredFields?.filter(field => !formItem.value[field] && itemKeys.includes(field));
        console.log(missingProperties)
        if (!missingProperties.value.length) return true

        missingProperties.value.forEach(property => {
            const missingPropertyInput = document.querySelector(`.form-group > input[name='${property}']`);
            const missingPropertyLabel = document.querySelector(`.form-group > label[for='${property}']`);

            missingPropertyInput?.classList.add('error')
            missingPropertyLabel?.classList.add('error-message')

            if (missingPropertyInput) {
                if (!document.getElementById(`error-message-${property}`)) {
                    const errorMessageDiv = document.createElement('div');
                    errorMessageDiv.id = `error-message-${property}`
                    errorMessageDiv.classList.add('error-message', 'text-small');
                    errorMessageDiv.textContent = `This field is required.`;
    
                    // Insert the error message after the input
                    missingPropertyInput.parentNode?.insertBefore(errorMessageDiv, missingPropertyInput.nextSibling);
                }
            }
        })

        return false;
    }

    return true;
}

/**
 * Watch the props to update formItem when it changes.
 * Also remove the error classes + message when a missing property is modified.
 */
watch(props, (newVal, oldVal) => {
    formItem.value = newVal.item;

    missingProperties.value.forEach(property => {

        if (!!formItem.value[property]) {
            const missingPropertyInput = document.querySelector(`.form-group > input[name='${property}']`);
            const missingPropertyLabel = document.querySelector(`.form-group > label[for='${property}']`);
    
            missingPropertyInput?.classList.remove('error');
            missingPropertyLabel?.classList.remove('error-message');

            document.getElementById(`error-message-${property}`)?.remove();
        }
    })
})

defineExpose({
    validateFormAsync
})


</script>

<template>
    <form>
        <slot></slot>
    </form>
</template>

<style>
form {
    width: 100%;
}

.error-message {
    color: red;
}
</style>