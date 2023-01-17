import { CommentResponse } from "../comment/CommentResponse";

export interface FaultDetailsResponse {
uuid: string;
dateOfEvent: string;
placeOfEvent: string;
faultStatus: string;
description: string;
busNumber: string;
createdAt: string;
createdBy: string;
modifiedAt: string;
modifiedBy: string;
comments: Array<CommentResponse>;
}