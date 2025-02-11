export default interface Event {
  _id?: string;
  name: string;
  description: string;
  date: Date;
  location: string;
  imageUrl: string;
  creatorId?: string;
  type?: string;
}

export interface AddEventInterface {
  name: string;
  description: string;
  date: Date;
  location: string;
  city?: string;
  zip_code?: string;
  imageUrl: string;
  creatorId?: string;
  type?: string;
}
