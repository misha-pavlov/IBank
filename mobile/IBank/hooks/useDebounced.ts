import { useEffect, useState } from 'react';

const useDebounced = (value: string, delay = 500): string => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearInterval(handler);
  }, [value, delay]);

  return debounced;
};

export default useDebounced;
