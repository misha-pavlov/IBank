import { useQuery } from '@apollo/client';
import { GET_USER } from '../gql/user.queries';
import { ApolloFetchPolicy } from '../types/apollo';
import { TUser } from '../types/user';

const useCurrentUser = (): { user?: TUser; loading: boolean } => {
  const { data, loading } = useQuery(GET_USER, {
    pollInterval: 2500,
    fetchPolicy: ApolloFetchPolicy.CacheAndNetwork,
  });

  return { user: data?.getUser || {}, loading };
};

export default useCurrentUser;
