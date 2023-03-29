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
    if (!_liff?.init) return;
    _liff
      .init({
        liffId: process.env.NEXT_PUBLIC_LIFF_ID ?? '',
        withLoginOnExternalBrowser: true,
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
