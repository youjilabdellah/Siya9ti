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

export type ResetPasswordRequest = {
    email: string;
};

export type ResetPasswordResponse = {
    message: string;
};

export type ConfirmPasswordResetRequest = {
    resetToken: string;
    newPassword: string;
};

export type ConfirmPasswordResetResponse = {
    message: string;
};
