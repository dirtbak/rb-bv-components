<template>
    <b-dropdown class="rb-dropdown rb-color-dropdown-input" :class="cls" :block="block" :variant="variant">
        <template #button-content>
            <rb-icon :icon="icon" :color="getColor(valueItem)"/>
        </template>
        <b-dropdown-item v-for="(item, idx) in items" :key="idx" @click="onClick(item)">
            <rb-icon :icon="icon" :color="getColor(item)"/>
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
            variant: {type: String, default: 'light'},
            bordered: Boolean,
            block: Boolean,
            state: {type: Boolean, default: null},
        },
        computed: {
            cls() {
                return {
                    'rb-bordered': this.bordered,
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
            onClick(item) {
                let value = (typeof item === 'object') ? item[this.valueField] : item;

                this.$emit('input', value);
                this.$emit('change', value);
            },
            getColor(item) {
                if (typeof item === 'object') {
                    return `${item.color}`;
                } else {
                    return `${item}`;
                }
            }
        }
    };
</script>
