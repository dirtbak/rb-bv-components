<template>
    <div class="rb-date-picker-input">
        <b-input-group>
            <b-form-input
                    v-model="inputValue"
                    type="text"
                    autocomplete="off"
                    @input="inputChange"
                    v-mask="mask"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :state="state">
            </b-form-input>
            <b-input-group-append>
                <b-form-datepicker
                        ref="picker"
                        v-model="datePickerValue"
                        right
                        button-only
                        :dropup="dropup"
                        locale="ru-RU"
                        label-help=""
                        :show-decade-nav="false"
                        :hide-header="true"
                        :disabled="disabled"
                        @input="datePickerChange"
                ></b-form-datepicker>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script>
    import {dateFormat} from 'vue-filter-date-format';
    import {mask} from 'vue-the-mask';

    export default {
        name: 'RbDatePickerInput',
        directives: {mask},
        props: {
            value: {String, Date},
            placeholder: {type: String, default: 'ДД.ММ.ГГГГ'},
            mask: {type: String, default: '##.##.####'},
            state: {type: Boolean, default: null},
            dropup: Boolean,
            disabled: Boolean,
        },
        data: function () {
            return {
                inputValue: null,
                datePickerValue: null,
                inputPattern: 'DD.MM.YYYY',
                pickerPattern: 'YYYY-MM-DD',
            };
        },
        created() {
            this.onPropValueChange();
        },
        watch: {
            value() {
                this.onPropValueChange();
            },
            datePickerValue() {
                this.$emit('change')
            }
        },
        methods: {
            datePickerChange(v) {
                let dt = this.strToDate(v);
                this.inputValue = dateFormat(dt, this.inputPattern);
                this.$emit('input', dt.toISOString());
            },
            inputChange(v) {
                const date = this.strToDate(v);
                if (!v || v === '') {
                    this.$emit('input', null)
                } else if (date) {
                    if (v.length === this.mask.length) {
                        this.datePickerValue = dateFormat(date, this.pickerPattern);
                        this.$emit('input', date.toISOString());
                    }
                }
            },
            onPropValueChange() {
                if (this.value) {
                    const dt = new Date(this.value);
                    this.inputValue = dateFormat(dt, this.inputPattern);
                    this.datePickerValue = dateFormat(dt, this.pickerPattern);
                } else {
                    this.inputValue = null;
                    this.datePickerValue = null;
                }
            },
            strToDate(str) {
                if (/[0-9]{2}\.[0-9]{2}\.[0-9]{4}/.test(str)) {
                    let dd = str.substring(0, 2);
                    let mm = str.substring(3, 5);
                    let yyyy = str.substring(6, 10);
                    return new Date(`${mm}.${dd}.${yyyy}`);
                } else if (/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(str)) {
                    let yyyy = str.substring(0, 4);
                    let mm = str.substring(5, 7);
                    let dd = str.substring(8, 10);
                    return new Date(`${mm}.${dd}.${yyyy}`);
                } else {
                    return null;
                }
            }

        }
    }
</script>
