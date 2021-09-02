<script>
import Vue from 'vue';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import RbBooleanButtonInput from "../src/components/RbBooleanButtonInput";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Uncomment import and local "components" registration if library is not registered globally.
// import { RbBvComponentsSample } from '@/entry.esm';
// import { RbBooleanButtonInput } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  components: {RbBooleanButtonInput},
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
