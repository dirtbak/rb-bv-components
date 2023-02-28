<script>
import typeOf from 'typeof';
import Vue from 'vue';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export default Vue.extend({
  name: 'ServeDev',
  components: {},

  data() {
    return {
      propsEdit: false,
      rbBooleanButtonInput1: false,
      rbBooleanButtonInput2: false,
      rbBooleanSingleOptionInput1: null,
      rbBooleanSingleOptionInput2: null,
      rbColorDropdownInput1Items: [
        {id: 1, color: 'red', name: 'Красный'},
        {id: 2, color: 'blue', name: 'Синий'},
        {id: 3, color: 'green', name: 'Зеленый'}
      ],
      rbColorDropdownInput1: null,
      rbDatePickerInput1: new Date(),
      rbDropdownInput1Items: [
        {id: 1, name: 'Один'},
        {id: 2, name: 'Два'},
        {id: 3, name: 'Три'},
      ],
      rbDropdownInput1: null,
      rbDropdownInput2Items: [
        {id: 1, name: 'Один', icon: 'icon-none'},
        {id: 2, name: 'Два'}
      ],
      rbDropdownInput2: null,
      rbDropdownAsObjectInput1: null,
      rbDropdownLinkInput1: null,
      rbListGroupInput1: null,
      rbListGroupAsObjectInput1: null,
      rbMultiDropdownInput1: [],
      rbMultiDropdownAsObjectInput1: null,
      rbMultiOptionInput1: [],
      rbMultiPhoneInput1: [],
      rbMultiSelectInput1: [],
      rbPeriodInputDtStart1: '2022-03-01',
      rbPeriodInputDtEnd1: '2022-03-04',
      rbPhoneInput1: null,
      rbInternalPhoneInput1: null,
      rbPriceInput1: null,
      rbSelectInput1: null,
      rbSingleOptionInput1: null,
      rbTagMultiSelectInput1: [
        {id: 1, name: 'Один'}
      ],
      rbTypeaheadInput1: null,
      rbTypeaheadInput2: 2,
      rbMultiLangInput: {
        labelEn: '46546',
        labelKz: '44545',
        labelRu: '13213'
      },
      rbInputWithButton: null,
      rbMultiTypeaheadInput1: [1, 2, 3, 4],
      rbPagination: {
        currPage: 1,
        perPage: 5,
        totalRows: 100,
      },
      emails: [
        'test@gmail.com',
        'test@outluck.com',
        'test@yandex.ru',
        'test@mail.ru',
      ],
    }
  },
  methods: {
    async rbMultiSelectSearch1(text) {
      return this.rbDropdownInput1Items.filter(i => i && i.name && i.name.indexOf(text) >= 0);
    },
    async rbSearchOptionByValues(value) {
      if (typeOf(value) !== 'array') {
        value = [value];
      }
      return this.rbDropdownInput1Items.filter(i => i && i.id && value.indexOf(i.id) != -1);
    },
    async asyncMockPageReq() {
      return this.wait(100, {
        totalRows: 100
      })
    },

    wait(ms, value) {
      return new Promise(resolve => setTimeout(resolve, ms, value));
    },
    onShow(event) {
      console.info('show', event);
    },
    onClick(event) {
      alert('asd');
      console.info('click', event);
    },

    propsEdited() {
      this.propsEdit = !this.propsEdit
    }
  },
  created() {
    this.asyncMockPageReq().then(res => this.$set(this.rbPagination, 'totalRows', res.totalRows))

    let date = new Date();
    date.setDate(date.getDate() + 20);
    this.rbDatePickerInput1 = date;
  }
});
</script>

