import { Complaint } from './Complaint';

export interface ComplaintWrapper {
  data: Array<Complaint>;
  page: number;
  size: number;
}
