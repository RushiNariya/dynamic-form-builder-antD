import { Select } from 'antd';
import React from 'react';

function SelectField({ placeHolder, value, onChange, options, isMulti = true }: any) {
  return (
    <div>
      <label htmlFor="basic" className="text-xs font-medium text-gray-500">
        {placeHolder}
      </label>

      <Select
        {...{ mode: isMulti ? 'multiple' : undefined }}
        className="border-gray-400 rounded-md outline-none focus:border-gray-600 focus:ring-0 focus:outline-none"
        style={{ width: '100%' }}
        allowClear
        size="large"
        placeholder="Please select"
        value={value}
        onChange={(values, items) => onChange(items)}
        options={options}
      />
    </div>
  );
}

export default SelectField;
