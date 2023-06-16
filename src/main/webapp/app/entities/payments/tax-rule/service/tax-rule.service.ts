import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ITaxRule, NewTaxRule } from '../tax-rule.model';

export type PartialUpdateTaxRule = Partial<ITaxRule> & Pick<ITaxRule, 'id'>;

export type EntityResponseType = HttpResponse<ITaxRule>;
export type EntityArrayResponseType = HttpResponse<ITaxRule[]>;

@Injectable({ providedIn: 'root' })
export class TaxRuleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tax-rules');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/tax-rules');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(taxRule: NewTaxRule): Observable<EntityResponseType> {
    return this.http.post<ITaxRule>(this.resourceUrl, taxRule, { observe: 'response' });
  }

  update(taxRule: ITaxRule): Observable<EntityResponseType> {
    return this.http.put<ITaxRule>(`${this.resourceUrl}/${this.getTaxRuleIdentifier(taxRule)}`, taxRule, { observe: 'response' });
  }

  partialUpdate(taxRule: PartialUpdateTaxRule): Observable<EntityResponseType> {
    return this.http.patch<ITaxRule>(`${this.resourceUrl}/${this.getTaxRuleIdentifier(taxRule)}`, taxRule, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaxRule>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaxRule[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaxRule[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getTaxRuleIdentifier(taxRule: Pick<ITaxRule, 'id'>): number {
    return taxRule.id;
  }

  compareTaxRule(o1: Pick<ITaxRule, 'id'> | null, o2: Pick<ITaxRule, 'id'> | null): boolean {
    return o1 && o2 ? this.getTaxRuleIdentifier(o1) === this.getTaxRuleIdentifier(o2) : o1 === o2;
  }

  addTaxRuleToCollectionIfMissing<Type extends Pick<ITaxRule, 'id'>>(
    taxRuleCollection: Type[],
    ...taxRulesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const taxRules: Type[] = taxRulesToCheck.filter(isPresent);
    if (taxRules.length > 0) {
      const taxRuleCollectionIdentifiers = taxRuleCollection.map(taxRuleItem => this.getTaxRuleIdentifier(taxRuleItem)!);
      const taxRulesToAdd = taxRules.filter(taxRuleItem => {
        const taxRuleIdentifier = this.getTaxRuleIdentifier(taxRuleItem);
        if (taxRuleCollectionIdentifiers.includes(taxRuleIdentifier)) {
          return false;
        }
        taxRuleCollectionIdentifiers.push(taxRuleIdentifier);
        return true;
      });
      return [...taxRulesToAdd, ...taxRuleCollection];
    }
    return taxRuleCollection;
  }
}
