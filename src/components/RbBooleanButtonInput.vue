<template>
    <b-button class="rb-boolean-button-input"
              :type="type"
              :variant="variant"
              :class="cls"
              :block="block"
              @click="onClick">
        <rb-icon :icon="value? trueIcon: falseIcon" v-if="showCheckbox"></rb-icon>
        <rb-icon :icon="icon" v-if="icon"></rb-icon>
        <rb-text>{{label}}</rb-text>
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
            state: {type: Boolean, default: null},
            outline: {type: Boolean, default: false},
            type: {type: String, default: 'button'}
        },
        data() {
            return {innerValue: false}
        },
        computed: {
            cls() {
                return {
                    'rb-bordered': this.bordered || this.outline,
                    'rb-flex': this.flex,
                    'is-invalid': this.state === false,
                    'is-valid': this.state === true,
                }
            },
            variant() {
                if(this.value) {
                    return this.outline? 'outline-primary': 'primary';
                } else {
                    return 'light';
                }
            }
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
