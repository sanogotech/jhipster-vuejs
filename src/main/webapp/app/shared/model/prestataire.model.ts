export interface IPrestataire {
  id?: number;
  nom?: string;
  commune?: string;
}

export class Prestataire implements IPrestataire {
  constructor(public id?: number, public nom?: string, public commune?: string) {}
}
