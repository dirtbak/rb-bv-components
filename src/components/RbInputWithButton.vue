<template>
  <div class="rb-input-with-button">
    <template v-if="mask">
      <b-input
        :type="type"
        :placeholder="placeholder"
        :state="state"
        v-model="innerValue"
        v-mask="mask"
        :masked="masked"
        :disabled="disabled"
        ref="input"
        @focus="$emit('focus', $event)"
        @click="$emit('click', $event)"
        @input="$emit('input', $event)"
        @change="$emit('change', $event)"
      >
      </b-input>
    </template>
    <template v-else>
      <b-input
        :type="type"
        :placeholder="placeholder"
        :state="state"
        v-model="innerValue"
        ref="input"
        :disabled="disabled"
        @focus="$emit('focus', $event)"
        @click="$emit('click', $event)"
        @input="$emit('input', $event)"
        @change="$emit('change', $event)"
      >
      </b-input>
    </template>

    <b-button
      variant="plain"
      class="btn-icon rb-input-btn"
      :disabled="disabled"
      v-if="buttonVisible"
      @click="$emit('buttonClick')"
    >
      <rb-icon :icon="icon"></rb-icon>
    </b-button>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';

export default {
  name: 'RbInputWithButton',
  directives: { mask },
  props: {
    placeholder: String,
    state: { type: Boolean, default: null },
    value: [String, Number],
    type: { type: String, default: 'text' },
    icon: { type: String, default: 'icon-close' },
    masked: { type: Boolean, default: false },
    mask: { type: String, default: null },
    buttonVisible: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      innerValue: null,
    };
  },
  watch: {
    value() {
      this.innerValue = this.value;
    },
  },
  methods: {
    blur() {
      if (this.$refs.input) {
        return this.$refs.input.blur();
      }
    },
    select() {
      if (this.$refs.input) {
        return this.$refs.input.select();
      }
    },
    focus() {
      if (this.$refs.input) {
        return this.$refs.input.focus();
      }
    },
  },
  created() {
    this.innerValue = this.value;
  },
};
</script>
