<template>
  <b-form-input
      ref="input"
      v-model="model"
      type="text"
	  :disabled="disabled"
      :formatter="numberInputFormatter" 
      :placeholder="placeholder"
      :state="state" />
</template>

<script>
export default {
    name: 'RbPriceInput',
    props: {
        value: {type: [String, Number], default: ''},
        placeholder: {type: String, default: ''},
        state: {type: Boolean, default: null},
		disabled: {type: Boolean, default: false}
    },
    data() {
        return {
            innerValue: ''
        };
    },
    computed: {
        model: {
            get() {
                if (this.innerValue) {
                    return this.priceToFloatPriceFormatter(this.innerValue);
                } else if (this.value) {
                    return this.priceToFloatPriceFormatter(this.value.toString().replace('.', ','));
                } else {
                    return '';
                }
            },
            set(value) {
                this.innerValue = value;
                this.$emit('input', parseFloat(value.replace(',', '.').replace(/\s/g, '')));
            }
        }
    },
    methods: {
        numberInputFormatter(value) {
            const cleanedValue = value.replace(/[^\d.,]+/g, '');

            const dotCount = cleanedValue.split('.').length - 1;
            const commaCount = cleanedValue.split(',').length - 1;

            const hasDigits = /\d/.test(cleanedValue);

            if (hasDigits && dotCount < 2 && commaCount < 2) {
                if (dotCount === 1 && cleanedValue.includes('.') && value.endsWith(',')) {
                    return this.priceToFloatPriceFormatter(cleanedValue.slice(0, -1));
                } else if (commaCount === 1 && cleanedValue.includes(',') && value.endsWith('.')) {
                    return this.priceToFloatPriceFormatter(cleanedValue.slice(0, -1));
                } else {
                    return this.priceToFloatPriceFormatter(cleanedValue);
                }
            } else {
                return this.priceToFloatPriceFormatter(cleanedValue.slice(0, -1));
            }
        },
        priceToFloatPriceFormatter(value) {
            const separatedByDotParts = value.split('.');
            const separatedByCommaParts = value.split(',');

            if (separatedByDotParts.length === 1 && separatedByCommaParts.length === 1) {
                return this.numberToPriceFormatter(value);
            } else if (separatedByDotParts.length > 1) {
                return `${this.numberToPriceFormatter(separatedByDotParts[0])}.${separatedByDotParts[1]}`;
            } else if (separatedByCommaParts.length > 1) {
                return `${this.numberToPriceFormatter(separatedByCommaParts[0])},${separatedByCommaParts[1]}`;
            } else {
                return value;
            }

        },
        numberToPriceFormatter(value) {
            return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }
    }
};
</script>

<style>

</style>