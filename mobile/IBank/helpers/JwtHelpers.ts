import EncryptedStorage from 'react-native-encrypted-storage';
import { constants } from '../config/constants';

export const getUserJwt = async () => EncryptedStorage.getItem(constants.keys.USER_JWT);
