import { IPrestataire } from '@/shared/model/prestataire.model';

export interface IConsultant {
  id?: number;
  nom?: string;
  matricule?: string;
  email?: string;
  prenom?: string;
  disponibiliteMax?: number;
  prestataire?: IPrestataire;
}

export class Consultant implements IConsultant {
  constructor(
    public id?: number,
    public nom?: string,
    public matricule?: string,
    public email?: string,
    public prenom?: string,
    public disponibiliteMax?: number,
    public prestataire?: IPrestataire
  ) {}
}
