import { createContext } from 'react';

interface IContext {
  userName: string | null;
}
const AppContext = createContext<IContext>({
  userName: null
});

export default AppContext;
