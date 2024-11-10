import { useQuery } from '@tanstack/react-query';
import api from '../../api/api';
import todoKeys from '../../utils/todoKeys';

const useFetchTodosQuery = () => {
    return useQuery({
        queryKey: [...todoKeys.todos()],
        queryFn: () => api.ph.getTodos(),
    });
};

export default useFetchTodosQuery;
