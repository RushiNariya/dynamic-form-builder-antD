import { Segmented } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
import React from 'react';

function SegmentedField({ value, onChange, label }: any) {
  return (
    <div>
      <label htmlFor="basic" className="text-xs font-medium text-gray-500">
        {label}
      </label>

      <Segmented
        block
        size="large"
        options={['Uppercase', 'Lowercase', 'Propercase']}
        value={value}
        onChange={(value: SegmentedValue) => onChange(value)}
      />
    </div>
  );
}

export default SegmentedField;
