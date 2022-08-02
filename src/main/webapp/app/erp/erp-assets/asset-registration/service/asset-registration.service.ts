import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IAssetRegistration, getAssetRegistrationIdentifier } from '../asset-registration.model';

export type EntityResponseType = HttpResponse<IAssetRegistration>;
export type EntityArrayResponseType = HttpResponse<IAssetRegistration[]>;

@Injectable({ providedIn: 'root' })
export class AssetRegistrationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fixed-asset/asset-registrations');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/fixed-asset/_search/asset-registrations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(assetRegistration: IAssetRegistration): Observable<EntityResponseType> {
    return this.http.post<IAssetRegistration>(this.resourceUrl, assetRegistration, { observe: 'response' });
  }

  update(assetRegistration: IAssetRegistration): Observable<EntityResponseType> {
    return this.http.put<IAssetRegistration>(
      `${this.resourceUrl}/${getAssetRegistrationIdentifier(assetRegistration) as number}`,
      assetRegistration,
      { observe: 'response' }
    );
  }

  partialUpdate(assetRegistration: IAssetRegistration): Observable<EntityResponseType> {
    return this.http.patch<IAssetRegistration>(
      `${this.resourceUrl}/${getAssetRegistrationIdentifier(assetRegistration) as number}`,
      assetRegistration,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAssetRegistration>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAssetRegistration[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAssetRegistration[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addAssetRegistrationToCollectionIfMissing(
    assetRegistrationCollection: IAssetRegistration[],
    ...assetRegistrationsToCheck: (IAssetRegistration | null | undefined)[]
  ): IAssetRegistration[] {
    const assetRegistrations: IAssetRegistration[] = assetRegistrationsToCheck.filter(isPresent);
    if (assetRegistrations.length > 0) {
      const assetRegistrationCollectionIdentifiers = assetRegistrationCollection.map(
        assetRegistrationItem => getAssetRegistrationIdentifier(assetRegistrationItem)!
      );
      const assetRegistrationsToAdd = assetRegistrations.filter(assetRegistrationItem => {
        const assetRegistrationIdentifier = getAssetRegistrationIdentifier(assetRegistrationItem);
        if (assetRegistrationIdentifier == null || assetRegistrationCollectionIdentifiers.includes(assetRegistrationIdentifier)) {
          return false;
        }
        assetRegistrationCollectionIdentifiers.push(assetRegistrationIdentifier);
        return true;
      });
      return [...assetRegistrationsToAdd, ...assetRegistrationCollection];
    }
    return assetRegistrationCollection;
  }
}
