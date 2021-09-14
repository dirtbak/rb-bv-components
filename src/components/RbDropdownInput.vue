<template>
    <b-dropdown class="rb-dropdown-input"
                :variant="variant"
                :block="block"
                :disabled="disabled"
                :no-caret="true"
                :class="cls">
        <template v-slot:button-content>
            <slot name="button-content" :text="text" :cancelItemText="cancelItemText" :placeholder="placeholder"
                  :showCancelItem="showCancelItem">
                <rb-icon v-if="icon" :icon="icon" :color="getIconColor(value)"/>
                <a class="rb-text" v-if="link">
                    {{text? text: (showCancelItem? cancelItemText: placeholder)}}
                </a>
                <span class="rb-text" v-else>
                    {{text? text: (showCancelItem? cancelItemText: placeholder)}}
                </span>
                <span class="rb-dropdown-indicator" v-if="!noCaret">
                    <rb-icon :icon="dropdownIcon"></rb-icon>
                </span>
            </slot>
        </template>
        <b-dropdown-item v-for="o in options" :key="o.value" @click="onClick(o)">
            <slot name="option-content" :option="o">
                <rb-icon v-if="icon" :icon="icon" :color="getIconColor(o.value)"/>
                <span class="rb-text">{{o.text}}</span>
            </slot>
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
    export default {
        name: 'RbDropdownInput',
        props: {
            value: [Number, Boolean],
            items: {
                type: Array,
                default: () => ([])
            },
            placeholder: {type: String, default: 'Выбрать'},
            cancelItemText: {type: String, default: 'Не указано'},
            showCancelItem: {type: Boolean, default: false},
            showCancelIcon: {type: Boolean, default: false},
            bordered: {type: Boolean, default: false},
            variant: {type: String, default: 'light'},
            valueField: {
                type: String,
                default: 'id'
            },
            displayField: {
                type: String,
                default: 'name'
            },
            icon: String,
            state: {type: Boolean, default: null},
            block: Boolean,
            disabled: Boolean,
            link: Boolean,
            split: Boolean,
            splitVariant: {type: String, default: 'outline-light'},
            dropdownIcon: {type: String, default: 'icon-chevron-down'},
            noCaret: {type: Boolean, default: false},
        },
        data() {
            return {
                innerValue: null,
                text: null,
                options: []
            };
        },
        computed: {
            cls() {
                return {
                    'rb-dropdown-link-input': this.link,
                    'rb-bordered': this.bordered,
                    'rb-no-dropdown-indicator': this.noCaret,
                    'is-invalid': this.state === false,
                    'is-valid': this.state === true,
                }
            }
        },
        watch: {
            items() {
                this.fillOptions(this.items);
                this.setText();
            },
            value() {
                this.innerValue = this.value;
                this.setText();
            }
        },
        created() {
            let th = this;
            th.innerValue = th.value;
            th.fillOptions(th.items);
            th.setText();
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
            setText() {
                let currentValIndex = this.options.findIndex(option => option.value === this.innerValue);
                if (currentValIndex !== -1) {
                    this.text = this.options[currentValIndex].text;
                }
            },
            onClick(item) {
                this.$emit('input', item.value);
                this.$emit('change', item.value);
                this.$emit('click', item.value);
            },
            getIconColor(value) {
                const item = this.items.find(item => item[this.valueField] === value);
                return item ? `#${item.color}` : (this.showCancelIcon ? null : 'transparent');
            }
        }
    };
</script>
