export const enum Secteur {
  ELECTRICITE = 'ELECTRICITE',
  EAU = 'EAU',
  TELECOM = 'TELECOM',
  ENERGIE = 'ENERGIE',
}

export interface IEntreprise {
  id?: number;
  nom?: string;
  secteur?: Secteur;
}

export class Entreprise implements IEntreprise {
  constructor(public id?: number, public nom?: string, public secteur?: Secteur) {}
}
