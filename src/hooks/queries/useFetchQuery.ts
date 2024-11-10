import { useQuery } from '@tanstack/react-query';
import api from '../../api/api';

const useFetchQuery = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => api.auth.fetchUser(),
    });
};
export default useFetchQuery;
