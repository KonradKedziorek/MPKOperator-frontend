export interface FaultRequest {
  uuid: string;
  dateOfEvent: string | null;
  timeOfEvent: string | null;
  placeOfEvent: string;
  description: string;
  busNumber: string;
}