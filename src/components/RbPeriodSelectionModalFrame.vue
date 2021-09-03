<template>
    <b-modal :id="id"
             ref="modal"
             title="Выберите период"
             cancel-title="Отмена"
             @ok="onOk"
             ok-title="Применить"
             cancel-variant="plain"
             modal-class="rb-standard-modal rb-period-selection-modal-frame rb-mobile-full-screen-modal"
             ok-variant="primary">
        <form>
            <b-container fluid>
                <b-row>
                    <b-col>
                        <div class="rb-left">
                            <div class="rb-title">Начало периода</div>
                            <b-form-group>
                                <b-form-input
                                        v-model="innerDtStartStr"
                                        type="text"
                                        autocomplete="off"
                                        @input="inputChangeDtStart"
                                        v-mask="mask"
                                        debounce="300"
                                        class="rb-date-input"
                                        :placeholder="placeholder">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <b-calendar v-model="innerDtStart" locale="ru-RU" :date-info-fn="isInRange"
                                            @context="onContextDtStart" :start-weekday="1" hide-header></b-calendar>
                            </b-form-group>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="rb-right">
                            <div class="rb-title">Конец периода</div>
                            <b-form-group>
                                <b-form-input
                                        v-model="innerDtEndStr"
                                        type="text"
                                        autocomplete="off"
                                        @input="inputChangeDtEnd"
                                        v-mask="mask"
                                        debounce="300"
                                        class="rb-date-input"
                                        :placeholder="placeholder">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <b-calendar v-model="innerDtEnd" locale="ru-RU" :date-info-fn="isInRange"
                                            @context="onContextDtEnd" :start-weekday="1" hide-header></b-calendar>
                            </b-form-group>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </form>

    </b-modal>
</template>

<script>
    import Vue from 'vue';
    import {dateFormat} from "vue-filter-date-format";
    import {mask} from 'vue-the-mask';

    export default {
        name: 'RbPeriodSelectionModalFrame',
        directives: {mask},
        props: {
            id: String,
            dtStart: Date,
            dtEnd: Date,
            placeholder: {type: String, default: 'ДД.ММ.ГГГГ'},
            mask: {type: String, default: '##.##.####'},
        },
        data() {
            return {
                innerDtStart: null,
                innerDtEnd: null,
                innerDtStartStr: null,
                innerDtEndStr: null,
                inputPattern: 'DD.MM.YYYY',
            }
        },
        watch: {
            dtStart() {
                this.innerDtStart = this.dtStart;
            },
            dtEnd() {
                this.innerDtEnd = this.dtEnd;
            }
        },
        methods: {
            onOk() {
                this.$emit('ok', this);
            },
            show() {
                this.$refs.modal.show();
            },
            onContextDtStart(ctx) {
                this.onContext(ctx, 'innerDtStart');
            },
            onContextDtEnd(ctx) {
                this.onContext(ctx, 'innerDtEnd');
            },
            onContext(ctx, field) {
                let date = ctx.selectedDate;
                if (date) {
                    Vue.set(this, field + 'Str', this.dateToStr(date))
                } else {
                    Vue.set(this, field + 'Str', null);
                }
            },
            isInRange(ymd, date) {
                let dtStart = this.innerDtStart ? this.withoutTime(new Date(this.innerDtStart)) : null;
                let dtEnd = this.innerDtEnd ? this.withoutTime(new Date(this.innerDtEnd)) : null;
                return (dtStart && dtEnd) && (date >= dtStart && date <= dtEnd) ? 'table-info' : '';
            },
            inputChangeDtStart(v) {
                this.inputChange(v, 'innerDtStart');
            },
            inputChangeDtEnd(v) {
                this.inputChange(v, 'innerDtEnd');
            },
            inputChange(v, field) {
                const date = this.strToDate(v);
                if (date) {
                    Vue.set(this, field, date);
                }
            },
            dateToStr(date) {
                return dateFormat(new Date(date), this.inputPattern);
            },
            withoutTime(dateTime) {
                let date = new Date(dateTime.getTime());
                date.setHours(0, 0, 0, 0);
                return date;
            },
            strToDate(str) {
                if (/[0-9]{2}\.[0-9]{2}\.[0-9]{4}/.test(str)) {
                    let dd = str.substring(0, 2);
                    let mm = str.substring(3, 5);
                    let yyyy = str.substring(6, 10);
                    return new Date(`${mm}.${dd}.${yyyy}`);
                } else if (/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(str)) {
                    let yyyy = str.substring(0, 4);
                    let mm = str.substring(5, 7);
                    let dd = str.substring(8, 10);
                    return new Date(`${mm}.${dd}.${yyyy}`);
                } else {
                    return null;
                }
            },
        },
        created() {
            Vue.set(this, 'innerDtStart', this.dtStart);
            Vue.set(this, 'innerDtEnd', this.dtEnd);
        }
    }
</script>
