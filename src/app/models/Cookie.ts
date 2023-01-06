export interface Cookie {
    name: string;
    value: string;
    version: number;
    comment: string;
    domain: string;
    maxAge: number;
    path: string;
    secure: boolean;
    httpOnly: boolean;
  }