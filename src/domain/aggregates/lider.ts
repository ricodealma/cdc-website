export interface ILider {
  id: number;
  nome: string;
  role: string;
  fotoUrl?: string;
  email?: string;
  telefone?: string;
  ativo?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}