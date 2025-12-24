export interface IEvento {
  id: number;
  dataHora: Date;
  titulo: string;
  descricao?: string;
  ministerioId: number;
  ministerio?: any; // ToDo: Definir interface IMinisterio se necessário
  createdAt?: Date;
  updatedAt?: Date;
}

export enum Ministerios {
  Geral = 1,
  Intercessao,
  Mulheres,
  Infantil,
  Evangelismo,
  Midia,
  Louvor,
  Jovens
}
