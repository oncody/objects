import dayjs from "./dayjs.js";
import {Month} from "./data/month.js";
import {DateUnit} from "./data/date-unit.js";
import {DateFormatBuilder} from "./date-format-builder.js";
import {MonthFormat} from "./data/month-format.js";
import {DayFormat} from "./data/day-format.js";
import {YearFormat} from "./data/year-format.js";

class CalendarDate {
    /** @param {dayjs.Dayjs} date */
    constructor(date) {
        /** @private */ this._date = date;
    }

    /** @returns {number} */
    unixSeconds = () => this._date.unix();

    /** @returns {number} */
    unixMs = () => this._date.valueOf();

    /** @param {CalendarDate} date
     * @returns {boolean} */
    isBefore = date => this._date.isBefore(date._date);

    /** @param {number} value
     * @returns {CalendarDate} */
    addDays = value => new CalendarDate(this._date.add(value, DateUnit.DAY.toString()));

    /** @param {number} value
     * @returns {CalendarDate} */
    addMonths = value => new CalendarDate(this._date.add(value, DateUnit.MONTH.toString()));

    /** @param {number} value
     * @returns {CalendarDate} */
    addYears = value => new CalendarDate(this._date.add(value, DateUnit.YEAR.toString()));

    /** @param {number} value
     * @returns {CalendarDate} */
    subtractDays = value => new CalendarDate(this._date.subtract(value, DateUnit.DAY.toString()));

    /** @param {number} value
     * @returns {CalendarDate} */
    subtractMonths = value => new CalendarDate(this._date.subtract(value, DateUnit.MONTH.toString()));

    /** @param {number} value
     * @returns {CalendarDate} */
    subtractYears = value => new CalendarDate(this._date.subtract(value, DateUnit.YEAR.toString()));

    /** @param {CalendarDate} date
     * @returns {number} */
    differenceInDays = date => this._date.diff(date._date, DateUnit.DAY.toString());

    /** @param {CalendarDate} date
     * @returns {number} */
    differenceInMonths = date => this._date.diff(date._date, DateUnit.MONTH.toString());

    /** @param {CalendarDate} date
     * @returns {number} */
    differenceInYears = date => this._date.diff(date._date, DateUnit.YEAR.toString());

    /** 1 - 31. Day of month
     * @returns {number} */
    day = () => this._date.date();

    /** Months are zero indexed. 0 - 11
     * @returns {Month} */
    month = () => Month.fromZeroBasedIndex(this._date.month());

    /** @returns {number} */
    year = () => this._date.year();

    /** Example: January 7, 1990
     * @returns {string} */
    longHumanString = () => {
        return this._date.format(new DateFormatBuilder()
            .month(MonthFormat.FULL_NAME)
            .space()
            .day(DayFormat.ONE_DIGIT)
            .comma()
            .space()
            .year(YearFormat.FOUR_DIGIT)
            .build())
    };

    /** Example: Jan 7, 1990
     * @returns {string} */
    shortHumanString = () => {
        return this._date.format(new DateFormatBuilder()
            .month(MonthFormat.SHORT_NAME)
            .space()
            .day(DayFormat.ONE_DIGIT)
            .comma()
            .space()
            .year(YearFormat.FOUR_DIGIT)
            .build());
    }

    /** ISO 8601 string. Example: 1990-01-07
     * @returns {string} */
    computerString = () => {
        return this._date.format(new DateFormatBuilder()
            .year(YearFormat.FOUR_DIGIT)
            .dash()
            .month(MonthFormat.TWO_DIGIT)
            .dash()
            .day(DayFormat.TWO_DIGIT)
            .build());
    }
}

export {CalendarDate}
