import React from 'react';

import { FormFieldTypes } from '../../data/constants';
import { selectIsModalOpen } from '../../redux/common/selectors';
import { selectFormComponent } from '../../redux/formBuider/selectors';
import { useSelector } from '../../redux/rootStateType';
import { SidebarItemType } from '../../utils/formbuilder/sidebarItem.type';
import Date from '../FormBuilder/Date';
import Decimal from '../FormBuilder/Decimal';
import Email from '../FormBuilder/Email';
import MultiLine from '../FormBuilder/MultiLine';
import Number from '../FormBuilder/Number';
import SingleLine from '../FormBuilder/SingleLine';
import Website from '../FormBuilder/WebSite';

function WhichComponent({ formComponent }: { formComponent: SidebarItemType }) {
  switch (formComponent?.fieldName) {
    case FormFieldTypes.SINGLE_LINE:
      return <SingleLine />;
    case FormFieldTypes.MULTI_LINE:
      return <MultiLine />;
    case FormFieldTypes.NUMBER:
      return <Number />;
    case FormFieldTypes.DECIMAL:
      return <Decimal />;
    case FormFieldTypes.EMAIL:
      return <Email />;
    case FormFieldTypes.WEBSITE:
      return <Website />;
    case FormFieldTypes.DATE:
      return <Date />;
    default:
      return <div>Please select form component</div>;
  }
}

export default function Drawer() {
  const formComponent = useSelector(selectFormComponent);
  const isOpen = useSelector(selectIsModalOpen);
  // const dispatch = useDispatch();

  return (
    <main
      className={
        ' fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
        (isOpen
          ? ' transition-opacity opacity-100 duration-500 translate-x-0  '
          : ' transition-all delay-500 opacity-0 translate-x-full  ')
      }
    >
      <section
        className={
          ' w-screen max-w-2xl right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full ')
        }
      >
        <article className="relative w-screen max-w-2xl pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          {/* <header
            onClick={() => {
              setIsOpen();
            }}
            className="p-4 font-bold text-lg"
          >
            Cancel
          </header> */}
          {formComponent ? <WhichComponent formComponent={formComponent} /> : null}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        // onClick={() => {
        //   setIsOpen();
        // }}
      ></section>
    </main>
  );
}
