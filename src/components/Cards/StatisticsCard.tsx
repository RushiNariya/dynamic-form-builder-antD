import React from 'react';

interface StatisticsCardProps {
  cardTitle: string;
  cardContent: any;
  cardIcon?: any;
  children?: React.ReactNode;
  gradient: string;
}

function StatisticsCard({
  cardTitle,
  cardContent,
  cardIcon,
  children,
  gradient,
}: StatisticsCardProps) {
  const contentTextColor = gradient.split(' ')[1].split('-')[1];
  return (
    <div className="relative border-2 flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3 sm:w-2/3 sm:px-5">
            <div className="flex flex-col justify-between">
              <p className="mt-2 mb-0 font-sans font-semibold leading-normal whitespace-nowrap text-sm text-gray-600">
                {cardTitle}
              </p>
              <h5 className="mb-0 font-bold text-gray-900">
                <span className={`leading-normal text-xl font-weight-bolder pl-1 `}>
                  {cardContent}
                </span>
              </h5>
            </div>
          </div>
          <div className="w-full max-w-full px-3 mt-4 sm:w-4/12 sm:mt-0 sm:ml-auto sm:text-center">
            <div
              className={
                'mt-2 inline-block w-14 h-14 text-center rounded-lg shadow-soft-2xl ' +
                gradient
              }
            >
              {cardIcon ? (
                <img
                  src={cardIcon}
                  className="align-middle text-white w-8 h-8 mx-auto mt-3"
                  alt="Money Icon"
                />
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsCard;
