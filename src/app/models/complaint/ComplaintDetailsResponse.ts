import { CommentResponse } from '../comment/CommentResponse';

export interface ComplaintDetailsResponse {
  uuid: string;
  dateOfEvent: string;
  placeOfEvent: string;
  nameOfNotifier: string;
  surnameOfNotifier: string;
  peselOfNotifier: string;
  complaintStatus: string;
  description: string;
  contactToNotifier: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  comments: Array<CommentResponse>;
}
