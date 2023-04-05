import {debounce} from "debounce";
import {i18n, tbv} from "@/i18n";

export const typeaheadMixin = {
    props: {
        valueField: {type: String, default: 'id'},
        titleField: {type: String, default: 'name'},
        placeholder: {type: String, default: tbv('startTyping')},
        state: {type: Boolean, default: null},
        notDefault: {type: Boolean, default: false},
        searchOptions: Function,
        searchOptionByValues: {type: Function, default: null},
        value: {type: [String, Number, Array], default: null},
        showCancelOption: {type: Boolean, default: true},
        cancelOptionTitle: {type: String, default: tbv('notStated')},
        cancelOptionValue: {type: [String, Number], default: null},
        async: {type: Boolean, default: true},
        clearOnFocus: {type: Boolean, default: false},
        disabled: {type: Boolean, default: false},
    },
    data() {
        return {
            text: null,
            isLoading: false,
            options: [],
            dropdownShown: false,
            dropdownOkToHide: false,
            selectIndex: 0,
            valueResolved: null,
        }
    },
    computed: {
        cancelOption() {
            let o = {};
            o[this.titleField] = this.cancelOptionTitle;
            o[this.valueField] = null;
            return o;
        }
    },
    methods: {
        onInput() {
            this.debounceSearch(this.text);
            if (!this.dropdownShown) {
                this.$refs.dropdown.show();
            }
        },
        isCancelOption(option) {
            return option[this.valueField] === this.cancelOption[this.valueField];
        },
        debounceSearch: debounce(function (text) {
            if (this.async) {
                this.isLoading = true;
                if(text != null && text != '') {
                    this.searchOptions(text).then(options => {
                        this.options = options;
                        this.selectIndex = 0;
                        this.isLoading = false;
                    }).catch(err => {
                        this.isLoading = false;
                        throw  err;
                    });
                } else {
                    this.options = [];
                }
            } else {
                this.selectIndex = 0;
                this.options = this.searchOptions(text);
            }
        }, 200),
        searchInOptions(value) {
            return this.options.find(o => o[this.valueField] == value);
        },
        closeDropdown() {
            this.dropdownOkToHide = true;
            this.$refs.dropdown.hide();
        },
        handleDropdownHide(e) {
            if (this.dropdownOkToHide) {
                this.dropdownOkToHide = false
            } else {
                e.preventDefault()
            }
        },
        onClickOutside() {
            this.closeDropdown();
            //this.resolveValue(this.value);
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
                this.onOptionSelect(this.cancelOption);
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
        },
        clearText() {
            this.text = null;
        }
    },
    created() {
        if (this.value !== null) {
            this.resolveValue(this.value);
        }
    }
}
