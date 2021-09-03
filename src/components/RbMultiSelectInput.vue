<template>
    <div>
        <multiselect class="rb-multiselect-input"
                     ref="multiselect"
                     v-model="selectedItems"
                     :options="options"
                     :label="displayField"
                     :track-by="valueField"
                     :loading="isLoading"
                     :placeholder="placeholder"
                     :multiple="true"
                     :blockKeys="['Delete']"
                     :close-on-select="closeOnSelect"
                     :clear-on-select="clearOnSelect"
                     :preserve-search="true"
                     :show-labels="false"
                     :internal-search="false"
                     :searchable="true"
                     :showNoResults="false"
                     :showNoOptions="false"
                     :class="{'rb-bordered': bordered, 'has-options': options.length > 0, 'is-invalid': state === false}"
                     @search-change="debounceSearch"
                     @input="valueChange">
            <template slot="tag">{{''}}</template>
            <template slot="caret">
                <b-dropdown v-if="selectedItems && selectedItems.length > 0"
                            ref="dropdown"
                            class="b-dropdown"
                            :offset="35"
                            variant="primary"
                            :block="true"
                            :dropleft="true"
                            no-caret>
                    <template v-slot:button-content>
                        <span :style="dropdownBtnStyles">{{selectedItems.length}}</span>
                    </template>

                    <table class="dropdown-content">
                        <tr class="b-dropdown-row" v-for="item in selectedItems"
                            :key="item[valueField]"
                            :value="item[displayField]">
                            <td class="b-dropdown-row-title">
                                <span>{{item[displayField]}}</span>
                            </td>
                            <td class="b-dropdown-row-button">

                                <b-button class="rb-circle-button remove-btn" variant="outline-secondary"
                                          @click="removeItem(item[valueField])">
                                    <b-icon icon="x"></b-icon>
                                </b-button>
                            </td>
                        </tr>
                    </table>
                </b-dropdown>
                <span v-else>{{''}}</span>
            </template>
            <template slot="option" slot-scope="props">
                <span class="option-text">{{ props.option[displayField] }}</span>

            </template>

        </multiselect>

    </div>
</template>

<script>
    import {debounce} from 'debounce';
    import Multiselect from 'vue-multiselect';

    export default {
        name: 'RbMultiSelectInput',
        components: {multiselect: Multiselect},
        props: {
            value: Array,
            searchOptions: Function,
            clearOnSelect: {type: Boolean, default: true},
            closeOnSelect: {type: Boolean, default: true},
            async: {type: Boolean, default: true},
            displayField: {type: String, default: 'name'},
            valueField: {type: String, default: 'id'},
            placeholder: {type: String, default: 'Начните набирать...'},
            bordered: {type: Boolean, default: false},
            searchAfterInit: Boolean,
            state: {type: Boolean, default: null},
            fillOptionsAtOnce: {type: Boolean, default: false},
        },
        data() {
            return {
                isLoading: false,
                options: [],
                selectedItems: []
            }
        },
        created() {
            if(this.fillOptionsAtOnce) this.search()
            this.selectedItems = this.value;
            if (this.searchAfterInit) {
                this.search('');
            }

        },
        watch: {
            value() {
                this.selectedItems = this.value
            },
            selectedItems() {
                this.$emit('change');
            }
        },
        methods: {
            removeItem(key) {
                const index = this.selectedItems.findIndex(item => item[this.valueField] === key);
                if (index !== -1) {
                    let removedItems = this.selectedItems.splice(index, 1);
                    this.$emit('removeItem', removedItems[0]);
                    this.$emit('input', this.selectedItems);
                }
                this.$refs.dropdown.show(true)
            },


            debounceSearch: debounce(function (text) {
                this.search(text);
            }, 200),

            search(text) {
                if (this.async) {
                    this.isLoading = true;
                    this.searchOptions(text).then(options => {
                        this.options = options;
                        this.isLoading = false;
                    }).catch(err => {
                        this.isLoading = false;
                        throw  err;
                    });
                } else {
                    this.options = this.searchOptions(text);
                }
            },

            valueChange(e) {
                this.$emit('input', e);
            }
        },
        computed: {
            dropdownBtnStyles() {
                let fontSize = '13px';
                if (this.selectedItems) {
                    if (this.selectedItems.length >= 100) {
                        fontSize = '11px';
                    } else if (this.selectedItems.length >= 1000) {
                        fontSize = '9px';
                    }
                }
                return {
                    'font-size': fontSize
                };
            }
        }
    }
</script>
