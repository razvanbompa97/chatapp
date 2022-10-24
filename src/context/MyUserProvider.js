import { useState } from 'react';

import { MyUserContext } from './myuser-context';
import myUserJSON from '../utils/myUser.json';

const MyUserProvider = (props) => {
  const [user, setUser] = useState(myUserJSON);

  const handleImageChange = (image) => {
    const newUserData = { ...user, image };

    setUser(newUserData);
  };

  return (
    <MyUserContext.Provider
      value={{
        user: {
          name: user.name,
          image: user.image,
          id: user.id,
        },
        changeImage: handleImageChange,
      }}
    >
      {props.children}
    </MyUserContext.Provider>
  );
};

export default MyUserProvider;
