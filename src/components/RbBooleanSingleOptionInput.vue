<template>
  <b-button-group class="rb-boolean-single-option-input rb-single-option-input" :class="cls">
    <b-button class="rb-false-button" :disabled="disabled"
              :variant="(nullable && value == null) ? 'light' : (!model ? 'primary': 'light')"
              @click="model = false">
      <slot name="false">
        <rb-icon :icon="falseIcon" v-if="showIcons"></rb-icon>
        <rb-text>{{ falseLabel }}</rb-text>
      </slot>
    </b-button>
    <b-button class="rb-true-button" :disabled="disabled"
              :variant="(nullable && value == null) ? 'light' : (model ? 'primary': 'light')"
              @click="model = true">
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
    },
    model: {
      get() {
        return Boolean(this.value);
      },
      set(value) {
          
          if (this.nullable) {
            if (this.value === false && value === false) {
                this.$emit('input', null);
                this.$emit('change', null);
            }
            if (this.value === true && value === true) {
                this.$emit('input', null);
                this.$emit('change', null);
            }
          } else {
              this.$emit('input', value);
          }
      }
    }
  },
  watch: {
    value() {
      console.log('value');
      this.$emit('change', this.value);
    }
  },
  created() {
    //TODO: Костыль
    // if(this.value === null || this.value === undefined) {
    //   this.setValue(false)
    // }
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
