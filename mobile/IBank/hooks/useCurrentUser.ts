import { useQuery } from '@apollo/client';
import { GET_USER } from '../gql/user.queries';
import { ApolloFetchPolicy } from '../types/apollo';
import { TCard } from '../types/card';
import { TUser } from '../types/user';

const useCurrentUser = (): { user?: TUser; savedCardsIds: string[]; loading: boolean } => {
  const { data, loading } = useQuery(GET_USER, {
    pollInterval: 2500,
    fetchPolicy: ApolloFetchPolicy.CacheAndNetwork,
    onError: err => console.error('GET_USER = ', err),
  });

  const savedCardsIds = data?.getUser?.savedCards?.map((card: TCard) => card._id);

  return { user: data?.getUser || {}, savedCardsIds, loading };
};

export default useCurrentUser;
