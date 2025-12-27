export interface ILeader {
  id: number;
  name: string;
  role: string;
  photoUrl?: string;
  email?: string;
  phone?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}