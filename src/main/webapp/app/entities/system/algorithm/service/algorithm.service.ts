import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IAlgorithm, NewAlgorithm } from '../algorithm.model';

export type PartialUpdateAlgorithm = Partial<IAlgorithm> & Pick<IAlgorithm, 'id'>;

export type EntityResponseType = HttpResponse<IAlgorithm>;
export type EntityArrayResponseType = HttpResponse<IAlgorithm[]>;

@Injectable({ providedIn: 'root' })
export class AlgorithmService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/algorithms');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/algorithms');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(algorithm: NewAlgorithm): Observable<EntityResponseType> {
    return this.http.post<IAlgorithm>(this.resourceUrl, algorithm, { observe: 'response' });
  }

  update(algorithm: IAlgorithm): Observable<EntityResponseType> {
    return this.http.put<IAlgorithm>(`${this.resourceUrl}/${this.getAlgorithmIdentifier(algorithm)}`, algorithm, { observe: 'response' });
  }

  partialUpdate(algorithm: PartialUpdateAlgorithm): Observable<EntityResponseType> {
    return this.http.patch<IAlgorithm>(`${this.resourceUrl}/${this.getAlgorithmIdentifier(algorithm)}`, algorithm, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAlgorithm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlgorithm[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlgorithm[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getAlgorithmIdentifier(algorithm: Pick<IAlgorithm, 'id'>): number {
    return algorithm.id;
  }

  compareAlgorithm(o1: Pick<IAlgorithm, 'id'> | null, o2: Pick<IAlgorithm, 'id'> | null): boolean {
    return o1 && o2 ? this.getAlgorithmIdentifier(o1) === this.getAlgorithmIdentifier(o2) : o1 === o2;
  }

  addAlgorithmToCollectionIfMissing<Type extends Pick<IAlgorithm, 'id'>>(
    algorithmCollection: Type[],
    ...algorithmsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const algorithms: Type[] = algorithmsToCheck.filter(isPresent);
    if (algorithms.length > 0) {
      const algorithmCollectionIdentifiers = algorithmCollection.map(algorithmItem => this.getAlgorithmIdentifier(algorithmItem)!);
      const algorithmsToAdd = algorithms.filter(algorithmItem => {
        const algorithmIdentifier = this.getAlgorithmIdentifier(algorithmItem);
        if (algorithmCollectionIdentifiers.includes(algorithmIdentifier)) {
          return false;
        }
        algorithmCollectionIdentifiers.push(algorithmIdentifier);
        return true;
      });
      return [...algorithmsToAdd, ...algorithmCollection];
    }
    return algorithmCollection;
  }
}
