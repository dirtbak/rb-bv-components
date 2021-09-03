<template>
    <div class="rb-multi-phone-input">
        <the-mask class="form-control contact-phone-form-input"
                  :mask="mask"
                  v-model="innerValueComputed"
                  type="text"
                  :masked="false"
                  :placeholder="placeholder"></the-mask>

        <div class="remo@e-btn-wrapper">
            <b-button class="rb-circle-button remove-btn" variant="outline-secondary" @click="remove">
                <b-icon icon="x"></b-icon>
            </b-button>
        </div>
    </div>
</template>

<script>
    import {TheMask} from 'vue-the-mask';

    export default {
        name: 'RbMultiPhoneInput',
        components: {TheMask},
        props: {
            // Массив может хранить номера телефонов либо объекты содержащие номер телефона,
            // зависит от того, задано поле phoneNumberField или нет
            value: Array,
            id: Number,
            placeholder: {type: String, default: 'Начните набирать...'},
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
