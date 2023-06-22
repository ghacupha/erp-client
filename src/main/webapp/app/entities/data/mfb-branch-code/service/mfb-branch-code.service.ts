import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IMfbBranchCode, NewMfbBranchCode } from '../mfb-branch-code.model';

export type PartialUpdateMfbBranchCode = Partial<IMfbBranchCode> & Pick<IMfbBranchCode, 'id'>;

export type EntityResponseType = HttpResponse<IMfbBranchCode>;
export type EntityArrayResponseType = HttpResponse<IMfbBranchCode[]>;

@Injectable({ providedIn: 'root' })
export class MfbBranchCodeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/mfb-branch-codes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/mfb-branch-codes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(mfbBranchCode: NewMfbBranchCode): Observable<EntityResponseType> {
    return this.http.post<IMfbBranchCode>(this.resourceUrl, mfbBranchCode, { observe: 'response' });
  }

  update(mfbBranchCode: IMfbBranchCode): Observable<EntityResponseType> {
    return this.http.put<IMfbBranchCode>(`${this.resourceUrl}/${this.getMfbBranchCodeIdentifier(mfbBranchCode)}`, mfbBranchCode, {
      observe: 'response',
    });
  }

  partialUpdate(mfbBranchCode: PartialUpdateMfbBranchCode): Observable<EntityResponseType> {
    return this.http.patch<IMfbBranchCode>(`${this.resourceUrl}/${this.getMfbBranchCodeIdentifier(mfbBranchCode)}`, mfbBranchCode, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMfbBranchCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMfbBranchCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMfbBranchCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getMfbBranchCodeIdentifier(mfbBranchCode: Pick<IMfbBranchCode, 'id'>): number {
    return mfbBranchCode.id;
  }

  compareMfbBranchCode(o1: Pick<IMfbBranchCode, 'id'> | null, o2: Pick<IMfbBranchCode, 'id'> | null): boolean {
    return o1 && o2 ? this.getMfbBranchCodeIdentifier(o1) === this.getMfbBranchCodeIdentifier(o2) : o1 === o2;
  }

  addMfbBranchCodeToCollectionIfMissing<Type extends Pick<IMfbBranchCode, 'id'>>(
    mfbBranchCodeCollection: Type[],
    ...mfbBranchCodesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const mfbBranchCodes: Type[] = mfbBranchCodesToCheck.filter(isPresent);
    if (mfbBranchCodes.length > 0) {
      const mfbBranchCodeCollectionIdentifiers = mfbBranchCodeCollection.map(
        mfbBranchCodeItem => this.getMfbBranchCodeIdentifier(mfbBranchCodeItem)!
      );
      const mfbBranchCodesToAdd = mfbBranchCodes.filter(mfbBranchCodeItem => {
        const mfbBranchCodeIdentifier = this.getMfbBranchCodeIdentifier(mfbBranchCodeItem);
        if (mfbBranchCodeCollectionIdentifiers.includes(mfbBranchCodeIdentifier)) {
          return false;
        }
        mfbBranchCodeCollectionIdentifiers.push(mfbBranchCodeIdentifier);
        return true;
      });
      return [...mfbBranchCodesToAdd, ...mfbBranchCodeCollection];
    }
    return mfbBranchCodeCollection;
  }
}
