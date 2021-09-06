<template>
    <b-list-group class="rb-list-group-input" :class="cls">
        <b-list-group-item :active="item[valueField] === value"
                           :key="item[valueField]"
                           @click="onChange(item)"
                           v-for="item in items">
            {{item[displayField]}}
        </b-list-group-item>
    </b-list-group>
</template>

<script>
    export default {
        name: 'RbListGroupInput',
        props: {
            value: [String, Number],
            items: {type: Array, default: () => []},
            valueField: {type: String, default: 'id'},
            displayField: {type: String, default: 'name'},
            state: {type: Boolean, default: null},
        },
        computed: {
            cls() {
                return {
                    'is-invalid': this.state === false,
                    'is-valid': this.state === true,
                }
            }
        },
        methods: {
            onChange: function (item) {
                this.$emit('input', item[this.valueField]);
            }
        }
    };
</script>
