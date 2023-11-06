import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useState } from 'react';

function SelectSearch({
  role,
  setRole,
  options,
  placeHolder,
}: {
  role: string | number;
  setRole: (search: string | number) => void;
  options: Array<{ name: string | number; label: string }>;
  placeHolder: string;
}) {
  const [value, setValue] = useState<{ name: string | number; label: string } | null>(
    null,
  );

  const handleChange = (event: { name: string | number; label: string } | null) => {
    setValue(event);
    if (event === null) {
      setRole('');
    } else {
      setRole(event?.name);
    }
  };

  return (
    <div className={'z-10 w-60'}>
      <Listbox value={value} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full h-10 bg-gray-50 cursor-pointer rounded-md py-2 pl-3 text-left border-[1px] focus:border-slate-400 border-solid focus:outline-1 focus:outline-slate-400 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-1 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate capitalize">
              {value != null ? value.label : placeHolder}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              {!value ? (
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              ) : (
                <XMarkIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChange(null);
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={person}
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
    </div>
  );
}

export default React.memo(SelectSearch);
