<template>
    <b-dropdown class="rb-dropdown-input rb-color-dropdown-input"
                :class="cls"
                :block="block"
                :variant="variant">
        <template #button-content>
            <rb-icon :icon="icon" :color="getColor(valueItem)"/>
        </template>
        <b-dropdown-item v-for="(item, idx) in items" :key="idx" @click="onSelectItem(item)">
            <rb-icon :icon="icon" :color="getColor(item)"/>
            <rb-text v-if="labelField">{{item[labelField]}}</rb-text>
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
    export default {
        name: 'RbColorDropdownInput',
        props: {
            value: [String, Number],
            icon: {type: String, default: 'icon-circle-small'},
            /**
             * items:
             *   Список цветов - ['color1', 'color2',...]
             *   Список объектов с цветами - [{... color: 'color1'}, {... color: 'color2'}, ...]
             */
            items: {type: Array, default: () => ([])},
            valueField: {type: String, default: 'id'},
            labelField: {type: String, default: 'name'},
            variant: {type: String, default: 'light'},
            bordered: Boolean,
            block: Boolean,
            showLabel: {type: Boolean, default: false},
            state: {type: Boolean, default: null},
        },
        computed: {
            cls() {
                return {
                    'rb-bordered': this.bordered,
                    'rb-no-label': !this.showLabel,
                    'is-invalid': this.state === false,
                    'is-valid': this.state === true,
                }
            },
            valueItem() {
                if (typeof this.value === 'number') {
                    const item = this.items.find(item => item[this.valueField] === this.value);
                    return item || this.value;
                }
                return this.value;
            }
        },
        methods: {
            onSelectItem(item) {
                let value = (typeof item === 'object') ? item[this.valueField] : item;

                this.$emit('input', value);
                this.$emit('change', value);
            },
            getColor(item) {
                if (typeof item === 'object') {
                    return `${item.color}`;
                } else if(item != null) {
                    return `${item}`;
                } else {
                    return 'transparent';
                }
            }
        }
    };
</script>
