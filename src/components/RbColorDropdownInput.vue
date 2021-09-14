<template>
    <b-dropdown class="rb-dropdown-input rb-color-dropdown-input"
                :class="cls"
                :block="block"
                :disabled="disabled"
                :state="state"
                no-caret
                :variant="variant">
        <template #button-content>
            <rb-icon :icon="icon" :color="getColor(selectedOption)"/>
            <rb-text v-if="showLabel && selectedOption">
                {{selectedOption[labelField]}}
            </rb-text>
            <span class="rb-dropdown-indicator" v-if="!noCaret">
                <rb-icon :icon="dropdownIcon"></rb-icon>
            </span>
        </template>
        <b-dropdown-item v-for="(option, idx) in options" :key="idx" @click="onSelectOption(option)">
            <rb-icon :icon="icon" :color="getColor(option)"/>
            <rb-text v-if="showLabel">{{option[labelField]}}</rb-text>
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
             * options:
             *   Список цветов - ['color1', 'color2',...]
             *   Список объектов с цветами - [{... color: 'color1'}, {... color: 'color2'}, ...]
             */
            options: {type: Array, default: () => ([])},
            valueField: {type: String, default: 'id'},
            colorField: {type: String, default: 'color'},
            labelField: {type: String, default: 'name'},
            variant: {type: String, default: 'light'},
            bordered: Boolean,
            block: Boolean,
            showLabel: {type: Boolean, default: false},
            state: {type: Boolean, default: null},
            dropdownIcon: {type: String, default: 'icon-chevron-down'},
            noCaret: {type: Boolean, default: false},
            defaultColor: {type: String, default: 'transparent'},
            disabled: Boolean,
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
            selectedOption() {
                if (typeof this.value === 'number') {
                    const option = this.options.find(option => option[this.valueField] === this.value);
                    return option || this.value;
                }
                return this.value;
            },
        },
        methods: {
            onSelectOption(option) {
                let value = (typeof option === 'object') ? option[this.valueField] : option;
                this.$emit('input', value);
                this.$emit('change', value);
            },
            getName(option) {

            },
            getColor(option) {
                if(!option) {
                    return 'transparent';
                }

                if (typeof option === 'object' && option[this.colorField]) {
                    return `${option[this.colorField]}`;
                } else if (option != null) {
                    return `${option}`;
                } else {
                    return 'transparent';
                }
            }
        }
    };
</script>
