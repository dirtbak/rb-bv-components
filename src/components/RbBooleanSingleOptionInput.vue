<template>
    <b-button-group class="rb-boolean-single-option-input"
                    :class="{'rb-bordered': bordered, 'is-invalid': state === false}">
        <b-button class="rb-false-button"
                  :variant="(nullable && value == null) ? 'light' : (!value ? 'primary': 'light')"
                  @click="setValue(false)">
            <slot name="false">
                <rb-icon :icon="falseIcon" v-if="showIcons"></rb-icon>
                <span class="rb-text">{{falseLabel}}</span>
            </slot>
        </b-button>
        <b-button class="rb-true-button"
                  :variant="(nullable && value == null) ? 'light' : (value ? 'primary': 'light')"
                  @click="setValue(true)">
            <slot name="true">
                <rb-icon :icon="trueIcon" v-if="showIcons"></rb-icon>
                <span class="rb-text">{{trueLabel}}</span>
            </slot>
        </b-button>
    </b-button-group>
</template>

<script>
    export default {
        name: 'RbBooleanSingleOptionInput',
        props: {
            value: {type: Boolean},
            falseLabel: {type: String, default: 'Нет'},
            trueLabel: {type: String, default: 'Да'},
            showIcons: Boolean,
            trueIcon: {type: String, default: 'icon-checkbox-marked'},
            falseIcon: {type: String, default: 'icon-checkbox-blank-outline'},
            bordered: {type: Boolean, default: false},
            nullable: Boolean,
            state: {type: Boolean, default: null},
        },
        methods: {
            setValue(newValue) {
                let innerValue = newValue;
                if (this.nullable) {
                    if (this.value === false && newValue === false) {
                        innerValue = null;
                    }
                    if (this.value === true && newValue === true) {
                        innerValue = null;
                    }
                }
                this.$emit('input', innerValue);
                this.$emit('change', innerValue);
            }
        }
    }
</script>
