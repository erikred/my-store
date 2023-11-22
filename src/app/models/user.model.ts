export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    role: 'customer' | 'admin';
    avatar?: string;
}

export type CreateUserDTO = Omit<User, 'id' | 'role'>