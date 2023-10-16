import { useCallback, useMemo, useState } from 'react';

export const useTitleInput = () => {
  const [value, setValue] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  const changeValue = useCallback((value: string) => {
    setIsDirty(true);
    setValue(value);
  }, []);

  const helperText = useMemo(() => {
    if (!value) {
      return 'タイトルを設定してください';
    }

    if (value.length > 200) {
      return '文字数が長すぎます';
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
