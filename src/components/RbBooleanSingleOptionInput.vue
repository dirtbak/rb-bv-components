<template>
  <b-button-group class="rb-boolean-single-option-input rb-single-option-input" :class="cls">
    <b-button class="rb-false-button" :disabled="disabled"
              :variant="(nullable && value == null) ? 'light' : (!value ? 'primary': 'light')"
              @click="setValue(false)">
      <slot name="false">
        <rb-icon :icon="falseIcon" v-if="showIcons"></rb-icon>
        <rb-text>{{ falseLabel }}</rb-text>
      </slot>
    </b-button>
    <b-button class="rb-true-button" :disabled="disabled"
              :variant="(nullable && value == null) ? 'light' : (value ? 'primary': 'light')"
              @click="setValue(true)">
      <slot name="true">
        <rb-icon :icon="trueIcon" v-if="showIcons"></rb-icon>
        <rb-text>{{ trueLabel }}</rb-text>
      </slot>
    </b-button>
  </b-button-group>
</template>

<script>
import {tbv} from "@/i18n";

export default {
  name: 'RbBooleanSingleOptionInput',
  props: {
    value: {type: Boolean},
    falseLabel: {type: String, default: tbv('no')},
    trueLabel: {type: String, default: tbv('yes')},
    showIcons: Boolean,
    trueIcon: {type: String, default: 'icon-checkbox-marked'},
    falseIcon: {type: String, default: 'icon-checkbox-blank'},
    bordered: {type: Boolean, default: false},
    nullable: Boolean,
    state: {type: Boolean, default: null},
    disabled: {type: Boolean, default: null},
    block: Boolean,
  },
  computed: {
    cls() {
      return {
        'rb-bordered': this.bordered,
        'is-invalid': this.state === false,
        'is-valid': this.state === true,
        'w-100': this.block === true,
      };
    }
  },
  created() {
    //TODO: Костыль
    if (this.value === null || this.value === undefined) {
      this.setValue(false)
    } else {
      this.setValue(this.value)
    }
  },
  watch: {
    value() {
      if (this.value === null || this.value === undefined) {
        this.setValue(false)
      } else {
        this.setValue(this.value)
      }
    }
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
