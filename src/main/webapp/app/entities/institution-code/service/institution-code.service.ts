import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IInstitutionCode, getInstitutionCodeIdentifier } from '../institution-code.model';

export type EntityResponseType = HttpResponse<IInstitutionCode>;
export type EntityArrayResponseType = HttpResponse<IInstitutionCode[]>;

@Injectable({ providedIn: 'root' })
export class InstitutionCodeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/institution-codes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/institution-codes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(institutionCode: IInstitutionCode): Observable<EntityResponseType> {
    return this.http.post<IInstitutionCode>(this.resourceUrl, institutionCode, { observe: 'response' });
  }

  update(institutionCode: IInstitutionCode): Observable<EntityResponseType> {
    return this.http.put<IInstitutionCode>(
      `${this.resourceUrl}/${getInstitutionCodeIdentifier(institutionCode) as number}`,
      institutionCode,
      { observe: 'response' }
    );
  }

  partialUpdate(institutionCode: IInstitutionCode): Observable<EntityResponseType> {
    return this.http.patch<IInstitutionCode>(
      `${this.resourceUrl}/${getInstitutionCodeIdentifier(institutionCode) as number}`,
      institutionCode,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInstitutionCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInstitutionCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInstitutionCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addInstitutionCodeToCollectionIfMissing(
    institutionCodeCollection: IInstitutionCode[],
    ...institutionCodesToCheck: (IInstitutionCode | null | undefined)[]
  ): IInstitutionCode[] {
    const institutionCodes: IInstitutionCode[] = institutionCodesToCheck.filter(isPresent);
    if (institutionCodes.length > 0) {
      const institutionCodeCollectionIdentifiers = institutionCodeCollection.map(
        institutionCodeItem => getInstitutionCodeIdentifier(institutionCodeItem)!
      );
      const institutionCodesToAdd = institutionCodes.filter(institutionCodeItem => {
        const institutionCodeIdentifier = getInstitutionCodeIdentifier(institutionCodeItem);
        if (institutionCodeIdentifier == null || institutionCodeCollectionIdentifiers.includes(institutionCodeIdentifier)) {
          return false;
        }
        institutionCodeCollectionIdentifiers.push(institutionCodeIdentifier);
        return true;
      });
      return [...institutionCodesToAdd, ...institutionCodeCollection];
    }
    return institutionCodeCollection;
  }
}
