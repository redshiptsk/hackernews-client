import { createContext, useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { newsStore, type INewsStore } from './NewsStore';

const Context = createContext<INewsStore | null>(null);

export const AppStoreProvider = observer(({ children }) => {
  const store = useLocalObservable(() => newsStore());
  return <Context.Provider value={store}>{children}</Context.Provider>;
});

export const useAppStore = ():INewsStore => {
  const store = useContext(Context);
  if (!store) throw new Error('Use App store within provider!');
  return store;
};