<template>
  <div class="rb-date-picker-input" :class="cls">
    <b-input-group>
      <b-form-input
        v-model="inputValue"
        type="text"
        v-mask="mask"
        :resolve-value="inputValue"
        autocomplete="off"
        @input="inputChange"
        @blur="inputBlur"
        :size="size"
        :placeholder="placeholder"
        :disabled="disabled"
        :state="state"
        v-click-outside="setValue"
      />
      <b-input-group-append>
        <b-form-datepicker
          ref="picker"
          v-model="datePickerValue"
          right
          :date-disabled-fn="dateDisabled"
          button-only
          :dropup="dropup"
          locale="ru-RU"
          label-help=""
          :reset-button="!!datePickerValue"
          :reset-value="null"
          @shown="shown"
          label-reset-button="Очистить"
          :start-weekday="startWeekday"
          :size="size"
          :button-variant="variant"
          :show-decade-nav="false"
          :hide-header="true"
          :disabled="disabled"
          :state="state"
          :min="setMinDate()"
          :max="maxDate"
          @context="onContext"
          @input="datePickerChange"
        />
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
// import { dateFormat } from 'vue-filter-date-format';
import { mask } from 'vue-the-mask';
import { UtDate } from '../utils/UtDate';
import dayjs from 'dayjs'

export default {
  name: 'RbDatePickerInput',
  directives: { mask },
  props: {
    value: { String, Date },
    placeholder: { type: String, default: 'ДД.ММ.ГГГГ' },
    mask: { type: String, default: '##.##.####' },
    state: { type: Boolean, default: null },
    dropup: Boolean,
    disabled: Boolean,
    size: { type: String, default: null },
    variant: { type: String, default: 'light-outline' },
    minDate: { type: String, default: '' },
    maxDate: { type: String, default: '' },
    minCurrentDate: { type: Boolean, default: false },
    startWeekday: {
      type: [Number, String],
      default: 1,
    },
    disabledDates: {type: Array, default: () => []}
  },
  data: function () {
    return {
      inputValue: null,
      datePickerValue: null,
      inputPattern: 'DD.MM.YYYY',
      pickerPattern: 'YYYY-MM-DD',
      lastNormalDateFormat: null
    };
  },
  computed: {
    cls() {
      return {
        'is-invalid': this.state === false,
        'is-valid': this.state === true,
      };
    },
  },
  watch: {
    value: {
      handler() {
        this.onPropValueChange();
      },
      immediate: true,
    },

    datePickerValue() {
      this.$emit('change');
    },
  },
  methods: {
    datePickerChange(v) {
      if (!v) {
        this.lastNormalDateFormat = null;
        return this.$emit('input', null);
      }
      let dt = this.strToDate(v);
      this.inputValue = UtDate.formatWithUserTimezone(dt, this.inputPattern);
      this.lastNormalDateFormat = dt
      this.$emit('input', UtDate.toIsoString(dt));
    },
    inputChange(v) {
      if (!v || v === '') {
        this.lastNormalDateFormat = null;
        this.$emit('input', null);
      } else {
        const date = this.strToDate(v);
        if (date) {
          if (v.length === this.mask.length && date) {
            this.datePickerValue = UtDate.formatWithUserTimezone(date, this.pickerPattern);
            this.lastNormalDateFormat = date;
            this.$emit('input', UtDate.toIsoString(date));
          }
        } else {
          this.$emit('input', null);
        }
      }
    },
    inputBlur() {
      if (this.lastNormalDateFormat) {
        this.$emit('input', UtDate.toIsoString(this.lastNormalDateFormat));
      } else {
        this.$emit('input', null);
      }

    },
    onPropValueChange() {
      if (this.value) {
        const dt = new Date(this.value);
        if (!isNaN(dt)) {
          this.inputValue = UtDate.formatWithUserTimezone(dt, this.inputPattern);
          this.datePickerValue = UtDate.formatWithUserTimezone(dt, this.pickerPattern);
          this.lastNormalDateFormat = dt;
        } else {
          this.inputValue = null;
          this.datePickerValue = null;
          this.lastNormalDateFormat = null;
        }
      } else {
        this.inputValue = null;
        this.datePickerValue = null;
        this.lastNormalDateFormat = null;
      }
    },
    strToDate(str) {
      if (/[0-9]{2}\.[0-9]{2}\.[0-9]{4}/.test(str)) {
        const parts = str.split('.');
        let dd = parts[0];
        let mm = parts[1];
        let yyyy = parts[2];
        if (this.isValidDate(yyyy, mm, dd)) {
          return new Date(`${mm}/${dd}/${yyyy}`);
        } else {
          return null;
        }
      } else if (/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(str)) {
        const parts = str.split('-');
        let yyyy = parts[0];
        let mm = parts[1];
        let dd = parts[2];

        if (this.isValidDate(yyyy, mm, dd)) {
          return new Date(`${mm}/${dd}/${yyyy}`);
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    isValidDate(year, month, day) {
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() == year &&
        date.getMonth() + 1 == month &&
        date.getDate() == day
      );
    },
    setMinDate() {
      if (this.minDate) {
        return this.minDate;
      }
      if (this.minCurrentDate) {
        return new Date().toISOString();
      }
      return '';
    },
    setValue() {
      const date = new Date(this.value);
      if (date instanceof Date) {
        this.onPropValueChange();
      }
    },
    dateDisabled(ymd) {
      if (this.disabledDates.includes(ymd)) {
        return true;
      }
    },
    shown() {
      let currentDate;
      if (this.inputValue === null) {
        currentDate = new Date;
      } else {
        currentDate = this.value;
      }
      const currentYear = dayjs(currentDate).year();
      const currentMonth = dayjs(currentDate).month() + 1
      this.$emit('shown', currentYear, currentMonth)
    },
    onContext(ctx) {
      const currentYear = dayjs(ctx.activeDate).year();
      const currentMonth = dayjs(ctx.activeDate).month() + 1
      this.$emit('onContext', currentYear, currentMonth)
    }
  },
  created() {
    this.setValue();
  },
};
</script>
