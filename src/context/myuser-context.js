import { createContext } from 'react';

export const MyUserContext = createContext({
  user: { id: null, name: null, image: null },
  changeImage: (image) => {},
});
