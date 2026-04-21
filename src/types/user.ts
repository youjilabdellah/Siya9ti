export type UserInfo = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    token: string;
};

export type LogoutResponse = {
    message: string;
};
