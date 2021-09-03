<template>
    <div class="rb-tag-multi-select-input" :class="focused ? 'rb-tag-multi-select-input-focused': ''"
         v-click-outside="clickOutSide">

        <b-input type="text"
                 class="rb-tag-multi-select-search-input"
                 :placeholder="placeholder"
                 ref="input"
                 v-model="inputValue"
                 @focus="focused = true"
                 @blur="focused = false"
                 @click="setOptionsVisible"
                 autocomplete="off"
                 @input="debounceSearch"
                 v-on:keyup.down="onKeyDown"
                 v-on:keyup.up="onKeyUp"
                 v-on:keyup.enter="onKeyEnter"
                 v-on:keydown.escape="closeOptions">
        </b-input>

        <ul role="menu" class="options dropdown-menu show" tabindex="-1" v-if="optionsVisible">
            <li role="presentation" @click="select(item)" v-for="(item, i) in options"
                :active="i === activeOptionIndex"
                :key="item[valueField]">
                <a role="menuitem" class="dropdown-item" :ref="'dropdownItem_' + i"
                   href="#" target="_self"
                   v-on:keyup.down="onKeyDown"
                   v-on:keyup.up="onKeyUp"
                   v-on:keyup.enter="onKeyEnter"
                   v-on:keydown.escape="closeOptions">{{item[displayField]}}</a>
            </li>
        </ul>

        <div class="selected-items" v-if="selectedItems.length > 0">
            <b-badge href="#" class="rb-tag" variant="light" v-for="item in selectedItems" :key="item[valueField]">
                <span class="title">{{item[displayField]}}</span>
                <b-button class="rb-circle-button small remove-btn" @click="remove(item)" variant="outline-secondary">
                    <b-icon icon="x"></b-icon>
                </b-button>
            </b-badge>
        </div>

    </div>
</template>

<script>
    import {debounce} from 'debounce';
    import Vue from 'vue';

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
        name: 'RbTagMultiSelectInput',
        props: {
            value: Array,
            searchOptions: Function,
            async: {type: Boolean, default: true},
            displayField: {type: String, default: 'name'},
            valueField: {type: String, default: 'id'},
            placeholder: {type: String, default: 'Начните набирать...'},
            searchAfterInit: Boolean,
            addTagOnEnter: {type: Boolean, default: false},
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
                newTagOptionSuffix: '(Новый тег)'
            };
        },
        created() {
            if (this.searchAfterInit) {
                this.search('');
            }
            this.selectedItems = this.value || [];
        },
        watch: {
            value() {
                this.selectedItems = this.value;
            },
            activeOptionIndex(activeOptionIndex) {
                if (activeOptionIndex !== null) {
                    this.focusOption();
                }
            }
        },
        computed: {
            isManager() {
                return this.$store.getters['getUserInfo'].isManager;
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
                            let isManager = this.isManager
                            if (isManager) {
                                this.addNewTagOption(text);
                            }
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
                    this.$emit('change');
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
                let isManager = this.isManager
                if (this.addTagOnEnter && isManager) {
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
            }
        }

    };
</script>
