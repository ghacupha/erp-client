import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IPlaceholder, NewPlaceholder } from '../placeholder.model';

export type PartialUpdatePlaceholder = Partial<IPlaceholder> & Pick<IPlaceholder, 'id'>;

export type EntityResponseType = HttpResponse<IPlaceholder>;
export type EntityArrayResponseType = HttpResponse<IPlaceholder[]>;

@Injectable({ providedIn: 'root' })
export class PlaceholderService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/placeholders');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/placeholders');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(placeholder: NewPlaceholder): Observable<EntityResponseType> {
    return this.http.post<IPlaceholder>(this.resourceUrl, placeholder, { observe: 'response' });
  }

  update(placeholder: IPlaceholder): Observable<EntityResponseType> {
    return this.http.put<IPlaceholder>(`${this.resourceUrl}/${this.getPlaceholderIdentifier(placeholder)}`, placeholder, {
      observe: 'response',
    });
  }

  partialUpdate(placeholder: PartialUpdatePlaceholder): Observable<EntityResponseType> {
    return this.http.patch<IPlaceholder>(`${this.resourceUrl}/${this.getPlaceholderIdentifier(placeholder)}`, placeholder, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlaceholder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlaceholder[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlaceholder[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getPlaceholderIdentifier(placeholder: Pick<IPlaceholder, 'id'>): number {
    return placeholder.id;
  }

  comparePlaceholder(o1: Pick<IPlaceholder, 'id'> | null, o2: Pick<IPlaceholder, 'id'> | null): boolean {
    return o1 && o2 ? this.getPlaceholderIdentifier(o1) === this.getPlaceholderIdentifier(o2) : o1 === o2;
  }

  addPlaceholderToCollectionIfMissing<Type extends Pick<IPlaceholder, 'id'>>(
    placeholderCollection: Type[],
    ...placeholdersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const placeholders: Type[] = placeholdersToCheck.filter(isPresent);
    if (placeholders.length > 0) {
      const placeholderCollectionIdentifiers = placeholderCollection.map(
        placeholderItem => this.getPlaceholderIdentifier(placeholderItem)!
      );
      const placeholdersToAdd = placeholders.filter(placeholderItem => {
        const placeholderIdentifier = this.getPlaceholderIdentifier(placeholderItem);
        if (placeholderCollectionIdentifiers.includes(placeholderIdentifier)) {
          return false;
        }
        placeholderCollectionIdentifiers.push(placeholderIdentifier);
        return true;
      });
      return [...placeholdersToAdd, ...placeholderCollection];
    }
    return placeholderCollection;
  }
}
