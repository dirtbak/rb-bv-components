<template>
  <b-dropdown
    class="rb-dropdown-input rb-multi-dropdown-input"
    :variant="variant"
    :class="cls"
    :disabled="disabled"
    no-caret
    :block="block"
    @click="$emit('click', $event)"
    @show="$emit('show', $event)"
    @shown="$emit('shown', $event)"
    @hide="$emit('hide', $event)"
    @hidden="$emit('hidden', $event)"
  >
    <template v-slot:button-content>
      <rb-text>
        {{ text ? text : showCancelItem ? cancelItemText : placeholder }}
      </rb-text>
      <slot name="counter" :counter="counter">
        <span v-if="counter > 0" class="rb-counter">
          {{ counter ? counter : '' }}
        </span>
      </slot>
      <span v-if="!noCaret" class="rb-dropdown-indicator">
        <rb-icon :icon="dropdownIcon" />
      </span>
    </template>
    <template v-for="o in options">
      <slot
        name="item"
        :on-selected="onClick"
        :is-selected="innerValue != null && innerValue.indexOf(o.value) >= 0"
        :item="o"
      >
        <b-dropdown-item
          :key="o.value"
          :class="{ 'rb-selected': innerValue != null && innerValue.indexOf(o.value) >= 0 }"
          @click="onClick(o)"
        >
          <slot name="item" :item="o">
            <rb-text
              v-b-tooltip.noninteractive.hover="{
                duration: 200,
                title: o.text,
                customClass: tooltipCustomClass,
              }"
            >
              {{ o.text }}
            </rb-text>
          </slot>
        </b-dropdown-item>
      </slot>
    </template>
  </b-dropdown>
</template>

<script>
import {i18n} from "@/i18n";

export default {
  name: 'RbMultiDropdownInput',
  props: {
    value: [Array, String, Number],
    bindField: { type: String, default: 'id' },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    bordered: { type: Boolean, default: false },
    placeholder: { type: String, default: i18n.t('placeholder') },
    cancelItemText: { type: String, default: i18n.t('notStated') },
    showCancelItem: { type: Boolean, default: false },
    variant: { type: String, default: 'light' },
    valueField: { type: String, default: 'id' },
    displayField: { type: String, default: 'name' },
    valueAsString: { type: Boolean, default: false },
    valueAsObject: { type: Boolean, default: false },
    block: Boolean,
    state: { type: Boolean, default: null },
    dropdownIcon: { type: String, default: 'icon-chevron-down' },
    noCaret: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    tooltipCustomClass: { type: String, default: '' },
  },
  data() {
    return {
      innerValue: [],
      options: [],
    };
  },
  computed: {
    cls() {
      return {
        'rb-bordered': this.bordered,
        'is-invalid': this.state === false,
        'is-valid': this.state === true,
      };
    },
    text() {
      let th = this;
      if (th.innerValue == null) {
        return null;
      } else {
        return this.$t('selected');
      }
    },
    counter() {
      const th = this;
      return th.innerValue ? th.innerValue.length : 0;
    },
  },
  watch: {
    items() {
      let th = this;
      th.fillOptions(th.items);
    },
    value() {
      this.setInnerValue();
    },
  },
  methods: {
    fillOptions(items) {
      let th = this;
      th.options = [];

      items.forEach((item) => {
        th.options.push({ text: item[th.displayField], value: item[th.valueField], data: item });
      });

      if (th.showCancelItem) {
        th.options.push({ text: th.cancelItemText, value: null });
      }
    },
    findInOptions(value) {
      let th = this;
      let result = null;
      th.options.forEach((item) => {
        if (item.value === value) {
          result = item;
        }
      });
      return result;
    },
    onClick(item) {
      let th = this;

      let changeValue = function () {
        let newValue = th.innerValue;
        if (th.valueAsString) {
          newValue = th.innerValue.join(',');
        } else if (th.valueAsObject) {
          newValue = th.innerValue.map((item) => ({ [th.bindField]: item }));
        }
        th.$emit('input', newValue);
        th.$emit('change', newValue);
      };

      //
      if (item.value === null) {
        th.innerValue = [];
        changeValue();
        return;
      }

      th.innerValue = th.innerValue != null ? th.innerValue : [];
      if (th.innerValue.indexOf(item.value) < 0) {
        th.innerValue.push(item.value);
        th.innerValue.sort();
        changeValue();
      } else {
        let i = th.innerValue.indexOf(item.value);
        th.innerValue.splice(i, 1);
        changeValue();
      }
    },
    splitStringValue() {
      let th = this;
      if (!th.value) {
        return null;
      }
      if (typeof th.value === 'string') {
        return th.value.split(',').map((i) => parseInt(i));
      }
      return [th.value];
    },
    setInnerValue() {
      if (this.valueAsString) {
        if (typeof this.value === 'number' || typeof this.value === 'string') {
          this.innerValue = [this.value];
        } else {
          this.innerValue = this.splitStringValue();
        }
      } else if (this.valueAsObject) {
        if (!this.value) {
          this.innerValue = this.value;
        } else {
          this.innerValue = this.value.map((item) => item[this.bindField]);
        }
      } else {
        this.innerValue = this.value;
      }
    },
  },
  created() {
    this.setInnerValue();
    this.fillOptions(this.items);
  },
};
</script>
