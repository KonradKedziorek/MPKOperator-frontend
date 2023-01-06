export interface AuthResponse{
    token: string;
    refreshToken: string;
    type:string;
    username:string;
    roles:Array<String>;
}