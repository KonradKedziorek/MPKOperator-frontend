export interface UpdateUsersPasswordRequest {
    oldPassword: string;
    newPassword: string;
    repeatNewPassword: string;
}