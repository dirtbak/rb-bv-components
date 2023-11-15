<template>
    <div :class="cls" class="rb-tag-multi-select-input"
         v-click-outside="clickOutSide">

        <b-input :disabled="disabled || isMaxLength"
                 :placeholder="placeholder"
                 :state="state"
                 @blur="focused = false"
                 @click="setOptionsVisible"
                 @focus="focused = true"
                 @input="debounceSearch"
                 autocomplete="off"
                 class="rb-tag-multi-select-search-input"
                 ref="input"
                 type="text"
                 v-model="inputValue"
                 v-on:keydown.escape="closeOptions"
                 v-on:keyup.down="onKeyDown"
                 v-on:keyup.enter="onKeyEnter"
                 v-on:keyup.up="onKeyUp"/>

        <ul class="options dropdown-menu show" role="menu" tabindex="-1" v-if="optionsVisible">
            <li :active="i === activeOptionIndex" :key="item[valueField]" @click="select(item)"
                role="presentation"
                v-for="(item, i) in options">
                <span :ref="'dropdownItem_' + i" class="dropdown-item"
                   role="menuitem" target="_self"
                   v-on:keydown.escape="closeOptions"
                   v-on:keyup.down="onKeyDown"
                   v-on:keyup.enter="onKeyEnter"
                   v-on:keyup.up="onKeyUp">{{item[displayField]}}</span>
            </li>
        </ul>

        <div class="selected-items" v-if="selectedItems.length > 0">
            <b-badge :key="item[valueField]" class="rb-tag" href="#" v-for="item in selectedItems" variant="light">
                <span class="title">{{item[displayField]}}</span>
                <b-button v-if="!disabled" @click="remove(item)" class="small remove-btn" variant="plain">
                    <rb-icon icon="icon-close"/>
                </b-button>
            </b-badge>
        </div>
    </div>
</template>

<script>
    import {debounce} from 'debounce';
    import {tbv} from "@/i18n";

    export default {
        name: 'RbTagMultiSelectInput',
        props: {
            value: Array,
            searchOptions: Function,
            async: {type: Boolean, default: true},
            displayField: {type: String, default: 'name'},
            valueField: {type: String, default: 'id'},
            placeholder: {type: String, default: tbv('startTyping')},
            searchAfterInit: Boolean,
            addTagOnEnter: {type: Boolean, default: false},
            state: {type: Boolean, default: null},
            disabled: Boolean,
            maxTags: { type: [String, Number], default: Infinity }
        },
        data: () => {
            return {
                busy: false,
                options: [],
                selectedItems: [],
                focused: false,
                optionsVisible: false,
                activeOptionIndex: null,
                inputValue: null,
                newTagCounter: 0, // нужен для генерации id для каждого нового тега (id должны быть отрицательными, чтобы отличить их от сущ.)
                newTagOptionSuffix: `(${tbv('newTag')})`
            };
        },
        computed: {
            cls() {
                return {
                    'rb-tag-multi-select-input-focused': this.focused,
                    'is-invalid': this.state === false,
                    'is-valid': this.state === true,
                }
            },
            isMaxLength() {
                return parseInt(this.maxTags) === this.selectedItems.length
            }
        },
        watch: {
            value(val) {
                if (val) {
                    this.selectedItems = val || [];
                } else {
                    this.selectedItems = [];
                }
            },
            selectedItems(val) {
                if (!val.length) {
                    this.inputValue = null
                }
            },
            activeOptionIndex(activeOptionIndex) {
                if (activeOptionIndex !== null) {
                    this.focusOption();
                }
            }
        },
        methods: {
            debounceSearch: debounce(async function (text) {
                await this.search(text);
                this.optionsVisible = this.options.length > 0;
            }, 200),
            async search(text) {
                if (this.async) {
                    this.isLoading = true;
                    await this.searchOptions(text).then(options => {
                        this.options = options;
                        if (this.addTagOnEnter) {
                            this.addNewTagOption(text);
                        }
                        this.activeOptionIndex = null;
                        this.isLoading = false;
                    }).catch(err => {
                        this.isLoading = false;
                        throw  err;
                    });
                } else {
                    this.options = this.searchOptions(text);
                    this.activeOptionIndex = null;
                }
            },
            select(item) {
                const selectableItem = this.handleSelectableItem(item);
                if (!this.selectedItems.find(i => {
                    if (this.addTagOnEnter) {
                        // условие для того, чтобы не добавлять новые теги с одинаковым названием
                        if (item[this.valueField] < 0) {
                            return i[this.displayField] === selectableItem[this.displayField];
                        }
                    }
                    return i[this.valueField] === selectableItem[this.valueField];
                })) {
                    this.selectedItems.push(selectableItem);
                    this.activeOptionIndex = null;
                    this.inputValue = null;
                    this.$emit('input', this.selectedItems);
                    this.$emit('change', this.selectedItems);
                }
                this.optionsVisible = false;
            },
            remove(item) {
                const index = this.selectedItems.findIndex(i => i[this.valueField] === item[this.valueField] && i[this.displayField] === item[this.displayField]);
                if (index !== -1) {
                    this.selectedItems.splice(index, 1);
                    this.$emit('input', this.selectedItems);
                    this.$emit('change');
                }
            },
            setOptionsVisible() {
                if (this.optionsVisible === true) {
                    this.optionsVisible = false;
                } else if (this.options.length > 0) {
                    this.optionsVisible = true;
                }
            },
            addNewTagOption(text) {
                if (text) {
                    const newOption = {};
                    newOption[this.valueField] = -1000;
                    newOption[this.displayField] = `${text} ${this.newTagOptionSuffix}`;
                    this.options.push(newOption);
                }
            },
            // если выбираем новый не созданный тег, очищаем от суффикса
            handleSelectableItem(item) {
                const result = {...item};
                result[this.displayField] = result[this.displayField].replaceAll(` ${this.newTagOptionSuffix}`, '');
                return result;
            },
            clickOutSide: function (e) {
                this.optionsVisible = false;
            },
            onKeyDown() {
                if (this.optionsVisible) {
                    if (this.activeOptionIndex === null) {
                        this.activeOptionIndex = 0;
                    } else if (this.options.length - 1 > this.activeOptionIndex) {
                        this.activeOptionIndex++;
                    } else {
                        this.activeOptionIndex = 0;
                    }
                } else {
                    this.search(this.inputValue);
                }
            },
            onKeyUp() {
                if (this.optionsVisible) {
                    if (this.activeOptionIndex === null) {
                        this.activeOptionIndex = this.options.length - 1;
                    } else if (this.activeOptionIndex > 0) {
                        this.activeOptionIndex--;
                    } else {
                        this.activeOptionIndex = this.options.length - 1;
                    }
                }

            },
            onKeyEnter(e) {
                if (this.addTagOnEnter) {
                    this.newTagCounter--; // декрементируем счетчик, чтобы использовать как id для нового тега
                    this.select({id: this.newTagCounter, name: this.inputValue});
                }

                if (this.optionsVisible) {
                    if (this.options[this.activeOptionIndex]) {
                        this.select(this.options[this.activeOptionIndex]);
                    }
                } else {
                    this.search();
                }

            },
            closeOptions() {
                this.optionsVisible = false;
            },
            focusOption() {
                this.$refs['dropdownItem_' + this.activeOptionIndex][0].focus();
            },
            resetText() {
                this.inputValue = null;
            }
        },
        created() {
            if (this.searchAfterInit) {
                this.search('');
            }
            this.selectedItems = this.value || [];
        },
    };
</script>
