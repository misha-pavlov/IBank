import { useCallback, useContext } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { constants } from '../config/constants';
import { actionCases } from '../store/actionCases';
import { Context } from '../store/store';

const useUserLoggedIn = () => {
  const { dispatch, state } = useContext(Context);

  const isUserLoggedIn = state.isUserLoggedIn;

  const setUserAsLoggedIn = useCallback(
    async (newUserJwt?: string) => {
      if (newUserJwt) {
        await EncryptedStorage.setItem(constants.keys.USER_JWT, JSON.stringify({ USER_JWT: newUserJwt }));
        dispatch({ type: actionCases.IS_USER_LOGGED_IN, payload: true });
      }
    },
    [dispatch],
  );

  const logOut = useCallback(async () => {
    await EncryptedStorage.removeItem(constants.keys.USER_JWT);
    dispatch({ type: actionCases.IS_USER_LOGGED_IN, payload: false });
  }, [dispatch]);

  return { isUserLoggedIn, setUserAsLoggedIn, logOut };
};

export default useUserLoggedIn;
