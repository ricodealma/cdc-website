export interface IEvento {
  id: number; 
  dataHora: Date; 
  titulo: string; 
  ministerio: Ministerios; 
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
