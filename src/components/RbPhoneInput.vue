<template>
    <b-input type="text"
             v-mask="mask"
             v-model="innerValueComputed"
             :masked="false"
             :placeholder="placeholder"
             :state="state"
    >
    </b-input>
</template>

<script>
    import {debounce} from 'debounce';
    import {mask} from 'vue-the-mask';

    export default {
        name: 'RbPhoneInput',
        directives: {mask},
        props: {
            placeholder: {type: String, default: ''},
            mask: {type: String, default: '+# ### ### ####'},
            prefix: {type: String, default: '+'},
            debounceTime: {type: Number, default: 0},
            valueChangeMinLength: Number,
            value: String,
            state: {type: Boolean, default: null},
        },
        data() {
            return {
                innerValue: null,
                debounceInput: null
            };
        },
        created() {
            const th = this;
            th.innerValue = th.value
            th.debounceInput = debounce(function (value) {
                th.emit(value);
            }, th.debounceTime)

        },
        watch: {
            value(value, oldValue) {
                let th = this;
                if (value !== oldValue && value !== this.innerValue) {
                    th.innerValue = value;
                }
            }
        },
        methods: {
            emit(value) {
                if (this.valueChangeMinLength && value.length < this.valueChangeMinLength) {
                    return;
                }
                this.$emit('input', value);
                this.$emit('change', value);
            },
            addPrefix(value, prefix) {
                let result = value;
                if (value && value.length >= 1) {
                    if (value[0] !== prefix) {
                        result = prefix + value
                    }
                }
                return result;
            }
        },
        computed: {
            innerValueComputed: {
                get() {
                    return this.innerValue;
                },
                set(newVal) {
                    const newPrefixedVal = this.addPrefix(newVal, this.prefix);
                    this.debounceInput(newPrefixedVal);
                    this.innerValue = newPrefixedVal;
                    return newPrefixedVal;
                }
            }
        }
    };
</script>
