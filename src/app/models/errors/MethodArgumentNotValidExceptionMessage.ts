import { MethodArgumentNotValidExceptionResponse } from './MethodArgumentNotValidExceptionResponse';

export interface MethodArgumentNotValidExceptionMessage {
  timestamp: string;
  message: string;
  status: number;
  errors: MethodArgumentNotValidExceptionResponse;
}
