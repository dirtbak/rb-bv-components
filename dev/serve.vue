<script>
    import Vue from 'vue';
    import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';

    Vue.use(BootstrapVue);
    Vue.use(IconsPlugin);

    // Uncomment import and local "components" registration if library is not registered globally.
    // import { RbBvComponentsSample } from '@/entry.esm';
    // import { RbBooleanButtonInput } from '@/entry.esm';

    export default Vue.extend({
        name: 'ServeDev',
        // components: {
        //  RbBvComponentsSample,
        // }
        data() {
            return {
                rbBooleanButtonInput1: false,
                rbBooleanButtonInput2: false,
                rbBooleanSingleOptionInput1: false,
                rbBooleanSingleOptionInput2: false,
                rbColorDropdownInput1Items: [
                    {id: 1, color: 'dfcfre'},
                    {id: 2, color: 'dddddd'},
                    {id: 3, color: '000000'}
                ],
                rbDatePickerInput1: new Date(),
                rbDropdownInput1Items: [
                    {id: 1, name: 'Один'},
                    {id: 2, name: 'Два'},
                    {id: 3, name: 'Три'},
                ],
                rbDropdownInput1: null,
                rbDropdownLinkInput1: null,
                rbListGroupInput1: null,
                rbMultiDropdownInput1: [],
                rbMultiOptionInput1: [],
                rbMultiPhoneInput1: [],
                rbMultiSelectInput1: [],
                rbPeriodInputDtStart1: null,
                rbPeriodInputDtEnd1: null,
                rbPhoneInput1: null,
                rbPriceInput1: null,
                rbSelectInput1: null,
                rbSingleOptionInput1: null,
                rbTagMultiSelectInput1: [],
                rbTypeaheadInput1: null,
            }
        },
        methods: {
            async rbMultiSelectSearch1(text) {
                return this.rbDropdownInput1Items.filter(i => i && i.name && i.name.indexOf(text) >= 0);
            }
        }
    });
</script>

