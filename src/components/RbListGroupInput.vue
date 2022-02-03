<template>
    <b-list-group class="rb-list-group-input" :class="cls">
        <b-list-group-item :active="option[valueField] === innerValue"
                           :key="option[valueField]"
                           :disabled="disabled"
                           @click="onChange(option)"
                           v-for="option in options">
            {{option[displayField]}}
        </b-list-group-item>
    </b-list-group>
</template>

<script>
    export default {
        name: 'RbListGroupInput',
        props: {
            value: [String, Number, Object],
            valueAsObject: {type: Boolean, default: false},
            bindField: {type: String, default: 'id'},
            options: {type: Array, default: () => []},
            valueField: {type: String, default: 'id'},
            displayField: {type: String, default: 'name'},
            state: {type: Boolean, default: null},
            disabled: {type: Boolean, default: null},
        },
        computed: {
            cls() {
                return {
                    'is-invalid': this.state === false,
                    'is-valid': this.state === true,
                }
            },
            innerValue() {
                if (this.value == null) {
                    return this.value;
                }

                return this.valueAsObject ? this.value[this.bindField] : this.value;
            },
        },
        methods: {
            onChange: function (option) {
                if (this.valueAsObject) {
                    let objectVal = {[this.bindField]: option[this.valueField]};
                    this.$emit('input', objectVal);
                    this.$emit('change', objectVal);
                } else {
                    this.$emit('input', option[this.valueField]);
                    this.$emit('change', option[this.valueField]);
                }

            }
        }
    }
</script>
