<template>
  <b-button-group class="rb-single-option-input" :class="cls">
    <b-button v-for="item in items"
              :key="item[valueField]"
              :variant="item[valueField] === value ? 'primary' : 'light'"
              :data-id="item[valueField]"
              @click="onItemClick(item)"
              :disabled="disabled"
              :title="showTitles ? item[displayField] : ''">
      <template v-if="showIcon">
        <span class="rb-icon mdi" :class="item[iconProperty]"></span>
      </template>
      <span class="rb-text">{{ item[displayField] }}</span>
    </b-button>
  </b-button-group>
</template>

<script>
export default {
  name: 'RbSingleOptionInput',
  props: {
    value: [Number, String],
    items: Array,
    bordered: {type: Boolean, default: false},
    valueField: {
      type: String,
      default: 'id'
    },
    displayField: {
      type: String,
      default: 'name'
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    shortText: {
      type: Boolean,
      default: false
    },
    iconProperty: {
      type: String,
      default: 'icon'
    },
    showTitles: Boolean,
    state: {type: Boolean, default: null},
    disabled: Boolean,
    block: Boolean,
  },
  computed: {
    cls() {
      return {
        'rb-bordered': this.bordered,
        'is-invalid': this.state === false,
        'is-valid': this.state === true,
        'w-100': this.block,
        'rb-single-option-input__short-text': this.shortText
      }
    }
  },
  methods: {
    onItemClick(item) {
      this.$emit('input', item[this.valueField]);
      this.$emit('change', item[this.valueField]);
    }
  }
};
</script>

<style lang="scss">
  .rb-single-option-input {
    &__short-text {
      button {
        width: 33.3%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
</style>
