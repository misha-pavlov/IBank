import { useQuery } from '@apollo/client';
import { GET_USER } from '../gql/user.queries';
import { ApolloFetchPolicy } from '../types/apollo';

const useGetUser = () => {
  const { data, loading } = useQuery(GET_USER, {
    pollInterval: 5000,
    fetchPolicy: ApolloFetchPolicy.CacheAndNetwork,
  });

  return { user: data?.GetUser, loading };
};

export default useGetUser;
