import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Observable } from 'rxjs';
import { IApplicationStatus } from './application-status.model';

export type EntityResponseType = HttpResponse<IApplicationStatus>;

/**
 * Fetch server application status
 */
@Injectable({ providedIn: 'root' })
export class ApplicationStatusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/app/application-status');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {
  }

  fetch(): Observable<EntityResponseType> {
    return this.http.get<IApplicationStatus>(`${this.resourceUrl}`, { observe: 'response' });
  }
}
