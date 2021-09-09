<script>
    import typeOf from 'typeof';
    import Vue from 'vue';
    import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';

    Vue.use(BootstrapVue);
    Vue.use(IconsPlugin);

    export default Vue.extend({
        name: 'ServeDev',
        data() {
            return {
                rbBooleanButtonInput1: false,
                rbBooleanButtonInput2: false,
                rbBooleanSingleOptionInput1: null,
                rbBooleanSingleOptionInput2: false,
                rbColorDropdownInput1Items: [
                    {id: 1, color: 'red'},
                    {id: 2, color: 'blue'},
                    {id: 3, color: 'green'}
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
                rbTypeaheadInput2: 2,
                rbMultiLangInput: null,
                rbInputWithButton: null,
                rbMultiTypeaheadInput1: [1,2],
            }
        },
        methods: {
            async rbMultiSelectSearch1(text) {
                return this.rbDropdownInput1Items.filter(i => i && i.name && i.name.indexOf(text) >= 0);
            },
            async rbSearchOptionByValues(value) {
                if(typeOf(value) !== 'array') {
                    value = [value];
                }
                return this.rbDropdownInput1Items.filter(i => i && i.id && value.indexOf(i.id) != -1);
            }
        }
    });
</script>

<template>
    <div id="app">
        <b-form @submit.stop.prevent>
            <h5>Булевая инпут-кнопка - <span class="text-muted">RbBooleanButtonInput</span></h5>

            <div class="rb-component-row">
                <h6>Состояние <span class="text-muted">обычное</span></h6>
                <b-form-row>
                    <b-col lg="2" sm="12">
                        <b-form-group>
                            <rb-boolean-button-input label="Без чекбокса"
                                                     v-model="rbBooleanButtonInput1"></rb-boolean-button-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="2" sm="12">
                        <b-form-group>
                            <rb-boolean-button-input label="C бордером" bordered
                                                     v-model="rbBooleanButtonInput1"></rb-boolean-button-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="2" sm="12">
                        <b-form-group>
                            <rb-boolean-button-input label="С чекбоксом" bordered :showCheckbox="true"
                                                     v-model="rbBooleanButtonInput1"></rb-boolean-button-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="2" sm="12">
                        <b-form-group>
                            <rb-boolean-button-input label="Outline" outline :showCheckbox="true"
                                                     v-model="rbBooleanButtonInput1"></rb-boolean-button-input>
                        </b-form-group>
                    </b-col>
                </b-form-row>
            </div>

            <div class="rb-component-row">
                <h6>Состояние <span class="text-muted">disabled</span></h6>
                <b-form-row>
                    <b-col lg="2" sm="12">
                        <b-form-group>
                            <rb-boolean-button-input label="Без чекбокса" disabled
                                                     v-model="rbBooleanButtonInput1"></rb-boolean-button-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="2" sm="12">
                        <b-form-group>
                            <rb-boolean-button-input label="C бордером" bordered disabled
                                                     v-model="rbBooleanButtonInput1"></rb-boolean-button-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="2" sm="12">
                        <b-form-group>
                            <rb-boolean-button-input label="С чекбоксом" bordered disabled :showCheckbox="true"
                                                     v-model="rbBooleanButtonInput1"></rb-boolean-button-input>
                        </b-form-group>
                    </b-col>
                </b-form-row>
            </div>
        </b-form>

        <b-form @submit.stop.prevent>
            <h4>Булевый инпут типа "Да/Нет" - <span class="text-muted">RbBooleanSingleOptionInput</span></h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Без иконок">
                        <rb-boolean-single-option-input v-model="rbBooleanSingleOptionInput1" nullable>
                        </rb-boolean-single-option-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="С бордером">
                        <rb-boolean-single-option-input v-model="rbBooleanSingleOptionInput1" bordered>
                        </rb-boolean-single-option-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="С иконками">
                        <rb-boolean-single-option-input v-model="rbBooleanSingleOptionInput2"
                                                        show-icons></rb-boolean-single-option-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Невалидный">
                        <rb-boolean-single-option-input v-model="rbBooleanSingleOptionInput2" :state="false"
                                                        show-icons></rb-boolean-single-option-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Валидный">
                        <rb-boolean-single-option-input v-model="rbBooleanSingleOptionInput2" :state="true"
                                                        show-icons></rb-boolean-single-option-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </b-form>

        <b-form @submit.stop.prevent>
            <h4>Выбор цвета - <span class="text-muted">RbColorDropdownInput</span></h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Выбор цвета">
                        <rb-color-dropdown-input :items="rbColorDropdownInput1Items"></rb-color-dropdown-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="С бордером">
                        <rb-color-dropdown-input :items="rbColorDropdownInput1Items" bordered></rb-color-dropdown-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Невалидный">
                        <rb-color-dropdown-input :items="rbColorDropdownInput1Items"
                                                 bordered :state="false"></rb-color-dropdown-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Валидный">
                        <rb-color-dropdown-input :items="rbColorDropdownInput1Items"
                                                 bordered :state="true"></rb-color-dropdown-input>
                    </b-form-group>
                </b-col>
            </b-form-row>

        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Выбор даты - <span class="text-muted">RbDatePickerInput</span></h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Выбор даты" style="width: 200px;">
                        <rb-date-picker-input v-model="rbDatePickerInput1"></rb-date-picker-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Невалидный" style="width: 200px;">
                        <rb-date-picker-input v-model="rbDatePickerInput1" :state="false"></rb-date-picker-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Валидный" style="width: 200px;">
                        <rb-date-picker-input v-model="rbDatePickerInput1" :state="true">></rb-date-picker-input>
                    </b-form-group>
                </b-col>
            </b-form-row>

        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Выбор одного значения из списка - <span class="text-muted">RbDropdownInput</span></h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Выбор одного значения">
                        <rb-dropdown-input :items="rbDropdownInput1Items"
                                           v-model="rbDropdownInput1"></rb-dropdown-input>
                    </b-form-group>
                </b-col>
                <!--<b-col lg="2" sm="12">
                    <b-form-group label="Display: block">
                        <rb-dropdown-input :items="rbDropdownInput1Items"
                                           v-model="rbDropdownInput1" block></rb-dropdown-input>
                    </b-form-group>
                </b-col>-->
                <b-col lg="2" sm="12">
                    <b-form-group label="С бордером">
                        <rb-dropdown-input :items="rbDropdownInput1Items" v-model="rbDropdownInput1"
                                           bordered block></rb-dropdown-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Невалидный">
                        <rb-dropdown-input :items="rbDropdownInput1Items" v-model="rbDropdownInput1"
                                           :state="false"></rb-dropdown-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Валидный">
                        <rb-dropdown-input :items="rbDropdownInput1Items" v-model="rbDropdownInput1"
                                           :state="true"></rb-dropdown-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Выбор одного значения из списка - <span class="text-muted">RbDropdownLinkInput</span></h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Выбор одного значения">
                        <rb-dropdown-link-input :items="rbDropdownInput1Items" placeholder="Выбрать"
                                                v-model="rbDropdownLinkInput1"></rb-dropdown-link-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Невалидный">
                        <rb-dropdown-link-input :items="rbDropdownInput1Items" placeholder="Выбрать"
                                                v-model="rbDropdownLinkInput1" :state="false"></rb-dropdown-link-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Валидный">
                        <rb-dropdown-link-input :items="rbDropdownInput1Items" placeholder="Выбрать"
                                                v-model="rbDropdownLinkInput1" :state="true"></rb-dropdown-link-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Ссылка на почту - <span class="text-muted">RbEmailLink</span></h4>
            <b-form-group label="Автоматически пересылает на email">
                <rb-email-link email="rb-components@rebel.kz"></rb-email-link>
            </b-form-group>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Пустой стейт - <span class="text-muted">RbEmptyState</span></h4>
            <b-form-group label="На случай когда показать нечего">
                <div style="width: 400px; height: 200px;">
                    <rb-empty-state title="Ничего не найдено" icon="icon-none">
                        Попробуйте изменить параметры поиска
                    </rb-empty-state>
                </div>
            </b-form-group>
        </b-form>
        <b-form class="rb-icons">
            <h4>Иконки - <span class="text-muted">RbIcon</span></h4>
            <b-form-row>
                <b-form-group label="Стандартная">
                    <rb-icon icon="icon-none"></rb-icon>
                </b-form-group>
                <b-form-group label="font-size: 42px">
                    <rb-icon icon="icon-none" font-size="42px"></rb-icon>
                </b-form-group>
                <b-form-group label="variant = danger">
                    <rb-icon icon="icon-none" variant="danger"></rb-icon>
                </b-form-group>
            </b-form-row>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Выбор одного значения из списка - <span class="text-muted">RbListGroupInput</span></h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Выбор одного значения" style="width: 200px;">
                        <rb-list-group-input :items="rbDropdownInput1Items"
                                             v-model="rbListGroupInput1"></rb-list-group-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Невалидный" style="width: 200px;">
                        <rb-list-group-input :items="rbDropdownInput1Items" :state="false"
                                             v-model="rbListGroupInput1"></rb-list-group-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Валидный" style="width: 200px;">
                        <rb-list-group-input :items="rbDropdownInput1Items" :state="true"
                                             v-model="rbListGroupInput1"></rb-list-group-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Выбор нескольких значений - <span class="text-muted">RbMultiDropdownInput</span></h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Выбор нескольких значений">
                        <rb-multi-dropdown-input :items="rbDropdownInput1Items"
                                                 v-model="rbMultiDropdownInput1"></rb-multi-dropdown-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="С бордером">
                        <rb-multi-dropdown-input :items="rbDropdownInput1Items" bordered block
                                                 v-model="rbMultiDropdownInput1"></rb-multi-dropdown-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Невалидный">
                        <rb-multi-dropdown-input :items="rbDropdownInput1Items" :state="false"
                                                 v-model="rbMultiDropdownInput1"></rb-multi-dropdown-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Валидный">
                        <rb-multi-dropdown-input :items="rbDropdownInput1Items" :state="true"
                                                 v-model="rbMultiDropdownInput1"></rb-multi-dropdown-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Выбор несольких значений - <span class="text-muted">RbMultiOptionInput</span></h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Обычный">
                        <rb-multi-option-input :items="rbDropdownInput1Items"
                                               v-model="rbMultiOptionInput1"></rb-multi-option-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="С бордером">
                        <rb-multi-option-input :items="rbDropdownInput1Items" bordered
                                               v-model="rbMultiOptionInput1"></rb-multi-option-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Невалидный">
                        <rb-multi-option-input :items="rbDropdownInput1Items" :state="false"
                                               v-model="rbMultiOptionInput1"></rb-multi-option-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Валидный">
                        <rb-multi-option-input :items="rbDropdownInput1Items" :state="true"
                                               v-model="rbMultiOptionInput1"></rb-multi-option-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Инпут для ввода нескольких телефонов - <span class="text-muted">RbMultiPhoneInput</span></h4>
            <b-form-group label="Ввод нескольких телефонных номеров" style="width: 200px;">
                <rb-multi-phone-input :id="0"
                                      v-model="rbMultiPhoneInput1"></rb-multi-phone-input>
            </b-form-group>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Инпут с кнопкой внутри - <span class="text-muted">RbInputWithButton</span></h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Инпут с кнопкой внутри">
                        <rb-input-with-button v-model="rbInputWithButton"
                                              @buttonClick="rbInputWithButton = null"></rb-input-with-button>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Невалидный">
                        <rb-input-with-button v-model="rbInputWithButton" :state="false"
                                              @buttonClick="rbInputWithButton = null"></rb-input-with-button>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Валидный">
                        <rb-input-with-button v-model="rbInputWithButton" :state="true"
                                              @buttonClick="rbInputWithButton = null"></rb-input-with-button>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>RbMultiSelectInput</h4>
            <b-form-group label="Typeahead инпут с выбором нескольких значений" style="width: 200px;">
                <rb-multi-select-input v-model="rbMultiSelectInput1" :search-options="rbMultiSelectSearch1"
                ></rb-multi-select-input>
            </b-form-group>
        </b-form>
        <!--<b-form @submit.stop.prevent>
            <h4>RbPagination</h4>
            <b-form-group label="Пагинация">
                <rb-pagination :total-rows="500" :per-page="50" :page-num="1" :search="false"></rb-pagination>
            </b-form-group>
        </b-form>-->
        <b-form @submit.stop.prevent>
            <h4>Выбор периода - <span class="text-muted">RbPeriodInput</span></h4>
            <b-form @submit.stop.prevent>
                <b-form-row>
                    <b-col lg="2" sm="12">
                        <b-form-group label="Выбор периода">
                            <rb-period-input :dt-start="rbPeriodInputDtStart1" placehoder="Выбрать ..."
                                             :dt-end="rbPeriodInputDtStart1"></rb-period-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="2" sm="12">
                        <b-form-group label="С бордером">
                            <rb-period-input :dt-start="rbPeriodInputDtStart1" placehoder="Выбрать ..."
                                             bordered :dt-end="rbPeriodInputDtStart1"></rb-period-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="2" sm="12">
                        <b-form-group label="Невалидный">
                            <rb-period-input :dt-start="rbPeriodInputDtStart1" placehoder="Выбрать ..."
                                             :state="false" :dt-end="rbPeriodInputDtStart1"></rb-period-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="2" sm="12">
                        <b-form-group label="Валидный">
                            <rb-period-input :dt-start="rbPeriodInputDtStart1" placehoder="Выбрать ..."
                                             :state="true" :dt-end="rbPeriodInputDtStart1"></rb-period-input>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col lg="2" sm="12">
                        <b-form-group label="В виде ссылки">
                            <rb-period-input :dt-start="rbPeriodInputDtStart1" placehoder="Выбрать ..." link
                                             bordered :dt-end="rbPeriodInputDtStart1"></rb-period-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="2" sm="12">
                        <b-form-group label="Невалидный">
                            <rb-period-input :dt-start="rbPeriodInputDtStart1" placehoder="Выбрать ..." link
                                             :state="false" :dt-end="rbPeriodInputDtStart1"></rb-period-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="2" sm="12">
                        <b-form-group label="Валидный">
                            <rb-period-input :dt-start="rbPeriodInputDtStart1" placehoder="Выбрать ..." link
                                             :state="true" :dt-end="rbPeriodInputDtStart1"></rb-period-input>
                        </b-form-group>
                    </b-col>
                </b-form-row>
            </b-form>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Ввод телефона - <span class="text-muted">RbPhoneInput</span></h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Ввод телефона">
                        <rb-phone-input v-model="rbPhoneInput1"></rb-phone-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Невалидный">
                        <rb-phone-input v-model="rbPhoneInput1" :state="false"></rb-phone-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Валидный">
                        <rb-phone-input v-model="rbPhoneInput1" :state="true"></rb-phone-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Ссылка на телефон - <span class="text-muted">RbPhoneLink</span></h4>
            <b-form-group label="Ссылка на телефон">
                <rb-phone-link phone="+77011000888"></rb-phone-link>
            </b-form-group>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Ввод цены - <span class="text-muted">RbPriceInput</span></h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Ввод цены">
                        <rb-price-input v-model="rbPriceInput1"></rb-price-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Невалидный">
                        <rb-price-input v-model="rbPriceInput1" :state="false"></rb-price-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Валидный">
                        <rb-price-input v-model="rbPriceInput1" :state="true"></rb-price-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Обычный селект - <span class="text-muted">RbSelectInput</span></h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Выбор одного значения">
                        <rb-select-input :items="rbDropdownInput1Items" v-model="rbSelectInput1"></rb-select-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Невалидный">
                        <rb-select-input :items="rbDropdownInput1Items"
                                         v-model="rbSelectInput1" :state="false"></rb-select-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Валидный">
                        <rb-select-input :items="rbDropdownInput1Items"
                                         v-model="rbSelectInput1" :state="true"></rb-select-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Выбор одного значения кнопками - <span class="text-muted">RbSingleOptionInput</span></h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Выбор одного значения">
                        <rb-single-option-input :items="rbDropdownInput1Items"
                                                v-model="rbSingleOptionInput1"></rb-single-option-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="С бордером">
                        <rb-single-option-input :items="rbDropdownInput1Items" bordered
                                                v-model="rbSingleOptionInput1"></rb-single-option-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Невалидный">
                        <rb-single-option-input :items="rbDropdownInput1Items" :state="false"
                                                v-model="rbSingleOptionInput1"></rb-single-option-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Валидный">
                        <rb-single-option-input :items="rbDropdownInput1Items" :state="true"
                                                v-model="rbSingleOptionInput1"></rb-single-option-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>RbTagMultiSelectInput</h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Выбор тегов">
                        <rb-tag-multi-select-input :searchOptions="rbMultiSelectSearch1"
                                                   v-model="rbTagMultiSelectInput1"></rb-tag-multi-select-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Невалидный">
                        <rb-tag-multi-select-input :searchOptions="rbMultiSelectSearch1" :state="false"
                                                   v-model="rbTagMultiSelectInput1"></rb-tag-multi-select-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Валидный">
                        <rb-tag-multi-select-input :searchOptions="rbMultiSelectSearch1" :state="true"
                                                   v-model="rbTagMultiSelectInput1"></rb-tag-multi-select-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Выбор 1 значения с поиском - <span class="text-muted">RbTypeaheadInput</span></h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Typeahead инпут" style="width: 200px;">
                        <rb-typeahead-input v-model="rbTypeaheadInput1"
                                            :searchOptions="rbMultiSelectSearch1"></rb-typeahead-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Невалидный" style="width: 200px;">
                        <rb-typeahead-input v-model="rbTypeaheadInput2" :state="false"
                                            :searchOptionByValues="rbSearchOptionByValues"
                                            :searchOptions="rbMultiSelectSearch1"></rb-typeahead-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Валидный" style="width: 200px;">
                        <rb-typeahead-input v-model="rbTypeaheadInput2" :state="true"
                                            :searchOptionByValues="rbSearchOptionByValues"
                                            :searchOptions="rbMultiSelectSearch1"></rb-typeahead-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Выбор нескольких значений с поиском - <span class="text-muted">RbMultiTypeaheadInput</span></h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Typeahead инпут" style="width: 200px;">
                        <rb-multi-typeahead-input v-model="rbMultiTypeaheadInput1"
                                            :searchOptionByValues="rbSearchOptionByValues"
                                            :searchOptions="rbMultiSelectSearch1"></rb-multi-typeahead-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </b-form>
        <b-form @submit.stop.prevent>
            <h4>Инпут с выбором языка - <span class="text-muted">RbMultiLangInput</span></h4>
            <b-form-row>
                <b-col lg="2" sm="12">
                    <b-form-group label="Инпут с выбором языка">
                        <rb-multi-lang-input v-model="rbMultiLangInput"></rb-multi-lang-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Невалидный">
                        <rb-multi-lang-input v-model="rbMultiLangInput" :state="false"></rb-multi-lang-input>
                    </b-form-group>
                </b-col>
                <b-col lg="2" sm="12">
                    <b-form-group label="Валидный">
                        <rb-multi-lang-input v-model="rbMultiLangInput" :state="true"></rb-multi-lang-input>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </b-form>
    </div>
</template>

<style>
    #app {
        padding: 20px;
    }

    #app h4 {
        margin-bottom: 20px;
    }

    #app h5 {
        margin-bottom: 40px;
    }

    #app .rb-component-row {
        margin-bottom: 20px;
    }

    #app form {
        margin-bottom: 40px;
    }

    #app .rb-icons {
        margin-right: 10px;
    }

    #app .form-group {
        max-width: 200px;
    }
</style>
