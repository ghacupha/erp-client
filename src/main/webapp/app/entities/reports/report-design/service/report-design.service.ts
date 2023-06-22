import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IReportDesign, NewReportDesign } from '../report-design.model';

export type PartialUpdateReportDesign = Partial<IReportDesign> & Pick<IReportDesign, 'id'>;

export type EntityResponseType = HttpResponse<IReportDesign>;
export type EntityArrayResponseType = HttpResponse<IReportDesign[]>;

@Injectable({ providedIn: 'root' })
export class ReportDesignService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/report-designs');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/report-designs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(reportDesign: NewReportDesign): Observable<EntityResponseType> {
    return this.http.post<IReportDesign>(this.resourceUrl, reportDesign, { observe: 'response' });
  }

  update(reportDesign: IReportDesign): Observable<EntityResponseType> {
    return this.http.put<IReportDesign>(`${this.resourceUrl}/${this.getReportDesignIdentifier(reportDesign)}`, reportDesign, {
      observe: 'response',
    });
  }

  partialUpdate(reportDesign: PartialUpdateReportDesign): Observable<EntityResponseType> {
    return this.http.patch<IReportDesign>(`${this.resourceUrl}/${this.getReportDesignIdentifier(reportDesign)}`, reportDesign, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReportDesign>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReportDesign[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReportDesign[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getReportDesignIdentifier(reportDesign: Pick<IReportDesign, 'id'>): number {
    return reportDesign.id;
  }

  compareReportDesign(o1: Pick<IReportDesign, 'id'> | null, o2: Pick<IReportDesign, 'id'> | null): boolean {
    return o1 && o2 ? this.getReportDesignIdentifier(o1) === this.getReportDesignIdentifier(o2) : o1 === o2;
  }

  addReportDesignToCollectionIfMissing<Type extends Pick<IReportDesign, 'id'>>(
    reportDesignCollection: Type[],
    ...reportDesignsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const reportDesigns: Type[] = reportDesignsToCheck.filter(isPresent);
    if (reportDesigns.length > 0) {
      const reportDesignCollectionIdentifiers = reportDesignCollection.map(
        reportDesignItem => this.getReportDesignIdentifier(reportDesignItem)!
      );
      const reportDesignsToAdd = reportDesigns.filter(reportDesignItem => {
        const reportDesignIdentifier = this.getReportDesignIdentifier(reportDesignItem);
        if (reportDesignCollectionIdentifiers.includes(reportDesignIdentifier)) {
          return false;
        }
        reportDesignCollectionIdentifiers.push(reportDesignIdentifier);
        return true;
      });
      return [...reportDesignsToAdd, ...reportDesignCollection];
    }
    return reportDesignCollection;
  }
}
