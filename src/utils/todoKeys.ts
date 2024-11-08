const todoKeys = {
    all: ['todos'] as const,
    todos: () => [...todoKeys.all, 'list'] as const,
    todo: (id: string) => [...todoKeys.all, id] as const,
};

export default todoKeys;
