import { createContext } from 'react';

export interface contextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const toggleContext = createContext<contextType>({
  isOpen: true,
  setIsOpen: () => undefined,
});

export default toggleContext;