<template>
  <div id="app">
    <b-container>
      <b-form @submit.stop.prevent>
        <h5>Булевая инпут-кнопка - <span class="text-muted">RbBooleanButtonInput</span></h5>

        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-boolean-button-input label="Без чекбокса"
                                         v-model="rbBooleanButtonInput1"></rb-boolean-button-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-boolean-button-input bordered label="C бордером"
                                         v-model="rbBooleanButtonInput1"></rb-boolean-button-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-boolean-button-input :showCheckbox="true" bordered label="С чекбоксом"
                                         v-model="rbBooleanButtonInput1"></rb-boolean-button-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-boolean-button-input :showCheckbox="true" label="Outline" outline
                                         v-model="rbBooleanButtonInput1"></rb-boolean-button-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-boolean-button-input disabled label="Без чекбокса"
                                         v-model="rbBooleanButtonInput1"></rb-boolean-button-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-boolean-button-input bordered disabled label="C бордером"
                                         v-model="rbBooleanButtonInput1"></rb-boolean-button-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-boolean-button-input :showCheckbox="true" bordered disabled label="С чекбоксом"
                                         v-model="rbBooleanButtonInput1"></rb-boolean-button-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Булевый инпут типа "Да/Нет" - <span class="text-muted">RbBooleanSingleOptionInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Без иконок">
                <rb-boolean-single-option-input block nullable
                                                v-model="rbBooleanSingleOptionInput1">
                </rb-boolean-single-option-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-boolean-single-option-input block bordered v-model="rbBooleanSingleOptionInput1">
                </rb-boolean-single-option-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С иконками">
                <rb-boolean-single-option-input block show-icons
                                                v-model="rbBooleanSingleOptionInput2"></rb-boolean-single-option-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Без иконок">
                <rb-boolean-single-option-input block disabled nullable
                                                v-model="rbBooleanSingleOptionInput1">
                </rb-boolean-single-option-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-boolean-single-option-input block bordered disabled
                                                v-model="rbBooleanSingleOptionInput1">
                </rb-boolean-single-option-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С иконками">
                <rb-boolean-single-option-input block disabled show-icons
                                                v-model="rbBooleanSingleOptionInput2"></rb-boolean-single-option-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Без иконок">
                <rb-boolean-single-option-input :state="false" block nullable
                                                v-model="rbBooleanSingleOptionInput1">
                </rb-boolean-single-option-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-boolean-single-option-input :state="false" block bordered
                                                v-model="rbBooleanSingleOptionInput1">
                </rb-boolean-single-option-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С иконками">
                <rb-boolean-single-option-input :state="false" block
                                                show-icons
                                                v-model="rbBooleanSingleOptionInput2"></rb-boolean-single-option-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Без иконок">
                <rb-boolean-single-option-input :state="true" block nullable
                                                v-model="rbBooleanSingleOptionInput1">
                </rb-boolean-single-option-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-boolean-single-option-input :state="true" block bordered
                                                v-model="rbBooleanSingleOptionInput1">
                </rb-boolean-single-option-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С иконками">
                <rb-boolean-single-option-input :state="true" block
                                                show-icons
                                                v-model="rbBooleanSingleOptionInput2"></rb-boolean-single-option-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Выбор цвета - <span class="text-muted">RbColorDropdownInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Выбор цвета">
                <rb-color-dropdown-input :options="rbColorDropdownInput1Items"
                                         v-model="rbColorDropdownInput1"></rb-color-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С названием">
                <rb-color-dropdown-input :options="rbColorDropdownInput1Items" bordered
                                         placeholder="Выбрать"
                                         show-label
                                         v-model="rbColorDropdownInput1"></rb-color-dropdown-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Выбор цвета">
                <rb-color-dropdown-input :options="rbColorDropdownInput1Items" disabled
                                         v-model="rbColorDropdownInput1"></rb-color-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С названием">
                <rb-color-dropdown-input :options="rbColorDropdownInput1Items" bordered disabled
                                         show-label
                                         v-model="rbColorDropdownInput1"></rb-color-dropdown-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Выбор цвета">
                <rb-color-dropdown-input :options="rbColorDropdownInput1Items" :state="true"
                                         v-model="rbColorDropdownInput1"></rb-color-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С названием">
                <rb-color-dropdown-input :options="rbColorDropdownInput1Items" :state="true" bordered
                                         show-label
                                         v-model="rbColorDropdownInput1"></rb-color-dropdown-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Выбор цвета">
                <rb-color-dropdown-input :options="rbColorDropdownInput1Items" :state="false"
                                         v-model="rbColorDropdownInput1"></rb-color-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С названием">
                <rb-color-dropdown-input :options="rbColorDropdownInput1Items" :state="false" bordered
                                         show-label
                                         v-model="rbColorDropdownInput1"></rb-color-dropdown-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>

      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Выбор даты - <span class="text-muted">RbDatePickerInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group style="width: 200px;">
                <rb-date-picker-input v-model="rbDatePickerInput1"></rb-date-picker-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group style="width: 200px;">
                <rb-date-picker-input disabled v-model="rbDatePickerInput1"></rb-date-picker-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group style="width: 200px;">
                <rb-date-picker-input :state="false"
                                      v-model="rbDatePickerInput1"></rb-date-picker-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group style="width: 200px;">
                <rb-date-picker-input :state="true" v-model="rbDatePickerInput1"></rb-date-picker-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Выбор периода - <span class="text-muted">RbPeriodInput</span></h5>
        <b-form @submit.stop.prevent>
          <div class="rb-component-row">
            <h6>Состояние <span class="text-muted">обычное</span></h6>
            <b-form-row>
              <b-col lg="3" sm="12">
                <b-form-group label="Обычный">
                  <rb-period-input :dt-end.sync="rbPeriodInputDtEnd1"
                                   :dt-start.sync="rbPeriodInputDtStart1"
                                   placehoder="Выбрать ..." show-cancel-item></rb-period-input>
                </b-form-group>
              </b-col>
              <b-col lg="3" sm="12">
                <b-form-group label="С бордером">
                  <rb-period-input :dt-end.sync="rbPeriodInputDtEnd1"
                                   :dt-start.sycn="rbPeriodInputDtStart1"
                                   bordered placehoder="Выбрать ..."></rb-period-input>
                </b-form-group>
              </b-col>
              <b-col lg="3" sm="12">
                <b-form-group label="В виде ссылки">
                  <rb-period-input :dt-end.sync="rbPeriodInputDtEnd1"
                                   :dt-start.sync="rbPeriodInputDtStart1"
                                   bordered
                                   link placehoder="Выбрать ..."></rb-period-input>
                </b-form-group>
              </b-col>
            </b-form-row>
          </div>
          <div class="rb-component-row">
            <h6>Состояние <span class="text-muted">disabled</span></h6>
            <b-form-row>
              <b-col lg="3" sm="12">
                <b-form-group label="Обычный">
                  <rb-period-input :dt-end.sync="rbPeriodInputDtEnd1"
                                   :dt-start.sync="rbPeriodInputDtStart1"
                                   disabled
                                   placehoder="Выбрать ..."></rb-period-input>
                </b-form-group>
              </b-col>
              <b-col lg="3" sm="12">
                <b-form-group label="С бордером">
                  <rb-period-input :dt-end.sync="rbPeriodInputDtEnd1"
                                   :dt-start.sync="rbPeriodInputDtStart1"
                                   bordered
                                   disabled placehoder="Выбрать ..."></rb-period-input>
                </b-form-group>
              </b-col>
              <b-col lg="3" sm="12">
                <b-form-group label="В виде ссылки">
                  <rb-period-input :dt-end.sync="rbPeriodInputDtEnd1"
                                   :dt-start.sync="rbPeriodInputDtStart1"
                                   bordered
                                   disabled link
                                   placehoder="Выбрать ..."></rb-period-input>
                </b-form-group>
              </b-col>
            </b-form-row>
          </div>
          <div class="rb-component-row">
            <h6>Состояние <span class="text-muted">невалидное</span></h6>
            <b-form-row>
              <b-col lg="3" sm="12">
                <b-form-group label="Обычный">
                  <rb-period-input :dt-end.sync="rbPeriodInputDtEnd1"
                                   :dt-start.sync="rbPeriodInputDtStart1"
                                   :state="false" placehoder="Выбрать ..."></rb-period-input>
                </b-form-group>
              </b-col>
              <b-col lg="3" sm="12">
                <b-form-group label="С бордером">
                  <rb-period-input :dt-end.sync="rbPeriodInputDtEnd1"
                                   :dt-start.sync="rbPeriodInputDtStart1"
                                   :state="false" bordered
                                   placehoder="Выбрать ..."></rb-period-input>
                </b-form-group>
              </b-col>
              <b-col lg="3" sm="12">
                <b-form-group label="В виде ссылки">
                  <rb-period-input :dt-end.sync="rbPeriodInputDtEnd1"
                                   :dt-start.sync="rbPeriodInputDtStart1"
                                   :state="false"
                                   bordered link
                                   placehoder="Выбрать ..."></rb-period-input>
                </b-form-group>
              </b-col>
            </b-form-row>
          </div>
          <div class="rb-component-row">
            <h6>Состояние <span class="text-muted">валидное</span></h6>
            <b-form-row>
              <b-col lg="3" sm="12">
                <b-form-group label="Обычный">
                  <rb-period-input :dt-end.sync="rbPeriodInputDtEnd1"
                                   :dt-start.sync="rbPeriodInputDtStart1"
                                   :state="true" placehoder="Выбрать ..."></rb-period-input>
                </b-form-group>
              </b-col>
              <b-col lg="3" sm="12">
                <b-form-group label="С бордером">
                  <rb-period-input :dt-end.sync="rbPeriodInputDtEnd1"
                                   :dt-start.sync="rbPeriodInputDtStart1"
                                   :state="true" bordered
                                   placehoder="Выбрать ..."></rb-period-input>
                </b-form-group>
              </b-col>
              <b-col lg="3" sm="12">
                <b-form-group label="В виде ссылки">
                  <rb-period-input :dt-end.sync="rbPeriodInputDtEnd1"
                                   :dt-start.sync="rbPeriodInputDtStart1"
                                   :state="true"
                                   bordered link
                                   placehoder="Выбрать ..."></rb-period-input>
                </b-form-group>
              </b-col>
            </b-form-row>
          </div>
        </b-form>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Выбор одного значения из списка - <span class="text-muted">RbDropdownInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-dropdown-input disable-tooltip
                                   show-cancel-item
                                   :items="rbDropdownInput1Items" block @show="onShow"
                                   v-model="rbDropdownInput1"></rb-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="C бордером">
                <rb-dropdown-input :items="rbDropdownInput1Items" block bordered
                                   v-model="rbDropdownInput1"></rb-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="В виде ссылки">
                <rb-dropdown-input :items="rbDropdownInput1Items" link
                                   v-model="rbDropdownInput1"></rb-dropdown-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-dropdown-input :items="rbDropdownInput1Items" block disabled
                                   v-model="rbDropdownInput1"></rb-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="C бордером">
                <rb-dropdown-input :items="rbDropdownInput1Items" block bordered disabled
                                   v-model="rbDropdownInput1"></rb-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="В виде ссылки">
                <rb-dropdown-input :items="rbDropdownInput1Items" disabled link
                                   v-model="rbDropdownInput1"></rb-dropdown-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-dropdown-input :items="rbDropdownInput1Items" :state="false" block
                                   v-model="rbDropdownInput1"></rb-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-dropdown-input :items="rbDropdownInput1Items" :state="false" block bordered
                                   v-model="rbDropdownInput1"></rb-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="В виде ссылки">
                <rb-dropdown-input :items="rbDropdownInput1Items" :state="false" link
                                   v-model="rbDropdownInput1"></rb-dropdown-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-dropdown-input :items="rbDropdownInput1Items" :state="true" block
                                   v-model="rbDropdownInput1"></rb-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-dropdown-input :items="rbDropdownInput1Items" :state="true" block bordered
                                   v-model="rbDropdownInput1"></rb-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="В виде ссылки">
                <rb-dropdown-input :items="rbDropdownInput1Items" :state="true" link
                                   v-model="rbDropdownInput1"></rb-dropdown-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Работа с объектами - <span class="text-muted">RbDropdownInput</span></h5>
        <h6>Состояние <span class="text-muted">обычное</span></h6>
        <b-form-row>
          <b-col lg="3" sm="12">
            <b-form-group label="Обычный">
              <rb-dropdown-input disable-tooltip
                                 :items="rbDropdownInput1Items" block
                                 v-model="rbDropdownAsObjectInput1"
                                 value-as-object></rb-dropdown-input>
            </b-form-group>
          </b-col>
          <b-col lg="3" sm="12">
            <b-form-group label="С бордером">
              <rb-dropdown-input :items="rbDropdownInput1Items" :state="false" block bordered
                                 v-model="rbDropdownAsObjectInput1" value-as-object></rb-dropdown-input>
            </b-form-group>
          </b-col>
        </b-form-row>
      </b-form>

      <b-form @submit.stop.prevent>
        <h5>Выбор одного значения из списка + стандартное действие по кнопке - <span
            class="text-muted">RbDropdownInput</span>
        </h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-dropdown-input :split="true" :split-text="'Split text'"
                                   :items="rbDropdownInput2Items" block @show="onShow" disable-tooltip
                                   v-model="rbDropdownInput2"
                                   @click="onClick"></rb-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="C бордером">
                <rb-dropdown-input :split="true" :split-text="'Split text'"
                                   :items="rbDropdownInput2Items" block bordered disable-tooltip
                                   v-model="rbDropdownInput2"
                                   @click="onClick"></rb-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="C бордером">
                <rb-dropdown-input
                    disable-tooltip
                    :split="true"
                    :split-text="'Split text'"
                    :items="rbDropdownInput2Items"
                    :btn-icon="'icon-none'"
                    :color-btn-icon="'#ffffff'"
                    block
                    variant="primary"
                    v-model="rbDropdownInput2"
                    @click="onClick"/>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-dropdown-input :split="true" :split-text="'Split text'"
                                   :items="rbDropdownInput2Items" block disabled
                                   v-model="rbDropdownInput2"
                                   @click="onClick"></rb-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="C бордером">
                <rb-dropdown-input :split="true" :split-text="'Split text'"
                                   :items="rbDropdownInput2Items" block bordered disabled
                                   v-model="rbDropdownInput2"
                                   @click="onClick"></rb-dropdown-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-dropdown-input :split="true" :split-text="'Split text'"
                                   :items="rbDropdownInput2Items" :state="false" block
                                   v-model="rbDropdownInput2"
                                   @click="onClick"></rb-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-dropdown-input :split="true" :split-text="'Split text'"
                                   :items="rbDropdownInput2Items" :state="false" block bordered
                                   v-model="rbDropdownInput2"
                                   @click="onClick"></rb-dropdown-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-dropdown-input :split="true" :split-text="'Split text'"
                                   :items="rbDropdownInput2Items" :state="true" block
                                   v-model="rbDropdownInput2"
                                   @click="onClick"></rb-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-dropdown-input :split="true" :split-text="'Split text'"
                                   :items="rbDropdownInput2Items" :state="true" block bordered
                                   v-model="rbDropdownInput2"
                                   @click="onClick"></rb-dropdown-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Работа с объектами - <span class="text-muted">RbDropdownInput</span></h5>
        <h6>Состояние <span class="text-muted">обычное</span></h6>
        <b-form-row>
          <b-col lg="3" sm="12">
            <b-form-group label="Обычный">
              <rb-dropdown-input :split="true" :split-text="'Split text'" :items="rbDropdownInput2Items"
                                 block split
                                 v-model="rbDropdownAsObjectInput1"
                                 @click="onClick"
                                 value-as-object></rb-dropdown-input>
            </b-form-group>
          </b-col>
          <b-col lg="3" sm="12">
            <b-form-group label="С бордером">
              <rb-dropdown-input :split="true" :split-text="'Split text'" :items="rbDropdownInput2Items"
                                 :state="false" block bordered
                                 v-model="rbDropdownAsObjectInput1"
                                 @click="onClick" value-as-object></rb-dropdown-input>
            </b-form-group>
          </b-col>
        </b-form-row>
      </b-form>

      <b-form @submit.stop.prevent>
        <h5>Выбор нескольких значений - <span class="text-muted">RbMultiDropdownInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-multi-dropdown-input :items="rbDropdownInput1Items" block
                                         v-model="rbMultiDropdownInput1"></rb-multi-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-multi-dropdown-input :items="rbDropdownInput1Items" block bordered
                                         v-model="rbMultiDropdownInput1"></rb-multi-dropdown-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-multi-dropdown-input :items="rbDropdownInput1Items" block disabled
                                         v-model="rbMultiDropdownInput1"></rb-multi-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-multi-dropdown-input :items="rbDropdownInput1Items" block bordered disabled
                                         v-model="rbMultiDropdownInput1"></rb-multi-dropdown-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-multi-dropdown-input :items="rbDropdownInput1Items" :state="false" block
                                         v-model="rbMultiDropdownInput1"></rb-multi-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-multi-dropdown-input :items="rbDropdownInput1Items" :state="false" block bordered
                                         v-model="rbMultiDropdownInput1"></rb-multi-dropdown-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-multi-dropdown-input :items="rbDropdownInput1Items" :state="true" block
                                         v-model="rbMultiDropdownInput1"></rb-multi-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-multi-dropdown-input :items="rbDropdownInput1Items" :state="true" block bordered
                                         v-model="rbMultiDropdownInput1"></rb-multi-dropdown-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>

      <b-form @submit.stop.prevent>
        <h5>Выбор нескольких значений - <span class="text-muted">RbMultiDropdownInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-multi-dropdown-input :items="rbDropdownInput1Items" block
                                         v-model="rbMultiDropdownAsObjectInput1"
                                         value-as-object></rb-multi-dropdown-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-multi-dropdown-input :items="rbDropdownInput1Items" block bordered
                                         v-model="rbMultiDropdownAsObjectInput1"
                                         value-as-object></rb-multi-dropdown-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>

      <b-form @submit.stop.prevent>
        <h5>Обычный селект - <span class="text-muted">RbSelectInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-select-input :items="rbDropdownInput1Items"
                                 v-model="rbSelectInput1"></rb-select-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-select-input :items="rbDropdownInput1Items" disabled
                                 v-model="rbSelectInput1"></rb-select-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-select-input :items="rbDropdownInput1Items" :state="false"
                                 v-model="rbSelectInput1"></rb-select-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-select-input :items="rbDropdownInput1Items" :state="true"
                                 v-model="rbSelectInput1"></rb-select-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Выбор одного значения кнопками - <span class="text-muted">RbSingleOptionInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-single-option-input :items="rbDropdownInput1Items" block
                                        v-model="rbSingleOptionInput1"></rb-single-option-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-single-option-input :items="rbDropdownInput1Items" bordered block
                                        v-model="rbSingleOptionInput1"></rb-single-option-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-single-option-input :items="rbDropdownInput1Items" disabled block
                                        v-model="rbSingleOptionInput1"></rb-single-option-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-single-option-input :items="rbDropdownInput1Items" bordered disabled block
                                        v-model="rbSingleOptionInput1"></rb-single-option-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-single-option-input :items="rbDropdownInput1Items" :state="false" block
                                        v-model="rbSingleOptionInput1"></rb-single-option-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-single-option-input :items="rbDropdownInput1Items" :state="false" bordered block
                                        v-model="rbSingleOptionInput1"></rb-single-option-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-single-option-input :items="rbDropdownInput1Items" :state="true"  block
                                        v-model="rbSingleOptionInput1"></rb-single-option-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-single-option-input :items="rbDropdownInput1Items" :state="true" bordered  block
                                        v-model="rbSingleOptionInput1"></rb-single-option-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Выбор несольких значений кнопками - <span class="text-muted">RbMultiOptionInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-multi-option-input :items="rbDropdownInput1Items"
                                       v-model="rbMultiOptionInput1"></rb-multi-option-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-multi-option-input :items="rbDropdownInput1Items" bordered
                                       v-model="rbMultiOptionInput1"></rb-multi-option-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-multi-option-input :items="rbDropdownInput1Items" disabled
                                       v-model="rbMultiOptionInput1"></rb-multi-option-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-multi-option-input :items="rbDropdownInput1Items" bordered disabled
                                       v-model="rbMultiOptionInput1"></rb-multi-option-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-multi-option-input :items="rbDropdownInput1Items" :state="false"
                                       v-model="rbMultiOptionInput1"></rb-multi-option-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-multi-option-input :items="rbDropdownInput1Items" :state="false" bordered
                                       v-model="rbMultiOptionInput1"></rb-multi-option-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Обычный">
                <rb-multi-option-input :items="rbDropdownInput1Items" :state="true"
                                       v-model="rbMultiOptionInput1"></rb-multi-option-input>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group label="С бордером">
                <rb-multi-option-input :items="rbDropdownInput1Items" :state="true" bordered
                                       v-model="rbMultiOptionInput1"></rb-multi-option-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Выбор одного значения из списка - <span class="text-muted">RbListGroupInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Выбор одного значения" style="width: 200px;">
                <rb-list-group-input :options="rbDropdownInput1Items"
                                     v-model="rbListGroupInput1"></rb-list-group-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Выбор одного значения" style="width: 200px;">
                <rb-list-group-input :options="rbDropdownInput1Items" disabled
                                     v-model="rbListGroupInput1"></rb-list-group-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Выбор одного значения" style="width: 200px;">
                <rb-list-group-input :options="rbDropdownInput1Items" :state="false"
                                     v-model="rbListGroupInput1"></rb-list-group-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Выбор одного значения" style="width: 200px;">
                <rb-list-group-input :options="rbDropdownInput1Items" :state="true"
                                     v-model="rbListGroupInput1"></rb-list-group-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>

      <b-form>
        <h5>Работа с объектами - <span class="text-muted">RbListGroupInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Выбор одного значения" style="width: 200px;">
                <rb-list-group-input :options="rbDropdownInput1Items"
                                     v-model="rbListGroupAsObjectInput1"
                                     value-as-object></rb-list-group-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Выбор одного значения" style="width: 200px;">
                <rb-list-group-input :options="rbDropdownInput1Items" :state="true"
                                     v-model="rbListGroupAsObjectInput1"
                                     value-as-object></rb-list-group-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>

      <b-form @submit.stop.prevent>
        <h5>Выбор 1 значения с поиском - <span class="text-muted">RbTypeaheadInput</span></h5>
        <div class="rb-component-row">
          <h6>Тест без дефолтного выбора</h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group style="width: 200px;">
                <rb-typeahead-input
                    :searchOptions="rbMultiSelectSearch1"
                    :notDefault="true"
                    requared
                    v-model="rbTypeaheadInput1">
                  <template v-slot:append="{val}">
                    <b-button variant="primary">
                      {{ JSON.stringify(val) }}
                    </b-button>
                  </template>
                  <template v-slot="{val}">{{ val.name }}</template>
                </rb-typeahead-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group style="width: 200px;">
                <rb-typeahead-input :searchOptions="rbMultiSelectSearch1"
                                    v-model="rbTypeaheadInput1"></rb-typeahead-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group style="width: 200px;">
                <rb-typeahead-input :searchOptions="rbMultiSelectSearch1" disabled
                                    v-model="rbTypeaheadInput1"></rb-typeahead-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group style="width: 200px;">
                <rb-typeahead-input :searchOptionByValues="rbSearchOptionByValues"
                                    :searchOptions="rbMultiSelectSearch1"
                                    :notDefault="true"

                                    :state="false"
                                    v-model="rbTypeaheadInput2"></rb-typeahead-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group style="width: 200px;">
                <rb-typeahead-input :searchOptionByValues="rbSearchOptionByValues"
                                    :searchOptions="rbMultiSelectSearch1"
                                    :state="true"
                                    v-model="rbTypeaheadInput2"></rb-typeahead-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Выбор нескольких значений с поиском - <span class="text-muted">RbMultiTypeaheadInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Typeahead инпут" style="width: 200px;">
                <rb-multi-typeahead-input :searchOptionByValues="rbSearchOptionByValues"
                                          :searchOptions="rbMultiSelectSearch1"
                                          :notDefault="true"
                                          show-options
                                          v-model="rbMultiTypeaheadInput1"></rb-multi-typeahead-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Typeahead инпут" style="width: 200px;">
                <rb-multi-typeahead-input :searchOptionByValues="rbSearchOptionByValues"
                                          :searchOptions="rbMultiSelectSearch1"
                                          disabled
                                          v-model="rbMultiTypeaheadInput1"></rb-multi-typeahead-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Typeahead инпут" style="width: 200px;">
                <rb-multi-typeahead-input :searchOptionByValues="rbSearchOptionByValues"
                                          :searchOptions="rbMultiSelectSearch1"
                                          :state="true"
                                          v-model="rbMultiTypeaheadInput1"></rb-multi-typeahead-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Typeahead инпут" style="width: 200px;">
                <rb-multi-typeahead-input :searchOptionByValues="rbSearchOptionByValues"
                                          :searchOptions="rbMultiSelectSearch1"
                                          :state="false"
                                          v-model="rbMultiTypeaheadInput1"></rb-multi-typeahead-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Выбор нескольких тегов - <span class="text-muted">RbTagMultiSelectInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-tag-multi-select-input :searchOptions="rbMultiSelectSearch1"
                                           maxTags="1"
                                           v-model="rbTagMultiSelectInput1"></rb-tag-multi-select-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-tag-multi-select-input :searchOptions="rbMultiSelectSearch1" disabled
                                           v-model="rbTagMultiSelectInput1"></rb-tag-multi-select-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-tag-multi-select-input :searchOptions="rbMultiSelectSearch1" :state="false"
                                           v-model="rbTagMultiSelectInput1"></rb-tag-multi-select-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-tag-multi-select-input :searchOptions="rbMultiSelectSearch1" :state="true"
                                           v-model="rbTagMultiSelectInput1"></rb-tag-multi-select-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Выбор нескольких тегов - <span class="text-muted">RbTagInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное + maxTag</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-tag-input :searchOptions="rbMultiSelectSearch1"
                              v-model="rbTagMultiSelectInput1"></rb-tag-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-tag-input :searchOptions="rbMultiSelectSearch1"
                              v-model="rbTagMultiSelectInput1"></rb-tag-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">превью</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <div @click="propsEdited">btn edit</div>
              <b-form-group>
                <rb-tag-input :searchOptions="rbMultiSelectSearch1"
                              :stateFocused="propsEdit"
                              v-model="rbTagMultiSelectInput1"></rb-tag-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-tag-input :searchOptions="rbMultiSelectSearch1"
                              disabled
                              v-model="rbTagMultiSelectInput1"></rb-tag-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-tag-input :searchOptions="rbMultiSelectSearch1"
                              :state="false"
                              v-model="rbTagMultiSelectInput1"></rb-tag-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-tag-input :searchOptions="rbMultiSelectSearch1"
                              :state="true"
                              v-model="rbTagMultiSelectInput1"></rb-tag-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5><span class="text-muted">RbEmailInput</span></h5>

        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-email-input/>
              </b-form-group>
            </b-col>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-email-input :value="emails"/>
              </b-form-group>
            </b-col>
            <b-col lg="9" sm="12">
              <rb-email-input :value="emails"/>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Ввод цены - <span class="text-muted">RbPriceInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-price-input v-model="rbPriceInput1"></rb-price-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-price-input disabled v-model="rbPriceInput1"></rb-price-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-price-input :state="false" v-model="rbPriceInput1"></rb-price-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-price-input :state="true" v-model="rbPriceInput1"></rb-price-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Ввод телефона - <span class="text-muted">RbPhoneInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-phone-input v-model="rbPhoneInput1"></rb-phone-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-phone-input disabled v-model="rbPhoneInput1"></rb-phone-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-phone-input :state="false" v-model="rbPhoneInput1"></rb-phone-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-phone-input :state="true" v-model="rbPhoneInput1"></rb-phone-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Ввод внутренного телефона - <span class="text-muted">RbInternalPhoneInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-internal-phone-input v-model="rbInternalPhoneInput1"></rb-internal-phone-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-internal-phone-input disabled
                                         v-model="rbInternalPhoneInput1"></rb-internal-phone-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-internal-phone-input :state="false"
                                         v-model="rbInternalPhoneInput1"></rb-internal-phone-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-internal-phone-inputt :state="true"
                                          v-model="rbInternalPhoneInput1"></rb-internal-phone-inputt>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Инпут с кнопкой внутри - <span class="text-muted">RbInputWithButton</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-input-with-button @buttonClick="rbInputWithButton = null"
                                      v-model="rbInputWithButton"></rb-input-with-button>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-input-with-button @buttonClick="rbInputWithButton = null" disabled
                                      v-model="rbInputWithButton"></rb-input-with-button>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-input-with-button :state="false" @buttonClick="rbInputWithButton = null"
                                      v-model="rbInputWithButton"></rb-input-with-button>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group>
                <rb-input-with-button :state="true" @buttonClick="rbInputWithButton = null"
                                      v-model="rbInputWithButton"></rb-input-with-button>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Инпут с выбором языка - <span class="text-muted">RbMultiLangInput</span></h5>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">обычное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Инпут с выбором языка">
                <rb-multi-lang-input v-model="rbMultiLangInput" maxLength="5"></rb-multi-lang-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">disabled</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Инпут с выбором языка">
                <rb-multi-lang-input disabled v-model="rbMultiLangInput"></rb-multi-lang-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">невалидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Инпут с выбором языка">
                <rb-multi-lang-input :state="false" v-model="rbMultiLangInput"></rb-multi-lang-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
        <div class="rb-component-row">
          <h6>Состояние <span class="text-muted">валидное</span></h6>
          <b-form-row>
            <b-col lg="3" sm="12">
              <b-form-group label="Инпут с выбором языка">
                <rb-multi-lang-input :state="true" v-model="rbMultiLangInput"></rb-multi-lang-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Инпут для ввода нескольких телефонов - <span class="text-muted">RbMultiPhoneInput</span></h5>
        <b-form-group label="Ввод нескольких телефонных номеров" style="width: 200px;">
          <rb-multi-phone-input :id="0"
                                v-model="rbMultiPhoneInput1"></rb-multi-phone-input>
        </b-form-group>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Ссылка на почту - <span class="text-muted">RbEmailLink</span></h5>
        <b-form-group label="Автоматически пересылает на email">
          <rb-email-link email="rb-components@rebel.kz"></rb-email-link>
        </b-form-group>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Ссылка на телефон - <span class="text-muted">RbPhoneLink</span></h5>
        <b-form-group label="Ссылка на телефон">
          <rb-phone-link phone="+77011000888"></rb-phone-link>
        </b-form-group>
      </b-form>
      <b-form class="rb-icons">
        <h5>Иконки - <span class="text-muted">RbIcon</span></h5>
        <b-form-row>
          <b-form-group label="Стандартная">
            <rb-icon icon="icon-none"></rb-icon>
          </b-form-group>
          <b-form-group label="font-size: 42px">
            <rb-icon font-size="42px" icon="icon-none"></rb-icon>
          </b-form-group>
          <b-form-group label="variant = danger">
            <rb-icon icon="icon-none" variant="danger"></rb-icon>
          </b-form-group>
        </b-form-row>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Пустой стейт - <span class="text-muted">RbEmptyState</span></h5>
        <b-form-group label="На случай когда показать нечего">
          <div style="width: 400px; height: 200px;">
            <rb-empty-state button-text="awdawdawd" icon="icon-none" title="Ничего не найдено">
              Попробуйте изменить параметры поиска
            </rb-empty-state>
          </div>
        </b-form-group>
      </b-form>
      <b-form @submit.stop.prevent>
        <h5>Пагинация - <span class="text-muted">RbPagination</span></h5>
        <b-form-group label="Пагинация">
          <rb-pagination v-model="rbPagination.currPage"
                         :per-page="rbPagination.perPage"
                         :total-rows="rbPagination.totalRows"/>
        </b-form-group>
      </b-form>
    </b-container>
  </div>
</template>

<style>
#app {
  padding: 20px;
}

#app h6 {
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
