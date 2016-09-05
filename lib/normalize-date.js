'use strict';

function setTimezoneOffset(date) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
}

function normalizeDateTime(date) {
    if (!date) {
        return new Date(date);
    }

    if (arguments.length > 1) {
        date = Array.prototype.slice.call(arguments);
    }

    if (Array.isArray(date)) {
        date = new (Function.prototype.bind.apply(Date, [null].concat(date)))();
    }

    var jsDate = new Date(date);

    if (date === Object(date)) {
        //Native or Moment.js date
        var momentBaseDate = date.creationData && date.creationData().input;

        if (!(momentBaseDate && (typeof momentBaseDate === 'number' || typeof momentBaseDate === 'string' && /:.+Z|GMT|[+-]\d\d:\d\d/.test(momentBaseDate)))) {
            setTimezoneOffset(jsDate); //Any data except moment.js date from timestamp or UTC string (UTC ISO format have to contains time)
        }

        return jsDate;
    }

    if (!isNaN(jsDate) && typeof date === 'string') {
        //ISO or RFC
        if (date.match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/) && date.indexOf('GMT') === -1) {
            //RFC without GMT
            setTimezoneOffset(jsDate);
        }
    } else {
        //Timestamp (always in UTC)
        jsDate = new Date(Number(String(date).split('.').join('')));
    }

    return jsDate;
}

function normalizeDate(date, options) {
    date = normalizeDateTime(date);

    return (options || {}).noTime ? new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) : date;
}

module.exports = normalizeDate;