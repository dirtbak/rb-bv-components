<template>
    <span class="rb-period-input">
        <b-dropdown class="rb-dropdown-input"
                    :class="cls"
                    :variant="variant">
            <template v-slot:button-content>
                <slot name="button-content" :text="text" :cancelItemText="cancelItemText" :placeholder="placeholder"
                      :showCancelItem="showCancelItem">
                    <template v-if="link">
                        <a class="rb-text">{{text? text: (showCancelItem? cancelItemText: placeholder)}}</a>
                    </template>
                    <template v-else>
                        <rb-text>{{text? text: (showCancelItem? cancelItemText: placeholder)}}</rb-text>
                    </template>
                </slot>
            </template>

            <b-dropdown-item v-for="(item, idx) in items" :key="idx" @click="onClick(item)">
                <span class="rb-text">{{item.name}}</span>
            </b-dropdown-item>
        </b-dropdown>
        <rb-period-selection-modal-frame :dt-start="innerDtStart" :dt-end="innerDtEnd"
                                         id="rb-period-selection-modal-frame" @ok="onOk()" ref="modal"
        ></rb-period-selection-modal-frame>
    </span>
</template>

<script>
    import RbPeriodSelectionModalFrame from "./RbPeriodSelectionModalFrame";
    import {dateFormat} from "vue-filter-date-format";
    import {UtDate} from "../utils/UtDate";

    export default {
        name: 'RbPeriodInput',
        components: {RbPeriodSelectionModalFrame},
        props: {
            link: Boolean,
            variant: {type: String, default: 'light'},
            bordered: Boolean,
            cancelItemText: {type: String, default: 'Не важно'},
            showCancelItem: Boolean,
            placeholder: {type: String, default: 'Выберите период'},
            dtStart: [String, Date],
            dtEnd: [String, Date],
            state: {type: Boolean, default: null},
        },
        data() {
            return {
                innerDtStart: null,
                innerDtEnd: null,
                items: [
                    {id: 1, name: 'За посл. неделю'},
                    {id: 2, name: 'За посл. месяц.'},
                    {id: 3, name: 'За посл. квартал'},
                    {id: 4, name: 'За посл. год'},
                    {id: 5, name: 'За 7 дней'},
                    {id: 6, name: 'За 30 дней'},
                    {id: 7, name: 'Установить диапазон вручную'},
                ],
                periods: {
                    WEEK: 1,
                    MONTH: 2,
                    QUARTER: 3,
                    YEAR: 4,
                    SEVEN_DAYS: 5,
                    THIRTY_DAYS: 6,
                    CUSTOM: 7,
                },
            }
        },
        computed: {
            cls() {
                return {
                    'rb-bordered': this.bordered && !this.link,
                    'rb-dropdown-link-input': this.link,
                    'is-invalid': this.state === false,
                    'is-valid': this.state === true,
                }
            },
            text() {
                let dtStart = this.innerDtStart;
                let dtEnd = this.innerDtEnd;
                if (dtStart || dtEnd) {
                    if (dtStart == dtEnd) {
                        return dtStart;
                    } else {
                        let val = dtStart ? dateFormat(dtStart, 'DD.MM.YYYY') : '';

                        if (dtEnd) {
                            val += (val ? ' - ' : '') + dateFormat(dtEnd, 'DD.MM.YYYY');
                        }

                        return val;
                    }
                } else {
                    return null;
                }
            }
        },
        methods: {
            onClick(item) {
                let th = this;
                let value = item.id;

                if (value) {
                    if (value == this.periods.CUSTOM) {
                        console.info('this.$refs', this.$refs);
                        this.$refs['modal'].show();
                    } else {
                        if (value == this.periods.WEEK) {
                            this.innerDtEnd = UtDate.minusMilliseconds(UtDate.withoutTime(new Date()), 1);
                            this.innerDtStart = UtDate.getMonday(this.innerDtEnd)
                        } else if (value == this.periods.MONTH) {
                            this.innerDtEnd = UtDate.minusMilliseconds(UtDate.withoutTime(new Date()), 1);
                            this.innerDtStart = UtDate.getFirstDayOfMonth(this.innerDtEnd);
                        } else if (value == this.periods.QUARTER) {
                            this.innerDtEnd = UtDate.minusMilliseconds(UtDate.withoutTime(new Date()), 1);
                            this.innerDtStart = UtDate.getFirstDayOfQuarter(this.innerDtEnd);
                        } else if (value == this.periods.YEAR) {
                            this.innerDtEnd = UtDate.minusMilliseconds(UtDate.withoutTime(new Date()), 1);
                            this.innerDtStart = UtDate.getFirstDayOfYear(this.innerDtEnd);
                        } else if (value == this.periods.SEVEN_DAYS) {
                            this.innerDtEnd = UtDate.minusMilliseconds(UtDate.withoutTime(new Date()), 1);
                            this.innerDtStart = UtDate.minusDays(this.innerDtEnd, 6);
                        } else if (value == this.periods.THIRTY_DAYS) {
                            this.innerDtEnd = UtDate.minusMilliseconds(UtDate.withoutTime(new Date()), 1);
                            this.innerDtStart = UtDate.minusDays(this.innerDtEnd, 29);
                        }

                        th.$emit('update:dtStart', this.innerDtStart);
                        th.$emit('update:dtEnd', this.innerDtEnd);
                    }
                }
            },
            onOk() {
                let th = this;
                th.innerDtStart = new Date(this.$refs.modal.innerDtStart);
                th.innerDtEnd = new Date(this.$refs.modal.innerDtEnd);
                th.$emit('update:dtStart', this.innerDtStart);
                th.$emit('update:dtEnd', this.innerDtEnd);
            }
        },
        created() {
            this.innerDtStart = this.dtStart;
            this.innerDtEnd = this.dtEnd;
        },
    }
</script>
