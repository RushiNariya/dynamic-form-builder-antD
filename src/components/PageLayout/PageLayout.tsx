import React from 'react';
import { Helmet } from 'react-helmet';

import Badge from '../Badge/Badge';

interface PageLayoutPropsType {
  pageTitle: string;
  children?: React.ReactNode;
  status?: string;
  message?: number;
}

function PageLayout(props: PageLayoutPropsType) {
  return (
    <div className="">
      <Helmet>
        <title>{props.pageTitle} | Cloint Reincarnation</title>
      </Helmet>
      <div className="p-2 flex capitalize flex-wrap justify-between font-inter font-medium text-2xl pl-2">
        <div>{props.pageTitle}</div>
        {props.status ? (
          <div className="pr-3">
            <Badge name={props.status} isDeletable={false} />
          </div>
        ) : null}

        {props.message ? (
          <div className="pr-3">
            <span className="text-[0.9rem] font-regular">
              ({props.message} {props.message === 1 ? 'document' : 'documents'} selected)
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap">
        <div className="flex-none w-full max-w-full px-3">
          <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-md rounded-sm">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageLayout;