<template>
    <div id="app">
        <form>
            <h3>RbBooleanButtonInput</h3>
            <b-form-group label="Без чекбокса">
                <rb-boolean-button-input label="Все будет хорошо"
                                         v-model="rbBooleanButtonInput1"></rb-boolean-button-input>
            </b-form-group>
            <b-form-group label="С чекбоксом">
                <rb-boolean-button-input label="Все будет хорошо" :showCheckbox="true"
                                         v-model="rbBooleanButtonInput2"></rb-boolean-button-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbBooleanSingleOptionInput</h3>
            <b-form-group label="Без иконок">
                <rb-boolean-single-option-input v-model="rbBooleanSingleOptionInput1"></rb-boolean-single-option-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbBooleanSingleOptionInput</h3>
            <b-form-group label="С иконками">
                <rb-boolean-single-option-input v-model="rbBooleanSingleOptionInput2"
                                                show-icons></rb-boolean-single-option-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbColorDropdownInput</h3>
            <b-form-group label="Выбор цвета">
                <rb-color-dropdown-input :items="rbColorDropdownInput1Items"></rb-color-dropdown-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbDatePickerInput</h3>
            <b-form-group label="Выбор даты" style="width: 200px;">
                <rb-date-picker-input v-model="rbDatePickerInput1"></rb-date-picker-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbDropdownInput</h3>
            <b-form-group label="Выбор одного значения">
                <rb-dropdown-input :items="rbDropdownInput1Items" v-model="rbDropdownInput1"></rb-dropdown-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbDropdownLinkInput</h3>
            <b-form-group label="Выбор одного значения">
                <rb-dropdown-link-input :items="rbDropdownInput1Items" placeholder="Выбрать"
                                        v-model="rbDropdownLinkInput1"></rb-dropdown-link-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbEmailLink</h3>
            <b-form-group label="Автоматически пересылает на email">
                <rb-email-link email="rb-components@rebel.kz"></rb-email-link>
            </b-form-group>
        </form>
        <form>
            <h3>RbEmptyState</h3>
            <b-form-group label="На случай когда показать нечего">
                <div style="width: 400px; height: 200px;">
                    <rb-empty-state title="Ничего не найдено" icon="icon-none">
                        Попробуйте изменить параметры поиска
                    </rb-empty-state>
                </div>
            </b-form-group>
        </form>
        <form>
            <h3>RbIcon</h3>
            <b-form-group label="Иконки">
                <rb-icon icon="icon-none"></rb-icon>
            </b-form-group>
        </form>
        <form>
            <h3>RbListGroupInput</h3>
            <b-form-group label="Выбор одного значения" style="width: 200px;">
                <rb-list-group-input :items="rbDropdownInput1Items" v-model="rbListGroupInput1"></rb-list-group-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbMultiDropdownInput</h3>
            <b-form-group label="Выбор нескольких значений">
                <rb-multi-dropdown-input :items="rbDropdownInput1Items"
                                         v-model="rbMultiDropdownInput1"></rb-multi-dropdown-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbMultiOptionInput</h3>
            <b-form-group label="Выбор нескольких значений" style="width: 200px;">
                <rb-multi-option-input :items="rbDropdownInput1Items"
                                       v-model="rbMultiOptionInput1"></rb-multi-option-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbMultiPhoneInput</h3>
            <b-form-group label="Ввод нескольких телефонных номеров" style="width: 200px;">
                <rb-multi-phone-input v-model="rbMultiPhoneInput1"></rb-multi-phone-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbMultiSelectInput</h3>
            <b-form-group label="Typeahead инпут с выбором нескольких значений" style="width: 200px;">
                <rb-multi-select-input v-model="rbMultiSelectInput1" :search-options="rbMultiSelectSearch1"
                ></rb-multi-select-input>
            </b-form-group>
        </form>
        <!--<form>
            <h3>RbPagination</h3>
            <b-form-group label="Пагинация">
                <rb-pagination :total-rows="500" :per-page="50" :page-num="1" :search="false"></rb-pagination>
            </b-form-group>
        </form>-->
        <form>
            <h3>RbPeriodInput</h3>
            <b-form-group label="Выбор периода">
                <rb-period-input :dt-start="rbPeriodInputDtStart1" placehoder="Выбрать ..."
                                 :dt-end="rbPeriodInputDtStart1"></rb-period-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbPhoneInput</h3>
            <b-form-group label="Ввод телефона" style="width: 200px;">
                <rb-phone-input v-model="rbPhoneInput1"></rb-phone-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbPhoneLink</h3>
            <b-form-group label="Ссылка на телефон" style="width: 200px;">
                <rb-phone-link phone="+77011000888"></rb-phone-link>
            </b-form-group>
        </form>
        <form>
            <h3>RbPriceInput</h3>
            <b-form-group label="Ввод цены" style="width: 200px;">
                <rb-price-input v-model="rbPriceInput1"></rb-price-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbSelectInput</h3>
            <b-form-group label="Выбор одного значения" style="width: 200px;">
                <rb-select-input :items="rbDropdownInput1Items" v-model="rbSelectInput1"></rb-select-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbSingleOptionInput</h3>
            <b-form-group label="Выбор одного значения" style="width: 200px;">
                <rb-single-option-input :items="rbDropdownInput1Items"
                                        v-model="rbSingleOptionInput1"></rb-single-option-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbTagMultiSelectInput</h3>
            <b-form-group label="Выбор тегов" style="width: 200px;">
                <rb-tag-multi-select-input :searchOptions="rbMultiSelectSearch1"
                                           v-model="rbTagMultiSelectInput1"></rb-tag-multi-select-input>
            </b-form-group>
        </form>
        <form>
            <h3>RbTypeaheadInput</h3>
            <b-form-group label="Typeahead инпут" style="width: 200px;">
                <rb-typeahead-input v-model="rbTypeaheadInput1"
                                    :searchOptions="rbMultiSelectSearch1"></rb-typeahead-input>
            </b-form-group>
        </form>
    </div>
</template>

<style>
    #app {
        padding: 20px;
    }

    #app h3 {
        margin-bottom: 20px;
    }

    #app form {
        margin-bottom: 40px;
    }
</style>
