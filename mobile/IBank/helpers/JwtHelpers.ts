import EncryptedStorage from 'react-native-encrypted-storage';
import { constants } from '../config/constants';

export const getUserJwt = async () => {
  const token = await EncryptedStorage.getItem(constants.keys.USER_JWT);

  if (token) {
    return JSON.parse(token).USER_JWT;
  }

  return null;
};
