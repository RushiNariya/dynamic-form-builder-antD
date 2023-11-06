import { DatePicker, Input } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import moment from 'moment';
import React from 'react';

// use in form view and form filling code to disable configured dates

// function disabledDate(current: dayjs.Dayjs) {
//   // Ex. can not select Sundays
//   return moment(current.toDate()).day() === 0;
// }

dayjs.extend(weekday);
dayjs.extend(localeData);

function DateField({ value, onChange, label, disabled = false }: any) {
  return (
    <div>
      <label htmlFor="basic" className="text-xs font-medium text-gray-500 block">
        {label}
      </label>

      <DatePicker
        id="basic"
        size="large"
        disabled={disabled}
        // disabledDate={disabledDate}
        {...{ value: value ? dayjs(value) : undefined }}
        format={'DD-MMM-YYYY'}
        onChange={(date, dateString) => onChange(dateString)}
        className="border-gray-400 w-full rounded-md outline-none focus:border-gray-600 focus:ring-0 focus:outline-none"
        placeholder="Basic usage"
      />
    </div>
  );
}

export default DateField;
