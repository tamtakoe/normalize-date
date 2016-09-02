'use strict';

const expect = require('chai').expect;
const moment = require('moment');
const toDate = require('../src/normalize-date');

const datesTime = [
    '2000-01-05T23:59:59.000',
    '2000-01-05T23:59:59.000Z',
    '2000-01-05T23:59:59.000+00:00',
    '2000-01-05T22:59:59.000-01:00',
    'Sat Jan 05 2000 23:59:59',
    'Sat Jan 05 2000 23:59:59 GMT+0000',
    'Sat Jan 05 2000 22:59:59 GMT-0100',
    947105999000,
    '947105999.000',
    new Date(2000, 0, 5, 23, 59, 59, 0),
    [2000, 0, 5, 23, 59, 59, 0],
    moment('2000-01-05T23:59:59.000'),
    moment('2000-01-05T23:59:59.000Z'),
    moment('2000-01-05T23:59:59.000+00:00'),
    moment('2000-01-05T22:59:59.000-01:00'),
    // moment('Sat Jan 05 2000 23:59:59'), //deprecated! http://momentjs.com/guides/#/warnings/js-date/
    // moment('Sat Jan 05 2000 23:59:59 GMT+0000'), //deprecated! http://momentjs.com/guides/#/warnings/js-date/
    // moment('Sat Jan 05 2000 22:59:59 GMT-0100'), //deprecated! http://momentjs.com/guides/#/warnings/js-date/
    moment(947105999000),
    moment(new Date(2000, 0, 5, 23, 59, 59, 0)),
    moment([2000, 0, 5, 23, 59, 59, 0])
];

const datesZero = [
    '2000-01-05T00:00:00.000',
    '2000-01-05T00:00:00.000Z',
    '2000-01-05T00:00:00.000+00:00',
    '2000-01-04T23:00:00.000-01:00',
    'Sat Jan 05 2000 00:00:00',
    'Sat Jan 05 2000 00:00:00 GMT+0000',
    'Sat Jan 04 2000 23:00:00 GMT-0100',
    947019600000,
    '947019600.000',
    new Date(2000, 0, 5, 0, 0, 0, 0),
    [2000, 0, 5, 0, 0, 0, 0],
    moment('2000-01-05T00:00:00.000'),
    moment('2000-01-05T00:00:00.000Z'),
    moment('2000-01-05T00:00:00.000+00:00'),
    moment('2000-01-04T23:00:00.000-01:00'),
    // moment('Sat Jan 05 2000 00:00:00'), //deprecated! http://momentjs.com/guides/#/warnings/js-date/
    // moment('Sat Jan 05 2000 00:00:00 GMT+0000'), //deprecated! http://momentjs.com/guides/#/warnings/js-date/
    // moment('Sat Jan 04 2000 23:00:00 GMT-0100'), //deprecated! http://momentjs.com/guides/#/warnings/js-date/
    moment(947019600000),
    moment(new Date(2000, 0, 5, 0, 0, 0, 0)),
    moment([2000, 0, 5, 0, 0, 0, 0]),

    '2000-01-05',
    '2000-01-05Z',
    // '2000-01-05+00:00', //Invalid Date
    // '2000-01-05-01:00', //Invalid Date
    'Sat Jan 05 2000',
    'Sat Jan 05 2000 GMT+0000',
    // 'Sat Jan 05 2000 GMT-0100', //No sense
    947019600000,
    '947019600.000',
    new Date(2000, 0, 5),
    [2000, 0, 5],
    moment('2000-01-05'),
    moment('2000-01-05Z'),
    // moment('2000-01-05+00:00'), //Invalid Date
    // moment('2000-01-05-01:00'), //Invalid Date
    // moment('Sat Jan 05 2000'), //deprecated! http://momentjs.com/guides/#/warnings/js-date/
    // moment('Sat Jan 05 2000 GMT+0000'), //deprecated! http://momentjs.com/guides/#/warnings/js-date/
    // moment('Sat Jan 05 2000 GMT-0100'), //deprecated! http://momentjs.com/guides/#/warnings/js-date/
    moment(947019600000),
    moment(new Date(2000, 0, 5)),
    moment([2000, 0, 5])
];

function checkDates(dates, comparator) {
    dates.forEach(date1 => {
        const native1 = date1 instanceof Date ? '(Native) ' : '';
        const mDate1 = date1.creationData && date1.creationData().input;

        dates.forEach(date2 => {
            const native2 = date2 instanceof Date ? '(Native) ' : '';
            const mDate2 = date2.creationData && date2.creationData().input;

            it((mDate1 ? '(Moment) ' + mDate1 : native1 + date1) + ' === ' + (mDate2 ? '(Moment) ' + mDate2 : native2 + date2), function() {
                expect(comparator(date1, date2)).to.be.true;
            });
        });
    });

}
console.log(toDate('2000-01-05T23:59:59.000Z').valueOf() === toDate(947105999000).valueOf());
console.log(toDate('2000-01-05T23:59:59', {noTime: true}).valueOf() === toDate(new Date(2000, 0, 5), {noTime: true}).valueOf());

describe('Сomparison of equal dates with time', function() {
    function equalDate(date1, date2) {
        return toDate(date1).valueOf() === toDate(date2).valueOf()
    }

    checkDates(datesTime, equalDate);
});

describe('Сomparison of dates with zero time with equal dates without time', function() {
    function equalDate(date1, date2) {
        return toDate(date1).valueOf() === toDate(date2).valueOf()
    }

    checkDates(datesZero, equalDate);
});

describe('Сomparison of dates with time with equal dates without time in noTime mode', function() {
    function equalDate(date1, date2) {
        return toDate(date1, {noTime: true}).valueOf() === toDate(date2, {noTime: true}).valueOf()
    }

    checkDates(datesZero.concat(datesTime), equalDate);
});