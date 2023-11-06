import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';

function CheckboxField({ value, onChange, label }: any) {
  return (
    <div>
      <Checkbox
        checked={value}
        onChange={(e: CheckboxChangeEvent) => onChange(e.target.checked)}
      >
        {label}
      </Checkbox>
    </div>
  );
}

export default CheckboxField;
