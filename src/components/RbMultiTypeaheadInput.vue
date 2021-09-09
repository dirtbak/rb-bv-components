<template>
    <div class="rb-typeahead-input rb-multi-typeahead-input" v-click-outside="onClickOutside">
        <div class="rb-typeahead-inner">
            <b-input ref="input"
                     type="text"
                     v-model="text"
                     :placeholder="placeholder"
                     :state="state"
                     autocomplete="off"
                     v-on:keyup.enter="onKeyEnter"
                     v-on:keydown.down="onKeyArrowDown"
                     v-on:keydown.up="onKeyArrowUp"
                     v-on:keyup.esc="onKeyEsc"
                     @focus="onFocus"
                     @input="onInput">
            </b-input>
            <b-dropdown ref="dropdown"
                        class="rb-typeahead-dropdown"
                        :class="{'rb-empty': !options.length && !showCancelOption}"
                        variant="plain"
                        no-caret
                        @shown="onDropdownShown"
                        @hidden="onDropdownHidden"
                        @hide="handleDropdownHide"> <!-- v-if="options.length || showCancelOption" -->
                <b-dropdown-item v-for="(o, index) in options"
                                 :key="o[valueField]"
                                 :active="index === selectIndex"
                                 :class="{'rb-current': o[valueField] === value && value !== null}"
                                 @click="onOptionSelect(o)">
                    {{o[titleField]}}
                </b-dropdown-item>
                <b-dropdown-item @click="onOptionSelect(cancelOption)"
                                 :active="selectIndex === options.length"
                                 v-if="showCancelOption">
                    {{cancelOption[titleField]}}
                </b-dropdown-item>
            </b-dropdown>
            <b-dropdown v-if="selectedOptions && selectedOptions.length" no-caret right
                        class="rb-counter-dropdown" variant="plain">
                <template v-slot:button-content>
                    <span class="rb-counter">
                        {{counter}}
                    </span>
                </template>
                <b-dropdown-item v-for="o in selectedOptions"
                                 :key="o[valueField]">
                    <rb-text>{{o[titleField]}}</rb-text>
                    <b-button variant="plain" @click="remove(o[valueField])">
                        <rb-icon class="icon-close"></rb-icon>
                    </b-button>
                </b-dropdown-item>
            </b-dropdown>
        </div>
    </div>
</template>

<script>
    import typeOf from 'typeof';
    import {typeaheadMixin} from "../mixin/typeahead";

    export default {
        name: 'RbMultiTypeaheadInput',
        mixins: [typeaheadMixin],
        props: {
            multi: {type: Boolean, default: false},
        },
        data() {
            return {
                backupOption: null,
                selectedOptions: null,
            }
        },
        computed: {
            counter() {
                return this.value && this.value.length ? this.value.length : 0;
            }
        },
        watch: {
            value() {
                this.resolveValue(this.value);
            }
        },
        methods: {
            onFocus() {
                if (!this.dropdownShown) {
                    this.$refs.dropdown.show();
                }
            },
            onOptionSelect(option) {
                if (!this.isCancelOption(option)) {
                    if (!this.selectedOptions.find(o => o[this.valueField] === option[this.valueField])) {
                        this.selectedOptions.push(option);
                    }
                } else {
                    this.selectedOptions = [];
                }
                let value = this.selectedOptions.map(o => o[this.valueField]).filter(o => o !== null);
                this.$emit('input', value);
                this.$emit('change', value);
                this.clearText();
                this.closeDropdown();
            },
            resolveValue(value) {
                if (value !== null) {
                    if (this.async) {
                        this.isLoading = false;
                        this.searchOptionByValues(value).then(options => {
                            this.mergeOptions(options, this.options);
                            this.generateSelectedOptions();
                            this.isLoading = false;
                        }).catch(err => {
                            this.isLoading = false;
                            throw  err;
                        });
                    } else {
                        let options = this.searchOptionByValues(value);
                        this.mergeOptions(options, this.options);
                        this.generateSelectedOptions();
                    }
                } else {
                    this.generateSelectedOptions();
                }
            },
            generateSelectedOptions() {
                this.selectedOptions = [];
                if(this.value && this.value.length) {
                    this.value.forEach(v => {
                        let found = this.options.find(o => o[this.valueField] === v);
                        if(found) {
                            this.selectedOptions.push(found);
                        }
                    })
                }
            },
            mergeOptions(options, destination) {
                if (typeOf(options) === 'array') {
                    options.forEach(option => {
                        this.mergeOption(option, destination)
                    })
                } else {
                    this.mergeOption(options, destination)
                }
            },
            mergeOption(option, destination) {
                if (!option) {
                    return;
                }
                if(!destination) {
                    destination = [];
                }
                if (!destination.find(o => o[this.valueField] === option[this.valueField])) {
                    destination.push(option);
                }
            },
            remove(value) {
                if(!this.value) {
                    this.resolveValue(this.value);
                    return;
                }

                let index = this.value.findIndex(v => v === value);
                if(index !== -1) {
                    let newValue = [...this.value];
                    newValue.splice(index, 1);
                    newValue = newValue.length? newValue: null;
                    this.$emit('input', newValue);
                    this.$emit('change', newValue);
                }
            }
        },
        created() {
            this.selectedOptions = [];
            if (this.value !== null) {
                this.resolveValue(this.value);
            }
        }
    }
</script>