<template>
    <b-list-group class="rb-list-group-input">
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
            displayField: {type: String, default: 'name'}
        },
        methods: {
            onChange: function (item) {
                this.$emit('input', item[this.valueField]);
            }
        }
    };
</script>
