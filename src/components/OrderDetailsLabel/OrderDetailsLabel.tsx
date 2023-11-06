import React from 'react';

function OrderDetailsLabel({ label }: { label: string }) {
  return <div className="font-bold text-gray-500 text-sm mb-2">{label}</div>;
}

export default OrderDetailsLabel;
