<template>
    <div class="rb-multi-phone-input">
        <rb-input-with-button class="contact-phone-form-input"
                              v-model="innerValueComputed"
                              v-mask="mask"
                              type="text"
                              :placeholder="placeholder"
                              @buttonClicked="remove">
        </rb-input-with-button>
    </div>
</template>

<script>
    import {mask} from 'vue-the-mask'
    import RbInputWithButton from "./RbInputWithButton";
    import {i18n} from "@/i18n";

    export default {
        name: 'RbMultiPhoneInput',
        components: {RbInputWithButton},
        directives: {mask},
        props: {
            // Массив может хранить номера телефонов либо объекты содержащие номер телефона,
            // зависит от того, задано поле phoneNumberField или нет
            value: Array,
            id: Number,
            placeholder: {type: String, default: i18n.t('startTyping')},
            phoneNumberField: String,
            mask: {type: String, default: '+# ### ### ####'},
            prefix: {type: String, default: '+'}
        },
        data() {
            return {
                innerValue: null
            }
        },
        created() {
            this.setInnerValue();
        },

        watch: {
            value() {
                this.setInnerValue();
            }
        },
        methods: {
            onInput(value) {
                this.emitValue(value)
            },
            remove() {
                this.innerValue.splice(this.id, 1);
                this.$emit('input', this.innerValue);
                this.$emit('singleValueChanged');
            },
            setInnerValue() {
                if (!this.value || this.value.length === 0) {
                    this.innerValue = [this.createEmptyPhoneNumberItem()];
                } else {
                    this.innerValue = this.value;
                }
            },
            createEmptyPhoneNumberItem() {
                return this.phoneNumberField ? {[this.phoneNumberField]: ''} : '';
            },
            emitValue(value) {
                if (this.phoneNumberField) {
                    this.innerValue[this.id][this.phoneNumberField] = value;
                } else {
                    this.innerValue[this.id] = value
                }
                this.$emit('input', this.innerValue);
                this.$emit('singleValueChanged');
            },
            appendNewInputValue() {
                if (this.innerValue.length === this.id + 1) {
                    const val = this.phoneNumberField ? this.innerValue[this.id][this.phoneNumberField] : this.innerValue[this.id];
                    if (val?.length > 3) {
                        this.innerValue.push(this.createEmptyPhoneNumberItem());
                        this.$emit('input', this.innerValue);
                    }
                }
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
                    if (this.phoneNumberField) {
                        if (this.id !== this.innerValue.length) {
                            return this.innerValue[this.id][this.phoneNumberField];
                        } else {
                            // ничего не возвращаем тк инпут фантомный
                            return null;
                        }
                    } else {
                        return this.innerValue[this.id] || '';
                    }
                },
                set(newVal) {
                    const newPrefixedVal = this.addPrefix(newVal, this.prefix);
                    const oldVal = this.phoneNumberField ? this.innerValue[this.id][this.phoneNumberField] : this.innerValue[this.id];

                    if (oldVal !== newPrefixedVal) {
                        this.onInput(newPrefixedVal);
                        if (this.phoneNumberField) {
                            this.innerValue[this.id][this.phoneNumberField] = newPrefixedVal;
                        } else {
                            this.innerValue[this.id] = newPrefixedVal;
                        }
                    }
                    this.appendNewInputValue();
                }
            }
        }
    }
</script>
