<template>
    <b-dropdown :variant="variant" class="rb-dropdown-input" :block="block"
                :class="{'rb-bordered': bordered, 'is-invalid': state === false}">
        <template v-slot:button-content>
            <slot name="button-content" :text="text" :cancelItemText="cancelItemText" :placeholder="placeholder"
                  :showCancelItem="showCancelItem">
                <rb-icon v-if="icon" :icon="icon" :color="getIconColor(value)"/>
                <span class="rb-text">{{text? text: (showCancelItem? cancelItemText: placeholder)}}</span>
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
        },
        data() {
            return {
                innerValue: null,
                text: null,
                options: []
            };
        },
        created() {
            let th = this;
            th.innerValue = th.value;
            th.fillOptions(th.items);
            th.setText();
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