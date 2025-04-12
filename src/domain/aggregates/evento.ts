export interface IEvento {
  data: Date;
  titulo: string;
  horario: string;
  ministerio: Ministerios;
}

export enum Ministerios {
  Mulheres,
  Infantil,
  Intercessão,
  Evangelismo,
  Louvor,
  Jovens,
  Geral,
}
