///
/// Erp System - Mark IX No 2 (Iddo Series) Client 1.6.3
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
import { ITerminalFunctions, getTerminalFunctionsIdentifier } from '../terminal-functions.model';

export type EntityResponseType = HttpResponse<ITerminalFunctions>;
export type EntityArrayResponseType = HttpResponse<ITerminalFunctions[]>;

@Injectable({ providedIn: 'root' })
export class TerminalFunctionsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/terminal-functions');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/terminal-functions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(terminalFunctions: ITerminalFunctions): Observable<EntityResponseType> {
    return this.http.post<ITerminalFunctions>(this.resourceUrl, terminalFunctions, { observe: 'response' });
  }

  update(terminalFunctions: ITerminalFunctions): Observable<EntityResponseType> {
    return this.http.put<ITerminalFunctions>(
      `${this.resourceUrl}/${getTerminalFunctionsIdentifier(terminalFunctions) as number}`,
      terminalFunctions,
      { observe: 'response' }
    );
  }

  partialUpdate(terminalFunctions: ITerminalFunctions): Observable<EntityResponseType> {
    return this.http.patch<ITerminalFunctions>(
      `${this.resourceUrl}/${getTerminalFunctionsIdentifier(terminalFunctions) as number}`,
      terminalFunctions,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITerminalFunctions>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITerminalFunctions[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITerminalFunctions[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addTerminalFunctionsToCollectionIfMissing(
    terminalFunctionsCollection: ITerminalFunctions[],
    ...terminalFunctionsToCheck: (ITerminalFunctions | null | undefined)[]
  ): ITerminalFunctions[] {
    const terminalFunctions: ITerminalFunctions[] = terminalFunctionsToCheck.filter(isPresent);
    if (terminalFunctions.length > 0) {
      const terminalFunctionsCollectionIdentifiers = terminalFunctionsCollection.map(
        terminalFunctionsItem => getTerminalFunctionsIdentifier(terminalFunctionsItem)!
      );
      const terminalFunctionsToAdd = terminalFunctions.filter(terminalFunctionsItem => {
        const terminalFunctionsIdentifier = getTerminalFunctionsIdentifier(terminalFunctionsItem);
        if (terminalFunctionsIdentifier == null || terminalFunctionsCollectionIdentifiers.includes(terminalFunctionsIdentifier)) {
          return false;
        }
        terminalFunctionsCollectionIdentifiers.push(terminalFunctionsIdentifier);
        return true;
      });
      return [...terminalFunctionsToAdd, ...terminalFunctionsCollection];
    }
    return terminalFunctionsCollection;
  }
}
