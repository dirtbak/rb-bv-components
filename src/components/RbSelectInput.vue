<template>
    <b-form-select v-model="innerValue"
                   :options="options"
                   @change="onChange($event)"
                   :state="state">
    </b-form-select>
</template>

<script>
    import {i18n} from "@/i18n";

    export default {
        name: 'RbSelectInput',
        props: {
            value: [Number, String],
            items: {
                type: Array, default: () => {
                    return [];
                }
            },
            placeholder: {type: String, default: ''},
            cancelItemText: {type: String, default: i18n.t('notStated')},
            showCancelItem: {type: Boolean, default: false},
            valueField: {
                type: String,
                default: 'id'
            },
            displayField: {
                type: String,
                default: 'name'
            },
            state: {type: Boolean, default: null},
        },
        data() {
            return {
                innerValue: null,
                options: []
            };
        },
        created() {
            let th = this;
            th.innerValue = th.value;
            th.fillOptions(th.items);
        },
        watch: {
            items() {
                let th = this;
                th.fillOptions(th.items);
            },
            value() {
                let th = this;
                th.innerValue = th.value;
            }
        },
        methods: {
            fillOptions(items) {
                let th = this;
                th.options = [];

                items.forEach(item => {
                    th.options.push({text: item[th.displayField], value: item[th.valueField]});
                });

                if (th.showCancelItem) {
                    th.options.push({text: th.cancelItemText, value: null});
                }
            },
            onChange(value) {
                let th = this;
                th.$emit('input', value);
                th.$emit('change', value);
            }
        }
    };
</script>
