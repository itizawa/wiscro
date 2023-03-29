import liff from '@line/liff';
import { createContext, FC, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';

type Liff = typeof liff;

const LiffContext = createContext<{
  liff?: Liff;
}>({});

export const useLiff = () => useContext(LiffContext);

export const LiffProvider: FC<PropsWithChildren> = ({ children }) => {
  const didLoadRef = useRef(false);
  const [_liff, setLiffSDK] = useState<Liff | undefined>();
  const [liff, setLiff] = useState<Liff | undefined>();
  // Load LIFF SDK
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (didLoadRef.current === true) return;
    didLoadRef.current = true;
    import('@line/liff').then((data: any) => setLiffSDK(data));
  }, []);

  // init Liff
  useEffect(() => {
    if (!_liff) return;
    _liff
      .init({
        liffId: '1660803596-8xRX9z9P',
      })
      .then(() => {
        setLiff(_liff);
      });
  }, [_liff]);

  return (
    <LiffContext.Provider
      value={{
        liff,
      }}
    >
      {children}
    </LiffContext.Provider>
  );
};
