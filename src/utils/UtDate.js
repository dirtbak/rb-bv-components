export const UtDate = {
    getTextDate(dateInMs) {
        const dt = new Date(dateInMs);
        const dateTimeFormat = new Intl.DateTimeFormat('ru', {year: 'numeric', month: '2-digit', day: '2-digit'})
        const [{value: month}, , {value: day}, , {value: year}] = dateTimeFormat.formatToParts(dt);
        return `${day}.${month}.${year}`;
    },

    newDate(dateStr) {
        if (dateStr) {
            return new Date(dateStr).setHours(0, 0, 0, 0);
        } else {
            return new Date().setHours(0, 0, 0, 0);
        }
    },

    equals(dateStr1, dateStr2, includeTime) {
        if (includeTime) {
            return new Date(dateStr1) === new Date(dateStr2);
        } else {
            return this.newDate(dateStr1) === this.newDate(dateStr2);
        }
    },

    isToday(dateStr) {
        return UtDate.newDate(dateStr) === UtDate.newDate();
    },

    getQuarterOfYear(dt) {
        if (dt) {
            dt = new Date(dt);
            let romanQuarters = ['I', 'II', 'III', 'IV'];
            let quarter = Math.ceil((dt.getMonth() + 1) / 3);

            return `${romanQuarters[quarter - 1]} кв. ${dt.getFullYear()}`;
        } else {
            return '';
        }
    },

    withoutTime(dateTime) {
        let date = new Date(dateTime.getTime());
        date.setHours(0, 0, 0, 0);
        return date;
    },

    minusDays(dateTime, offset) {
        let date = new Date(dateTime.getTime());
        date.setDate(date.getDate() - offset);
        return date;
    },

    minusMilliseconds(dateTime, offset) {
        let date = new Date(dateTime.getTime());
        date.setMilliseconds(date.getMilliseconds() - offset);
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

    getMonday(date) {
        date = new Date(date);
        let day = date.getDay(),
            diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(date.setDate(diff));
    },

    getFirstDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    },

    getFirstDayOfYear(date) {
        return this.withoutTime(new Date(date.getFullYear(), 0, 1));
    },

    getFirstDayOfQuarter(date) {
        let t = this.withoutTime(date);
        let year = t.getFullYear();

        let q1 = new Date(year, 0, 1),
            q2 = new Date(year, 3, 1),
            q3 = new Date(year, 6, 1),
            q4 = new Date(year, 9, 1);

        if (t < q2) return q1;
        if (t < q3) return q2;
        if (t < q4) return q3;
        if (t >= q4) return q4;
    }
};
