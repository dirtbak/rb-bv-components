<template>
    <b-form-input ref="input"
                  type="text"
                  v-model="innerValue"
                  :placeholder="placeholder"
                  :class="{'rb-bordered': bordered}"
                  @input="onInput"
                  :state="state"
    ></b-form-input>
</template>

<script>
    export default {
        name: 'RbPriceInput',
        props: {
            value: [String, Number],
            placeholder: String,
            bordered: Boolean,
            state: {type: Boolean, default: null}
        },
        data() {
            return {
                innerValue: this.format(this.value),
                prevValue: null,
                position: 0,
            }
        },
        watch: {
            value() {
                this.innerValue = this.format(this.value);
            }
        },
        methods: {
            format(num) {
                if (!num) {
                    return num;
                }
                return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
            },
            unformat(str) {
                if (!str) {
                    return str;
                }
                return ('' + str).replace(/ /g, '');
            },
            onInput(val) {
                let input = this.$refs.input;
                this.prevValue = input.value;
                this.position = input.selectionStart;
                let targetValue = this.unformat(val);
                this.innerValue = this.format(targetValue);
                this.$emit("input", targetValue);
                this.$nextTick(() => {
                    let prevLength = this.prevValue != null ? this.prevValue.length : 0;
                    let innerLength = this.innerValue != null ? this.innerValue.length : 0;
                    input.selectionStart = innerLength - prevLength + this.position + 1;
                    input.selectionEnd = input.selectionStart;
                })
            }
        }
    }
</script>
