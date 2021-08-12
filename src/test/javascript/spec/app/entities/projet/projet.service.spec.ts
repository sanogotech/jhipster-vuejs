/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_TIME_FORMAT } from '@/shared/date/filters';
import ProjetService from '@/entities/projet/projet.service';
import { Projet } from '@/shared/model/projet.model';

const mockedAxios: any = axios;
const error = {
  response: {
    status: null,
    data: {
      type: null,
    },
  },
};

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe('Service Tests', () => {
  describe('Projet Service', () => {
    let service: ProjetService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new ProjetService();
      currentDate = new Date();

      elemDefault = new Projet(0, 'AAAAAAA', currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            datedebut: format(currentDate, DATE_TIME_FORMAT),
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should not find an element', async () => {
        mockedAxios.get.mockReturnValue(Promise.reject(error));
        return service
          .find(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should create a Projet', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            datedebut: format(currentDate, DATE_TIME_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            datedebut: currentDate,
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a Projet', async () => {
        mockedAxios.post.mockReturnValue(Promise.reject(error));

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a Projet', async () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            datedebut: format(currentDate, DATE_TIME_FORMAT),
            nbjourhome: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datedebut: currentDate,
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a Projet', async () => {
        mockedAxios.put.mockReturnValue(Promise.reject(error));

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of Projet', async () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            datedebut: format(currentDate, DATE_TIME_FORMAT),
            nbjourhome: 1,
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            datedebut: currentDate,
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of Projet', async () => {
        mockedAxios.get.mockReturnValue(Promise.reject(error));

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a Projet', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a Projet', async () => {
        mockedAxios.delete.mockReturnValue(Promise.reject(error));

        return service
          .delete(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });
    });
  });
});
