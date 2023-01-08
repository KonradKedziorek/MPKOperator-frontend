import { CommentResponse } from './CommentResponse';

export interface CommentReply {
  complaintUuid: string;
  commentResponseList: Array<CommentResponse>;
}
