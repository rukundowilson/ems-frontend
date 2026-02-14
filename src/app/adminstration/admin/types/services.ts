export interface Service {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateServicePayload = {
  title: string;
  slug: string;
  description: string;
};
