export type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

export type SignUpInfo = {
    id: string;
    password: string;
    nickname: string;
};

export type LoginInfo = Omit<SignUpInfo, 'nickname'>;
