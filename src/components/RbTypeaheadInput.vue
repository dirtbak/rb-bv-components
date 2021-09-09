<template>
    <div class="rb-typeahead-input" v-click-outside="onClickOutside">
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
        </div>
    </div>
</template>

<script>
    import typeOf from 'typeof';
    import {debounce} from "debounce";
    import Vue from "vue";

    Vue.directive('click-outside', {
        bind: function (el, binding, vnode) {
            el.clickOutsideEvent = function (event) {
                if (!(el == event.target || el.contains(event.target))) {
                    vnode.context[binding.expression](event);
                }
            };
            document.body.addEventListener('click', el.clickOutsideEvent)
        },
        unbind: function (el) {
            document.body.removeEventListener('click', el.clickOutsideEvent)
        },
    });

    export default {
        name: 'RbTypeaheadInput',
        props: {
            valueField: {type: String, default: 'id'},
            titleField: {type: String, default: 'name'},
            placeholder: {type: String, default: 'Начните набрать ...'},
            state: {type: Boolean, default: null},
            searchOptions: Function,
            searchOptionByValue: {type: Function, default: null},
            value: {type: [String, Number], default: null},
            showCancelOption: {type: Boolean, default: true},
            cancelOptionTitle: {type: String, default: 'Не важно'},
            cancelOptionValue: {type: [String, Number], default: null},
            async: {type: Boolean, default: true},
            clearOnFocus: {type: Boolean, default: false},
        },
        data() {
            return {
                text: null,
                backupOption: null,
                isLoading: false,
                options: [],
                innerValue: null,
                dropdownShown: false,
                dropdownOkToHide: false,
                selectIndex: 0,
            }
        },
        computed: {
            cancelOption() {
                let o = {};
                o[this.titleField] = this.cancelOptionTitle;
                o[this.valueField] = this.valueField;
                return o;
            }
        },
        watch: {
            value() {
                if (this.value !== null) {
                    this.resolveValue(this.value);
                } else {
                    this.text = null;
                }
            }
        },
        methods: {
            onInput() {
                this.debounceSearch(this.text);
                if (!this.dropdownShown) {
                    this.$refs.dropdown.show();
                }
            },
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
                this.text = this.isCancelOption(option)? null :option[this.titleField];
                this.$emit('input', option[this.valueField]);
                this.$emit('change', option[this.valueField]);
                this.closeDropdown();
            },
            isCancelOption(option) {
                return option[this.valueField] === option[this.valueField];
            },
            debounceSearch: debounce(function (text) {
                if (this.async) {
                    this.isLoading = true;
                    this.searchOptions(text).then(options => {
                        this.options = options;
                        this.selectIndex = 0;
                        this.isLoading = false;
                    }).catch(err => {
                        this.isLoading = false;
                        throw  err;
                    });
                } else {
                    this.selectIndex = 0;
                    this.options = this.searchOptions(text);
                }
            }, 200),
            defaultSearchOptionByValue(value) {
                return this.options.find(o => o[this.valueField] === value);
            },
            searchInOptions(value) {
                return this.options.find(o => o[this.valueField] === value);
            },
            resolveValue(value) {
                if (value !== null) {
                    let option = this.searchInOptions(value);
                    if (!option && this.searchOptionByValue) {
                        if (this.async) {
                            this.isLoading = false;
                            this.searchOptionByValue(value).then(option => {
                                if(option) {
                                    console.info('option', option);
                                    console.info("typeOf(option) === 'array'", typeOf(option) === 'array');
                                    if(typeOf(option) === 'array') {
                                        option = option[0];
                                    }
                                    this.options.push(option);
                                    this.text = option[this.titleField];
                                }
                                this.isLoading = false;
                            }).catch(err => {
                                this.isLoading = false;
                                throw  err;
                            });
                        } else {
                            option = this.searchOptionByValue(value);
                            if(option) {
                                if(typeof option === 'array') {
                                    option = option[0];
                                }
                                this.options.push(option);
                                this.text = option[this.titleField];
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
            closeDropdown() {
                this.dropdownOkToHide = true;
                this.$refs.dropdown.hide();
            },
            handleDropdownHide(bvEvent) {
                if (this.dropdownOkToHide) {
                    this.dropdownOkToHide = false
                } else {
                    bvEvent.preventDefault()
                }
            },
            onClickOutside() {
                this.closeDropdown();
                this.resolveValue(this.value);
            },
            onDropdownShown() {
                this.dropdownOkToHide = false;
                this.dropdownShown = true;
                this.$refs.input.focus();
            },
            onDropdownHidden() {
                this.dropdownShown = false;
            },
            onKeyEnter(e) {
                if (this.selectIndex < this.options.length) {
                    this.onOptionSelect(this.options[this.selectIndex]);
                } else if (this.selectIndex === this.options.length && this.showCancelOption) {
                    this.onOptionSelect(this.isCancelOption);
                }
                e.preventDefault();
            },
            onKeyArrowDown(e) {
                if (this.selectIndex < this.options.length) {
                    this.selectIndex++;
                }
                e.preventDefault();
            },
            onKeyArrowUp(e) {
                if (this.selectIndex > 0) {
                    this.selectIndex--;
                }
                e.preventDefault();
            },
            onKeyEsc(e) {
                this.closeDropdown();
            }
        },

        created() {
            if (this.value !== null) {
                this.resolveValue(this.value);
            }
        }
    }
</script>
