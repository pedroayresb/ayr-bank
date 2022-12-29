const format = require('date-format');

const toDate = (date: Date) => {
  if (!date) {
    return '';
  }
  const dated = format.parse(format.ISO8601_FORMAT, date);
  const formated = format('dd-MM-yyyy hh:mm:ss', dated);
  return formated;
};

export default toDate;