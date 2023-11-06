import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

function SelectCity({
  formik,
  setCityValue,
  stateValue,
  cityValue,
  filterData,
}: {
  setCityValue: (city: { name: string } | null) => void;
  stateValue: { name: string } | null;
  cityValue: { name: string } | null;
  filterData: any;
  formik: any;
}) {
  const handleCityChange = (event: { name: string } | null) => {
    formik.setFieldValue('city', event?.name);
    setCityValue(event);
  };
  return (
    <div className="z-10 w-full">
      <Listbox value={cityValue} onChange={handleCityChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full h-10 cursor-pointer rounded-md py-2 pl-3 text-left border-[1px] focus:border-slate-400 border-solid focus:outline-1 focus:outline-slate-400 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-1 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate capitalize">
              {cityValue != null ? cityValue.name : 'Select City'}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              {!cityValue ? (
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              ) : (
                <XMarkIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCityChange(null);
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
            <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {stateValue &&
                filterData[stateValue.name]?.map((cityObject: { city: string }) => (
                  <Listbox.Option
                    key={cityObject.city}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={{ name: cityObject.city }}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {cityObject.city}
                        </span>

                        {selected ? (
                          <span
                            className={`${
                              active ? 'text-amber-600' : 'text-amber-600'
                            } absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
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

export default SelectCity;
