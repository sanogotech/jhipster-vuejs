import { IEntreprise } from '@/shared/model/entreprise.model';

export interface IDomaineMetier {
  id?: number;
  nom?: string;
  entreprise?: IEntreprise;
}

export class DomaineMetier implements IDomaineMetier {
  constructor(public id?: number, public nom?: string, public entreprise?: IEntreprise) {}
}
