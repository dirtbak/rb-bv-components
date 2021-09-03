<template>
    <div>
        <multiselect class="rb-typeahead-input"
                     ref="multiselect"
                     v-model="innerValue"
                     :options="options"
                     :label="displayField"
                     :track-by="valueField"
                     :loading="isLoading"
                     :placeholder="placeholder"
                     :multiple="false"
                     :blockKeys="['Delete']"
                     :internal-search="false"
                     :searchable="true"
                     :showNoResults="false"
                     :showNoOptions="false"
                     :show-labels="false"
                     :class="{'rb-bordered': bordered, 'rb-single': true, 'is-invalid': state === false}"
                     @search-change="debounceSearch"
                     @input="valueChange">
            <template slot="tag">{{''}}</template>
            <template slot="caret">
                <span>{{''}}</span>
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
        name: 'RbTypeaheadInput',
        components: {multiselect: Multiselect},
        props: {
            value: Object,
            searchOptions: Function,
            async: {type: Boolean, default: true},
            bordered: {type: Boolean, default: false},
            displayField: {type: String, default: 'name'},
            valueField: {type: String, default: 'id'},
            placeholder: {type: String, default: 'Начните набирать...'},
            state: {type: Boolean, default: null}
        },
        data() {
            return {
                innerValue: null,
                isLoading: false,
                options: []
            }
        },
        created() {
            this.innerValue = this.value;
        },
        watch: {
            value() {
                this.innerValue = this.value
            },
            innerValue() {
                this.$emit('change');
            }
        },

        methods: {
            debounceSearch: debounce(function (text) {
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

            }, 200),

            valueChange(e) {
                this.$emit('input', e);
            }
        }
    }
</script>
