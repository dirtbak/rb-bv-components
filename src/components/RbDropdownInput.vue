<template>
  <b-dropdown
    class="rb-dropdown-input"
    :dropup="dropup"
    :variant="variant"
    :block="block"
    :disabled="disabled"
    :class="cls"
    :split="split"
    :splitText="splitText"
    :fixedText="fixedText"
    ref="dropdown"
    @click="$emit('click', $event)"
    @show="$emit('show', $event)"
    @shown="$emit('shown', $event)"
    @hide="$emit('hide', $event)"
    @hidden="$emit('hidden', $event)"
    @blur="$emit('blur', $event)"
    no-caret
  >
    <template v-slot:button-content v-if="!split">
      <slot
        name="button-content"
        :text="text"
        :cancelItemText="cancelItemText"
        :placeholder="placeholder"
        :showCancelItem="showCancelItem"
      >
        <rb-icon v-if="icon" :icon="icon" :color="getIconColor(value)" />
        <a class="rb-text" v-if="link">
          {{ text ? text : showCancelItem ? cancelItemText : placeholder }}
        </a>
        <span class="rb-text" v-else-if="!fixedText">
          {{ text ? text : showCancelItem ? cancelItemText : placeholder }}
        </span>
        <span class="rb-text" v-else>
          {{ fixedText }}
        </span>
        <span class="rb-dropdown-indicator" v-if="!noCaret">
          <rb-icon :icon="dropdownIcon" />
        </span>
      </slot>
    </template>
    <template v-slot:button-content v-else>
      <slot
        name="button-content"
      >
        <rb-icon v-if="btnIcon" :icon="btnIcon" :color="colorBtnIcon"/>
        <a class="rb-text" v-if="link">
          {{ splitText }}
        </a>
        <span class="rb-text" v-else>
          {{ splitText }}
        </span>
        <span class="rb-dropdown-indicator"
              @click="visibleDropdownMenu">
          <rb-icon :icon="dropdownIcon" />
        </span>
      </slot>
    </template>
    <b-dropdown-item v-for="o in options" :key="o.value" @click="onClick(o)">
      <slot name="option-content" :option="o">
        <rb-icon v-if="o.icon" :icon="o.icon" />
        <span
          v-b-tooltip.noninteractive.hover="{
            duration: 200,
            title: o.text,
            customClass: tooltipCustomClass,
          }">
            {{ o.text }}
        </span>
      </slot>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'RbDropdownInput',
  props: {
    value: [Number, Boolean, String, Object],
    valueAsObject: { type: Boolean, default: false },
    items: {
      type: Array,
      default: () => [],
    },
    placeholder: { type: String, default: 'Выбрать' },
    cancelItemText: { type: String, default: 'Не указано' },
    showCancelItem: { type: Boolean, default: false },
    showCancelIcon: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
    variant: { type: String, default: 'light' },
    bindField: {
      type: String,
      default: 'id',
    },
    valueField: {
      type: String,
      default: 'id',
    },
    displayField: {
      type: String,
      default: 'name',
    },
    icon: String,
    btnIcon: String,
    colorBtnIcon: String,
    state: { type: Boolean, default: null },
    block: Boolean,
    disabled: Boolean,
    link: Boolean,
    split: { type: Boolean, default: false },
    splitText: { type: String, default: '' },
    splitVariant: { type: String, default: 'outline-light' },
    dropdownIcon: { type: String, default: 'icon-chevron-down' },
    noCaret: { type: Boolean, default: false },
    tooltipCustomClass: { type: String, default: '' },
    dropup: {type: Boolean, default: false},
    fixedText: { type: String, default: null },
  },
  data() {
    return {
      innerValue: null,
      text: null,
      options: [],
      visibleMenu: false,
    };
  },
  computed: {
    cls() {
      return {
        'rb-dropdown-link-input': this.link,
        'rb-bordered': this.bordered,
        'rb-no-dropdown-indicator': this.noCaret,
        'is-invalid': this.state === false,
        'is-valid': this.state === true,
        'rb-dropdown-input__split': this.split === true,
      };
    },
  },
  watch: {
    items() {
      this.fillOptions(this.items);
      this.setText();
    },
    value() {
      this.setInnerValue();
      this.setText();
    },
  },
  created() {
    this.setInnerValue();
    this.fillOptions(this.items);
    this.setText();
    document.addEventListener('click', this.onClickOutside);
  },
  methods: {
    onClickOutside (e) {this.visibleMenu = false},
    fillOptions(items) {
      let th = this;
      th.options = [];

      items.forEach((item) => {
        th.options.push({ text: item[th.displayField], value: item[th.valueField], icon: item.icon });
      });

      if (th.showCancelItem) {
        th.options.push({ text: th.cancelItemText, value: null });
      }

      if (!this.split) {
        th.options.push({text: 'Не выбрано', value: null});
      }
    },
    setText() {
      let currentValIndex = this.options.findIndex((option) => option.value == this.innerValue);
      if (currentValIndex !== -1) {
        this.text = this.options[currentValIndex].text;
      }
    },
    setInnerValue() {
      if (this.valueAsObject) {
        this.innerValue = this.value != null ? this.value[this.bindField] : null;
      } else {
        this.innerValue = this.value;
      }
    },
    onClick(item) {
      this.visibleMenu = false;
      if (this.valueAsObject) {
        let objectVal = { [this.bindField]: item.value };
        this.$emit('input', objectVal);
        this.$emit('change', objectVal);
        this.$emit('click', objectVal);
      } else {
        this.$emit('input', item.value);
        this.$emit('change', item.value);
        this.$emit('click', item.value);
      }
    },
    getIconColor(value) {
      const item = this.items.find((item) => item[this.valueField] === value);
      return item ? `#${item.color}` : this.showCancelIcon ? null : 'transparent';
    },
    visibleDropdownMenu(e) {
        e.stopPropagation(e);
        this.visibleMenu = !this.visibleMenu;

        if(this.visibleMenu) {
            this.$refs.dropdown.show();
        } else {
            this.$refs.dropdown.hide();
            e.target.parentElement.parentElement.blur();
        }
    }
  },
};
</script>
