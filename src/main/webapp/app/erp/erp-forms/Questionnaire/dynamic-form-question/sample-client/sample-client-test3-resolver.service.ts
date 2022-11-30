import { SampleClientTest3Service } from './sample-client-test3.service';
import { Observable } from 'rxjs';
import { DynamicQuestion } from '../../dynamic-question.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SampleClientTest3ResolverService {
  constructor(private clientT3Service: SampleClientTest3Service) {}

  resolve(): Observable<DynamicQuestion<string>[]> {
    return this.clientT3Service.getQuestionsV3();
  }
}
