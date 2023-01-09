export interface ComplaintRequest {
  uuid: string;
  dateOfEvent: string | null;
  timeOfEvent: string | null;
  placeOfEvent: string;
  nameOfNotifier: string;
  surnameOfNotifier: string;
  peselOfNotifier: string;
  description: string;
  contactToNotifier: string;
}
