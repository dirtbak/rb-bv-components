<template>
    <b-dropdown class="rb-dropdown-input rb-multi-dropdown-input"
                :variant="variant"
                :class="cls"
                no-caret
                :block="block">
        <template v-slot:button-content>
            <span class="rb-text">
                {{text? text: (showCancelItem? cancelItemText: placeholder)}}
            </span>
            <span class="rb-counter" v-if="counter > 0">
                {{counter? counter: ''}}
            </span>
            <span class="rb-dropdown-indicator" v-if="!noCaret">
                    <rb-icon :icon="dropdownIcon"></rb-icon>
                </span>
        </template>
        <b-dropdown-item v-for="o in options" :key="o.value"
                         @click="onClick(o)"
                         :class="{'rb-selected': (innerValue != null && innerValue.indexOf(o.value) >= 0)}">
            {{o.text}}
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
    export default {
        name: 'RbMultiDropdownInput',
        props: {
            value: [Array, String, Number],
            items: {
                type: Array, default: () => {
                    return [];
                }
            },
            bordered: {type: Boolean, default: false},
            placeholder: {type: String, default: 'Выбрать'},
            cancelItemText: {type: String, default: 'Не указано'},
            showCancelItem: {type: Boolean, default: false},
            variant: {type: String, default: 'light'},
            valueField: {type: String, default: 'id'},
            displayField: {type: String, default: 'name'},
            valueAsString: {type: Boolean, default: false},
            block: Boolean,
            state: {type: Boolean, default: null},
            dropdownIcon: {type: String, default: 'icon-chevron-down'},
            noCaret: {type: Boolean, default: false},
        },
        data() {
            return {
                innerValue: [],
                options: []
            };
        },
        created() {
            let th = this;
            if (th.valueAsString) {
                if (typeof th.value === "number") {
                    th.innerValue = [th.value]
                } else {
                    th.innerValue = th.splitStringValue();
                }
            }
            th.fillOptions(th.items);
        },
        computed: {
            cls() {
                return {
                    'rb-bordered': this.bordered,
                    'is-invalid': this.state === false,
                    'is-valid': this.state === true,
                };
            },
            text() {
                let th = this;
                if (th.innerValue == null) {
                    return null;
                } else {
                    return 'Выбрано';
                }
            },
            counter() {
                const th = this;
                return th.innerValue ? th.innerValue.length : 0;
            }
        },
        watch: {
            items() {
                let th = this;
                th.fillOptions(th.items);
            },
            value() {
                let th = this;
                if (th.valueAsString) {
                    if (typeof th.value === "number") {
                        th.innerValue = [th.value]
                    } else {
                        th.innerValue = th.splitStringValue();
                    }
                }
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
            findInOptions(value) {
                let th = this;
                let result = null;
                th.options.forEach(item => {
                    if (item.value === value) {
                        result = item;
                    }
                });
                return result;
            },
            onClick(item) {
                let th = this;

                let changeValue = function () {
                    let newValue = th.innerValue;
                    if (th.valueAsString) {
                        newValue = th.innerValue.join(',');
                    }
                    th.$emit('input', newValue);
                    th.$emit('change', newValue);
                }

                //
                if (item.value === null) {
                    th.innerValue = [];
                    changeValue();
                    return;
                }

                th.innerValue = th.innerValue != null ? th.innerValue : [];
                if (th.innerValue.indexOf(item.value) < 0) {
                    th.innerValue.push(item.value);
                    th.innerValue.sort();
                    changeValue();
                } else {
                    let i = th.innerValue.indexOf(item.value);
                    th.innerValue.splice(i, 1);
                    changeValue();
                }
            },
            splitStringValue() {
                let th = this;
                if (!th.value) {
                    return null;
                }
                if (typeof th.value === "string") {
                    return th.value.split(',').map(i => parseInt(i));
                }
                return [th.value];
            }
        }
    };
</script>
