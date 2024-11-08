import { useQuery } from '@tanstack/react-query';
import api from '../api/api';
import { Todo } from '../types/todo.type';
import todoKeys from '../utils/todoKeys';

const Home = () => {
    const { isPending, data: todos } = useQuery({
        queryKey: [...todoKeys.todos()],
        queryFn: () => api.ph.getTodos(),
    });

    if (isPending) return <p>Loading...</p>;

    return (
        <div>
            <ul>
                {todos?.map((todo: Todo) => (
                    <li key={todo.id} className='flex'>
                        <input type='checkbox' checked={todo.completed} />
                        <p className='ml-2'>{todo.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
