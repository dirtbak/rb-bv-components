<template>
    <div class="rb-input-with-button">
        <b-input :type="type"
                 :placeholder="placeholder"
                 :state="state"
                 v-model="innerValue"
                 @focus="$emit('focus', $event)"
                 @click="$emit('click', $event)"
                 @input="$emit('input', $event)"
                 @change="$emit('change', $event)">
        </b-input>
        <b-button variant="plain" class="btn-icon rb-input-btn" @click="$emit('buttonClick')">
            <rb-icon :icon="icon"></rb-icon>
        </b-button>
    </div>
</template>

<script>
    export default {
        name: 'RbInputWithButton',
        props: {
            placeholder: String,
            state: {type: Boolean, default: null},
            value: [String, Number],
            type: {type: String, default: 'text'},
            icon: {type: String, default: 'icon-close'}
        },
        data() {
            return {
                innerValue: null,
            }
        },
        watch: {
            value() {
                this.innerValue = this.value;
            }
        },
        created() {
            this.innerValue = this.value;
        }
    }
</script>
