<template>
    <b-button-group class="rb-multi-option-input" :class="cls">
        <b-button v-for="item in items"
                  :key="item[valueField]"
                  :variant="isItemSelected(item) ? 'primary' : 'light'"
                  :disabled="disabled"
                  @click="onItemClick(item)">
            {{item[displayField]}}
        </b-button>
    </b-button-group>
</template>

<script>
    import typeOf from 'typeof';

    export default {
        name: 'RbMultiOptionInput',
        props: {
            value: {
                type: [Array, String],
                default: function () {
                    return [];
                }
            },
            items: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            valueField: {
                type: String,
                default: 'id'
            },
            displayField: {
                type: String,
                default: 'name'
            },
            valueAsString: {
                type: Boolean,
                default: false
            },
            bordered: {type: Boolean, default: false},
            state: {type: Boolean, default: null},
            disabled: Boolean,
        },
        data: function () {
            return {
                innerValue: []
            };
        },
        computed: {
            cls() {
                return {
                    'rb-bordered': this.bordered,
                    'is-invalid': this.state === false,
                    'is-valid': this.state === true,
                }
            }
        },
        watch: {
            value() {
                let th = this;
                if (th.valueAsString) {
                    th.innerValue = th.splitStringValue();
                } else {
                    th.innerValue = th.value;
                }
            }
        },
        methods: {
            isItemSelected(item) {
                if (!this.innerValue) {
                    return false;
                }
                return this.innerValue.indexOf(item[this.valueField]) !== -1;
            },
            onItemClick(item) {
                if (this.isItemSelected(item)) {
                    this.innerValue.splice(this.innerValue.indexOf(item[this.valueField]), 1);
                } else {
                    this.innerValue.push(item[this.valueField]);
                    this.innerValue.sort();
                }
                if (this.valueAsString) {
                    this.$emit('input', this.innerValue.join(','));
                } else {
                    this.$emit('input', this.innerValue);
                }
            },
            splitStringValue() {
                let th = this;
                if (typeOf(th.value) === 'array') {
                    return th.value;
                }
                if (!th.value) {
                    return [];
                }
                return th.value.split(',').map(i => parseInt(i));
            }
        },
        created() {
            let th = this;
            if (th.valueAsString) {
                th.innerValue = th.splitStringValue();
            } else {
                th.innerValue = th.value || [];
            }
        }
    };
</script>
