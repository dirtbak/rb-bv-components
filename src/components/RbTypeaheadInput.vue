<template>
  <div class="rb-typeahead-input" v-click-outside="onClickOutside">
    <div class="rb-typeahead-inner">
      <b-input-group>
        <b-input
            ref="input"
            type="text"
            v-model="text"
            :placeholder="placeholder"
            :state="state"
            :disabled="disabled"
            autocomplete="off"
            v-on:keyup.enter="onKeyEnter"
            v-on:keydown.down="onKeyArrowDown"
            v-on:keydown.up="onKeyArrowUp"
            v-on:keyup.esc="onKeyEsc"
            @focus="onFocus"
            @blur="$emit('blur', $event)"
            @input="onInput"
          />
          <template #append>
            <slot name="append" :val="selectedOption"/>
          </template>
      </b-input-group>
      
      <b-dropdown
        ref="dropdown"
        class="rb-typeahead-dropdown"
        :class="{ 'rb-empty': !options.length && !showCancelOption }"
        variant="plain"
        no-caret
        @shown="onDropdownShown"
        @hidden="onDropdownHidden"
        @hide="handleDropdownHide"
      >
        <!-- v-if="options.length || showCancelOption" -->
        <b-dropdown-item
          v-for="(o, index) in options"
          :key="o[valueField]"
          :active="index === selectIndex"
          :class="{ 'rb-current': o[valueField] === value && value !== null }"
          @click="onOptionSelect(o)"
        >
          <slot :val="o">{{ o[titleField] }}</slot>
        </b-dropdown-item>
        <b-dropdown-item
          @click="onOptionSelect(cancelOption)"
          :active="selectIndex === options.length"
          v-if="showCancelOption && !notDefault"
        >
          {{ cancelOption[titleField] }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import typeOf from 'typeof';
import { typeaheadMixin } from '../mixin/typeahead';

export default {
  name: 'RbTypeaheadInput',
  mixins: [typeaheadMixin],
  data() {
    return {
      backupOption: null,
      selectedOption: null,
    };
  },
  watch: {
    value() {
      if (this.value !== null) {
        this.resolveValue(this.value);
      } else {
        this.text = null;
      }
    },
  },
  methods: {
    onFocus() {
      if (!this.dropdownShown) {
        this.$refs.dropdown.show();
      }
      if (this.clearOnFocus) {
        this.backupOption = {};
        this.backupOption[this.valueField] = this.value;
        this.backupOption[this.titleField] = this.text;
        this.text = '';
        this.debounceSearch(this.text);
      }
    },
    onOptionSelect(option) {
      this.text = this.isCancelOption(option) ? null : option[this.titleField];
      this.selectedOption = option;
      this.$emit('input', option[this.valueField]);
      this.$emit('change', option[this.valueField]);
      this.closeDropdown();
    },
    resolveValue(value) {
      if (value !== null) {
        let option = this.searchInOptions(value);
        if (!option && this.searchOptionByValues) {
          if (this.async) {
            this.isLoading = false;
            this.searchOptionByValues(value)
              .then((options) => {
                if (options) {
                  let addOption = typeOf(options) === 'array' ? options[0] : options;
                  if (addOption) {
                    if (!this.searchInOptions(addOption)) {
                      this.options.push(addOption);
                    }
                  }

                  option = this.searchInOptions(value);
                  this.text = option ? option[this.titleField] : null;
                }

                this.isLoading = false;
              })
              .catch((err) => {
                this.isLoading = false;
                throw err;
              });
          } else {
            let options = this.searchOptionByValues(value);
            if (options) {
              let addOption = typeOf(options) === 'array' ? options[0] : options;
              if (addOption) {
                if (!this.searchInOptions(addOption)) {
                  this.options.push(addOption);
                }
              }
              option = this.searchInOptions(value);
              this.text = option ? option[this.titleField] : null;
            }
          }
        } else if (option) {
          this.text = option[this.titleField];
        } else {
          if (this.backupOption && this.backupOption[this.valueField] === this.value) {
            this.text = this.backupOption[this.titleField];
          } else {
            this.text = null;
          }
        }
      }
    },
  },
};
</script>
