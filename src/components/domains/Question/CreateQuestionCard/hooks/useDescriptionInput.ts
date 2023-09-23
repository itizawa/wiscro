import { useCallback, useMemo, useState } from 'react';

export const useDescriptionInput = () => {
  const [value, setValue] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  const changeValue = useCallback((value: string) => {
    setIsDirty(true);
    setValue(value);
  }, []);

  const helperText = useMemo(() => {
    if (value.length > 3000) {
      return '文字数は3000文字を超えることはできません';
    }

    return '';
  }, [value]);

  const isError = useMemo(() => {
    return !!helperText;
  }, [helperText]);

  return {
    value,
    isDirty,
    changeValue,
    isError,
    helperText,
  };
};
