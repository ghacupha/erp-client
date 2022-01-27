import { Injectable } from '@angular/core';
import { ErpCommonModule } from '../erp-common.module';
import { ASC, DESC } from '../../../config/pagination.constants';
import { createRequestOption } from '../../../core/request/request-util';
import { Observable, of } from 'rxjs';
import { ApplicationConfigService } from '../../../core/config/application-config.service';
import { HttpClient } from '@angular/common/http';
import { IDealer } from '../models/dealer.model';

@Injectable({ providedIn: ErpCommonModule })
export class DealerSuggestionService {

  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/dealers');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
  }


  search(searchText: string): Observable<IDealer[]> {

    if (searchText === "") {
      return of([])
    }

    return this.http.get<IDealer[]>(
      this.resourceSearchUrl,
      { params: createRequestOption({
          query: searchText,
          page: 0,
          size: 10,
          sort: this.sort(),})}
    );
  }

  sort(): string[] {
    const predicate = 'id';
    const ascending = true;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const result = [predicate + ',' + (ascending ? ASC : DESC)];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
}
