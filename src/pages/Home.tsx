import useFetchTodosQuery from '../hooks/queries/useFetchTodos';
import { Todo } from '../types/todo.type';

const Home = () => {
    const { isPending, data: todos } = useFetchTodosQuery();

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
