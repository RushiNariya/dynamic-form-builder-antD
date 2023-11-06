import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

import UserType from '../../types/users.type';
import ValidationError from '../ValidationError/ValidationError';

const people = [
  { name: 'staff', label: 'Staff' },
  { name: 'drafter', label: 'Drafter' },
  { name: 'rpls', label: 'Rpls' },
  { name: 'fieldRep', label: 'Field Rep' },
];

export default function UserSelectRole({
  formik,
  selectedUser,
}: {
  formik: any;
  selectedUser: UserType | null | undefined;
}) {
  return (
    <div className="z-10 w-full">
      <Listbox
        disabled={!!selectedUser}
        name="role"
        onChange={(e) => {
          formik.setFieldValue('role', e);
        }}
        value={formik.values.role}
      >
        <div className="relative">
          <Listbox.Button
            name="role"
            onBlur={formik.handleBlur}
            className="relative disabled:bg-slate-100 disabled:bg-opacity-40 w-full h-10 cursor-pointer rounded-md py-2 pl-3 text-left border-[1px] focus:border-slate-400 border-solid focus:outline-1 focus:outline-slate-400 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-1 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <span className="block truncate capitalize">
              {formik.values.role ? formik.values.role : 'Select Role'}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              {!formik.values.role
                ? !selectedUser && (
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  )
                : !selectedUser && (
                    <XMarkIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                      onClick={(e) => {
                        e.stopPropagation();
                        formik.setFieldValue('role', '');
                      }}
                    />
                  )}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="mt-1 max-h-60 w-fit min-w-[300px] fixed overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={person.name}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {formik.touched.role && formik.errors.role ? (
        <ValidationError error={formik.errors.role} />
      ) : null}
    </div>
  );
}
