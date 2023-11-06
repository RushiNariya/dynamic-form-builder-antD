import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';

import ValidationError from '../ValidationError/ValidationError';

type PeopleType = {
  id: number;
  name: string;
} | null;

export default function SelectComboboxOrder({
  selectOptions,
  formik,
  name = '',
  placeHolder = '',
}: {
  selectOptions: any[];
  formik: any;
  name?: string;
  placeHolder: string;
}) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredOptions =
    query === ''
      ? selectOptions
      : selectOptions.filter((person) =>
          person?.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  return (
    <div className="z-30 w-full">
      <Combobox
        value={formik.values[name]}
        onChange={async (value) => {
          await formik.setFieldValue(name, value);
          setQuery('');
          setIsFocused(false);
        }}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default rounded-lg text-left">
            <Combobox.Input
              name={name}
              autoComplete="off"
              onBlur={() => {
                setTimeout(() => {
                  formik.setFieldTouched(name, true);
                }, 50);
                setIsFocused(false);
              }}
              onClick={(e) => {
                setIsFocused(true);
              }}
              placeholder={placeHolder}
              className="relative w-full h-10 disabled:bg-slate-100 disabled:bg-opacity-40 focus:border-slate-400 cursor-pointer rounded-md py-2 px-3 text-left border-[1px] border-solid focus:outline-none focus-visible:ring-white focus-visible:ring-opacity-75 sm:text-sm"
              displayValue={(person: PeopleType) => (person ? person.name : '')}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              {!formik.values[name]?.name ? (
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              ) : (
                <XMarkIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFocused(false);
                    formik.setFieldValue(name, {
                      id: '',
                      name: '',
                    });
                  }}
                />
              )}
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            static={true}
            show={
              (!!filteredOptions.length && isFocused && !formik.values[name]?.name) ||
              !!query
            }
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((person) => (
                  <Combobox.Option
                    key={person?.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-sky-500 text-white' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person?.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      {formik.touched[name] && formik.errors[name] ? (
        <ValidationError error={formik.errors[name]?.id} />
      ) : null}
    </div>
  );
}
