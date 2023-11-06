import { Checkbox, Switch } from 'antd';
import React from 'react';

function SwitchField({ value, onChange, label, disabled = false }: any) {
  return (
    <div>
      <Switch
        checked={value}
        id="basic"
        disabled={disabled}
        onChange={(checked: boolean) => onChange(checked)}
      />

      <label htmlFor="basic" className="text-xs ml-4 font-medium text-gray-500">
        {label}
      </label>
    </div>
  );
}

export default SwitchField;
