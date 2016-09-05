# normalize-date
Converts date from any format to native UTC JS Date. It is useful for further comparison

[![NPM version](https://img.shields.io/npm/v/normalize-date.svg)](https://npmjs.org/package/normalize-date)
[![Build status](https://img.shields.io/travis/tamtakoe/normalize-date.svg)](https://travis-ci.org/tamtakoe/normalize-date)

**Note:** This module works in browsers and Node.js >= 4.0


## Installation

```sh
npm install normalize-date
```


## Usage

```js
const toDate = require('normalize-date');

const date1 = toDate('2000-01-05T23:59:59.000Z');
const date2 = toDate('947116799.000');
date1.valueOf() === date2.valueOf() //true

const date3 = toDate('2000-01-05T23:59:59', {noTime: true});
const date4 = toDate(new Date(2000, 0, 5), {noTime: true});
date3.valueOf() === date4.valueOf() //true

//Some of possible formats
toDate('2000-01-05') //ISO 8601
toDate('2000-01-05T23:59:59Z') //ISO 8601
toDate('2000-01-05T23:59:59.000+00:00') //ISO 8601
toDate('Sat Jan 05 2000 23:59:59') //RFC 2822
toDate('Sat Jan 05 2000 22:59:59 GMT-0415') //RFC 2822
toDate(947116799000) //the number of milliseconds since 1970
toDate('947116799.000') //UNIX timestamp
toDate(new Date(2000, 0, 5, 23, 59, 59, 0)) //JS Date
toDate([2000, 0, 5, 23, 59, 59, 0]) //arguments for Date constructor
toDate(moment('2000-01-05T23:59:59.000')) //MomentJS date
```


## API

### normalizeDate(date, [options])

- **date** (`Any`) - Date as JS Date (or array with arguments), Moment, time, timestamp, ISO 8601, RFC 2822

- **options** (`Object`) - Options
  * noTime (`Boolean`) - clear time

- **return** (`Date`) - Native JavaScript Date (in UTC)


## Tests

```sh
npm install
npm test
```

## License

[MIT](LICENSE)