import { Input } from 'antd';
import React from 'react';

function InputField({
  value,
  onChange,
  label,
  disabled = false,
  type = 'text',
  required = false,
}: any) {
  return (
    <div>
      <label htmlFor="basic" className="text-xs font-medium text-gray-500">
        {label}
      </label>

      <Input
        id="basic"
        placeholder="Basic usage"
        size="large"
        type={type}
        disabled={disabled}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="border-gray-400 rounded-md outline-none focus:border-gray-600 focus:ring-0 focus:outline-none"
      />
    </div>
  );
}

export default InputField;
