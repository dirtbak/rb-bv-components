<template>
    <b-button class="rb-boolean-button-input" :variant="value ? 'primary' : 'light'" @click="onClick"
              :class="{'rb-bordered': bordered, 'rb-flex': flex}" :block="block">
        <rb-icon :icon="value? trueIcon: falseIcon" v-if="showCheckbox"></rb-icon>
        <rb-icon :icon="icon" v-if="icon"></rb-icon>
        <span class="rb-text">{{label}}</span>
    </b-button>
</template>

<script>
    export default {
        name: 'RbBooleanButtonInput',
        props: {
            value: {type: Boolean, default: false},
            label: {type: String, default: ''},
            bordered: {type: Boolean, default: false},
            block: {type: Boolean, default: false},
            flex: {type: Boolean, default: false},
            icon: String,
            showCheckbox: {type: Boolean, default: false},
            falseIcon: {type: String, default: 'icon-checkbox-blank'},
            trueIcon: {type: String, default: 'icon-checkbox-marked'},
        },
        data() {
            return {innerValue: false}
        },
        methods: {
            onClick() {
                let th = this;
                let newValue = !th.value;
                th.$emit('input', newValue);
                th.$emit('change', newValue);
            }
        }
    }
</script>
