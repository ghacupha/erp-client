///
/// Erp System - Mark V No 1 (Ehud Series) Client 1.4.4
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IMessageToken, getMessageTokenIdentifier } from '../message-token.model';

export type EntityResponseType = HttpResponse<IMessageToken>;
export type EntityArrayResponseType = HttpResponse<IMessageToken[]>;

@Injectable({ providedIn: 'root' })
export class MessageTokenService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/message-tokens');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/message-tokens');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(messageToken: IMessageToken): Observable<EntityResponseType> {
    return this.http.post<IMessageToken>(this.resourceUrl, messageToken, { observe: 'response' });
  }

  update(messageToken: IMessageToken): Observable<EntityResponseType> {
    return this.http.put<IMessageToken>(`${this.resourceUrl}/${getMessageTokenIdentifier(messageToken) as number}`, messageToken, {
      observe: 'response',
    });
  }

  partialUpdate(messageToken: IMessageToken): Observable<EntityResponseType> {
    return this.http.patch<IMessageToken>(`${this.resourceUrl}/${getMessageTokenIdentifier(messageToken) as number}`, messageToken, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMessageToken>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMessageToken[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMessageToken[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addMessageTokenToCollectionIfMissing(
    messageTokenCollection: IMessageToken[],
    ...messageTokensToCheck: (IMessageToken | null | undefined)[]
  ): IMessageToken[] {
    const messageTokens: IMessageToken[] = messageTokensToCheck.filter(isPresent);
    if (messageTokens.length > 0) {
      const messageTokenCollectionIdentifiers = messageTokenCollection.map(
        messageTokenItem => getMessageTokenIdentifier(messageTokenItem)!
      );
      const messageTokensToAdd = messageTokens.filter(messageTokenItem => {
        const messageTokenIdentifier = getMessageTokenIdentifier(messageTokenItem);
        if (messageTokenIdentifier == null || messageTokenCollectionIdentifiers.includes(messageTokenIdentifier)) {
          return false;
        }
        messageTokenCollectionIdentifiers.push(messageTokenIdentifier);
        return true;
      });
      return [...messageTokensToAdd, ...messageTokenCollection];
    }
    return messageTokenCollection;
  }
}
