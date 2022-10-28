import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { BlackContentWrapper } from '../../common/common.styles';
import { getUserJwt } from '../../helpers/jwtHelpers';
import { actionCases } from '../../store/actionCases';
import { Context } from '../../store/store';

const LoadingScreen = ({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) => {
  const { dispatch } = useContext(Context);

  useEffect(() => {
    (async () => {
      const userJwt = await getUserJwt();
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
