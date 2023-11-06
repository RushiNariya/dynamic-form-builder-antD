import { Input, InputNumber } from 'antd';
import React from 'react';

function InputNumberField({
  value,
  onChange,
  label,
  min,
  max,
  step = 1,
  disabled = false,
  required = false,
}: any) {
  return (
    <div>
      <label htmlFor="basic" className="text-xs font-medium text-gray-500 mr-4">
        {label}
      </label>

      <InputNumber
        id="basic"
        type="number"
        step={step}
        controls={false}
        placeholder="Basic usage"
        size="large"
        value={value}
        required={required}
        disabled={disabled}
        // min={min}
        {...{ min: min ? min : undefined }}
        {...{ max: max ? max : undefined }}
        // max={max}
        onChange={(value) => onChange(value)}
        className="border-gray-400 w-full rounded-md outline-none focus:border-gray-600 focus:ring-0 focus:outline-none"
      />
    </div>
  );
}

export default InputNumberField;
