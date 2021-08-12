import { IDomaineMetier } from '@/shared/model/domaine-metier.model';

export interface IProjet {
  id?: number;
  nom?: string;
  datedebut?: Date;
  nbjourhome?: number;
  domaineMetier?: IDomaineMetier;
}

export class Projet implements IProjet {
  constructor(
    public id?: number,
    public nom?: string,
    public datedebut?: Date,
    public nbjourhome?: number,
    public domaineMetier?: IDomaineMetier
  ) {}
}
