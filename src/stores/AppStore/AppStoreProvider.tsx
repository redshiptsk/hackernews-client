import { createContext, useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { newsStore } from './NewsStore';

const Context = createContext(null);

export const AppStoreProvider = observer(({ children, ...props }) => {
  const store = useLocalObservable(() => newsStore(props));
  return <Context.Provider value={store}>{children}</Context.Provider>;
});

export const useAppStore = () => {
  const store = useContext(Context);
  if (!store) throw new Error('Use App store within provider!');
  return store;
};