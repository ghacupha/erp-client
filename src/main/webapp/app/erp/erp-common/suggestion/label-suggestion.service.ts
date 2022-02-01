import { Injectable } from '@angular/core';
import { ErpCommonModule } from '../erp-common.module';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from '../../../core/config/application-config.service';
import { Observable, of } from 'rxjs';
import { createRequestOption } from '../../../core/request/request-util';
import { ASC, DESC } from '../../../config/pagination.constants';
import { IPaymentLabel } from '../models/payment-label.model';

@Injectable({ providedIn: ErpCommonModule })
export class LabelSuggestionService {

  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/payment-labels');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
  }


  search(searchText: string): Observable<IPaymentLabel[]> {

    if (searchText === "") {
      return of([])
    }

    return this.http.get<IPaymentLabel[]>(
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
