import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { BlackContentWrapper } from '../../common/common.styles';
import { constants } from '../../config/constants';
import { actionCases } from '../../store/actionCases';
import { Context } from '../../store/store';

const LoadingScreen = ({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) => {
  const { dispatch } = useContext(Context);

  useEffect(() => {
    (async () => {
      const userJwt = await EncryptedStorage.getItem(constants.keys.USER_JWT);
      dispatch({ type: actionCases.IS_USER_LOGGED_IN, payload: !!userJwt });
      setLoading(false);
    })();
  }, [dispatch, setLoading]);

  return (
    <BlackContentWrapper justifyContent="center" alignItems="center">
      <ActivityIndicator />
    </BlackContentWrapper>
  );
};

export default LoadingScreen;
