import React from 'react';

const useViewport = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  const throttle = (func: any, delay: any) => {
    let inProgress = false;
    return (...args: any[]) => {
      if (inProgress) {
        return;
      }
      inProgress = true;
      setTimeout(() => {
        func(...args);
        inProgress = false;
      }, delay);
    };
  };

  React.useEffect(() => {
    const handleWindowResize = throttle(() => setWidth(window.innerWidth), 300);

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return { width };
};

export default useViewport;
