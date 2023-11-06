import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { isArray } from 'lodash';
import React from 'react';

// use in form view and form filling code to disable configured dates

// function disabledDate(current: dayjs.Dayjs) {
//   // Ex. can not select Sundays
//   return moment(current.toDate()).day() === 0;
// }
const { RangePicker } = DatePicker;

function DateRangeField({ value, onChange, label, disabled = false }: any) {
  console.log(value);
  return (
    <div>
      <label htmlFor="basic" className="text-xs font-medium text-gray-500 block">
        {label}
      </label>

      <RangePicker
        picker="date"
        id="basic"
        size="large"
        disabled={disabled}
        // disabledDate={disabledDate}
        {...{ value: isArray(value) ? [dayjs(value[0]), dayjs(value[1])] : undefined }}
        format={'DD-MMM-YYYY'}
        onChange={(date, dateString) => onChange(dateString)}
        className="border-gray-400 w-full rounded-md outline-none focus:border-gray-600 focus:ring-0 focus:outline-none"
      />
    </div>
  );
}

export default DateRangeField;
