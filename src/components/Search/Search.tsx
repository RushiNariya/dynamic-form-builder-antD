import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';

function Search({ onSubmitHandler }: { onSubmitHandler: (search: string) => void }) {
  const [value, setValue] = useState('');

  const debouncedSave = useCallback(
    debounce((nextValue: string) => onSubmitHandler(nextValue), 500),
    [],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.target;
    setValue(nextValue);
    debouncedSave(nextValue);
  };
  return (
    <div className="mb-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          value={value || ''}
          onChange={handleChange}
          placeholder="Search Here..."
          className="relative w-full h-10 focus:border-slate-400 cursor-pointer rounded-md py-2 px-3 text-left border-[1px] border-solid focus:outline-none focus-visible:ring-white focus-visible:ring-opacity-75 sm:text-sm"
        />
      </form>
    </div>
  );
}

export default Search;
