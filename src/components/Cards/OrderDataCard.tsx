import React from 'react';

interface OrderDataCardProps {
  cardTitle: string;
  cardContent: any;
  cardBackgroundColor: string;
}

function OrderDataCard({
  cardTitle,
  cardContent,
  cardBackgroundColor,
}: OrderDataCardProps) {
  return (
    <div
      className={
        'w-full shadow-md p-4 border border-gray-200 rounded-lg shadow flex flex-col items-center justify-center ' +
        cardBackgroundColor
      }
    >
      <h1 className="text-3xl font-bold tracking-tight text-white">{cardContent}</h1>
      <p className="mt-2 text-sm font-normal text-white text-center">{cardTitle}</p>
    </div>
  );
}

export default OrderDataCard;
