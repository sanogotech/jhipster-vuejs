import { IProjet } from '@/shared/model/projet.model';
import { IConsultant } from '@/shared/model/consultant.model';

export interface ILigneAffectation {
  id?: number;
  typeAffectation?: string;
  nbjourhome?: number;
  projet?: IProjet;
  consultant?: IConsultant;
}

export class LigneAffectation implements ILigneAffectation {
  constructor(
    public id?: number,
    public typeAffectation?: string,
    public nbjourhome?: number,
    public projet?: IProjet,
    public consultant?: IConsultant
  ) {}
}
