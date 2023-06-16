import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IContractMetadata, NewContractMetadata } from '../contract-metadata.model';

export type PartialUpdateContractMetadata = Partial<IContractMetadata> & Pick<IContractMetadata, 'id'>;

type RestOf<T extends IContractMetadata | NewContractMetadata> = Omit<T, 'startDate' | 'terminationDate'> & {
  startDate?: string | null;
  terminationDate?: string | null;
};

export type RestContractMetadata = RestOf<IContractMetadata>;

export type NewRestContractMetadata = RestOf<NewContractMetadata>;

export type PartialUpdateRestContractMetadata = RestOf<PartialUpdateContractMetadata>;

export type EntityResponseType = HttpResponse<IContractMetadata>;
export type EntityArrayResponseType = HttpResponse<IContractMetadata[]>;

@Injectable({ providedIn: 'root' })
export class ContractMetadataService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/contract-metadata');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/contract-metadata');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(contractMetadata: NewContractMetadata): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contractMetadata);
    return this.http
      .post<RestContractMetadata>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(contractMetadata: IContractMetadata): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contractMetadata);
    return this.http
      .put<RestContractMetadata>(`${this.resourceUrl}/${this.getContractMetadataIdentifier(contractMetadata)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(contractMetadata: PartialUpdateContractMetadata): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contractMetadata);
    return this.http
      .patch<RestContractMetadata>(`${this.resourceUrl}/${this.getContractMetadataIdentifier(contractMetadata)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestContractMetadata>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestContractMetadata[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestContractMetadata[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getContractMetadataIdentifier(contractMetadata: Pick<IContractMetadata, 'id'>): number {
    return contractMetadata.id;
  }

  compareContractMetadata(o1: Pick<IContractMetadata, 'id'> | null, o2: Pick<IContractMetadata, 'id'> | null): boolean {
    return o1 && o2 ? this.getContractMetadataIdentifier(o1) === this.getContractMetadataIdentifier(o2) : o1 === o2;
  }

  addContractMetadataToCollectionIfMissing<Type extends Pick<IContractMetadata, 'id'>>(
    contractMetadataCollection: Type[],
    ...contractMetadataToCheck: (Type | null | undefined)[]
  ): Type[] {
    const contractMetadata: Type[] = contractMetadataToCheck.filter(isPresent);
    if (contractMetadata.length > 0) {
      const contractMetadataCollectionIdentifiers = contractMetadataCollection.map(
        contractMetadataItem => this.getContractMetadataIdentifier(contractMetadataItem)!
      );
      const contractMetadataToAdd = contractMetadata.filter(contractMetadataItem => {
        const contractMetadataIdentifier = this.getContractMetadataIdentifier(contractMetadataItem);
        if (contractMetadataCollectionIdentifiers.includes(contractMetadataIdentifier)) {
          return false;
        }
        contractMetadataCollectionIdentifiers.push(contractMetadataIdentifier);
        return true;
      });
      return [...contractMetadataToAdd, ...contractMetadataCollection];
    }
    return contractMetadataCollection;
  }

  protected convertDateFromClient<T extends IContractMetadata | NewContractMetadata | PartialUpdateContractMetadata>(
    contractMetadata: T
  ): RestOf<T> {
    return {
      ...contractMetadata,
      startDate: contractMetadata.startDate?.format(DATE_FORMAT) ?? null,
      terminationDate: contractMetadata.terminationDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restContractMetadata: RestContractMetadata): IContractMetadata {
    return {
      ...restContractMetadata,
      startDate: restContractMetadata.startDate ? dayjs(restContractMetadata.startDate) : undefined,
      terminationDate: restContractMetadata.terminationDate ? dayjs(restContractMetadata.terminationDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestContractMetadata>): HttpResponse<IContractMetadata> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestContractMetadata[]>): HttpResponse<IContractMetadata[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
