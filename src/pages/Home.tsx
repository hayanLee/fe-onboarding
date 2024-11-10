import Loading from '../components/Loading';
import { useFetchTodosQuery } from '../hooks/queries';
import { Todo } from '../types/todo.type';

const Home = () => {
    const { isPending, data: todos } = useFetchTodosQuery();

    if (isPending) return <Loading />;

    return (
        <div>
            <ul>
                {todos?.map((todo: Todo) => (
                    <li key={todo.id} className='flex items-center'>
                        {todo.completed ? (
                            <div className='w-4 h-4 bg-blue-500 rounded-full'></div>
                        ) : (
                            <div className='w-4 h-4 border border-gray-500 rounded-full'></div>
                        )}

                        <p className='ml-2'>{todo.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
