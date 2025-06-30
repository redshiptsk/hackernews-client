import { createContext, useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { newsStore, type INewsStore } from './NewsStore';

const AppStoreContext = createContext<INewsStore | null>(null);

export const AppStoreProvider = observer(({ children }: { children: React.ReactNode }) => {
  const store = useLocalObservable(() => newsStore());
  return <AppStoreContext.Provider value={store}>{children}</AppStoreContext.Provider>;
});

export const useAppStore = (): INewsStore => {
  const store = useContext(AppStoreContext);
  if (!store) throw new Error('useAppStore must be used within AppStoreProvider');
  return store;
};