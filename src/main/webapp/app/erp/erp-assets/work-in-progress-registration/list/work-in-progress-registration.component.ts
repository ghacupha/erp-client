///
/// Erp System - Mark X No 9 (Jehoiada Series) Client 1.7.7
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

import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWorkInProgressRegistration } from '../work-in-progress-registration.model';

import { ASC, DESC, ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { ParseLinks } from 'app/core/util/parse-links.service';
import { WorkInProgressRegistrationService } from '../service/work-in-progress-registration.service';
import { WorkInProgressRegistrationDeleteDialogComponent } from '../delete/work-in-progress-registration-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';
import { Store } from '@ngrx/store';
import { State } from '../../../store/global-store.definition';
import {
  wipRegistrationCopyWorkflowInitiatedFromList,
  wipRegistrationCreationWorkflowInitiatedFromList,
  wipRegistrationEditWorkflowInitiatedFromList, wipRegistrationEditWorkflowInitiatedFromView
} from '../../../store/actions/wip-registration-update-status.actions';

@Component({
  selector: 'jhi-work-in-progress-registration',
  templateUrl: './work-in-progress-registration.component.html',
})
export class WorkInProgressRegistrationComponent implements OnInit {
  workInProgressRegistrations: IWorkInProgressRegistration[];
  isLoading = false;
  itemsPerPage: number;
  links: { [key: string]: number };
  page: number;
  predicate: string;
  ascending: boolean;
  currentSearch: string;

  constructor(
    protected workInProgressRegistrationService: WorkInProgressRegistrationService,
    protected activatedRoute: ActivatedRoute,
    protected dataUtils: DataUtils,
    protected router: Router,
    protected parseLinks: ParseLinks,
    protected modalService: NgbModal,
    protected store: Store<State>,
  ) {
    this.workInProgressRegistrations = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
    this.currentSearch = this.activatedRoute.snapshot.queryParams['search'] ?? '';
  }

  createButtonEvent(): void {
    this.store.dispatch(wipRegistrationCreationWorkflowInitiatedFromList())
  }

  copyButtonEvent(instance: IWorkInProgressRegistration): void {
    this.store.dispatch(wipRegistrationCopyWorkflowInitiatedFromList({ copiedInstance: instance }));
  }

  editButtonEvent(instance: IWorkInProgressRegistration): void {
    this.store.dispatch(wipRegistrationEditWorkflowInitiatedFromList({editedInstance: instance}));
  }

  loadAll(): void {
    this.isLoading = true;
    if (this.currentSearch) {
      this.workInProgressRegistrationService
        .search({
          query: this.currentSearch,
          page: this.page,
          size: this.itemsPerPage,
          sort: this.sort(),
        })
        .subscribe(
          (res: HttpResponse<IWorkInProgressRegistration[]>) => {
            this.isLoading = false;
            this.paginateWorkInProgressRegistrations(res.body, res.headers);
          },
          () => {
            this.isLoading = false;
          }
        );
      return;
    }

    this.workInProgressRegistrationService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IWorkInProgressRegistration[]>) => {
          this.isLoading = false;
          this.paginateWorkInProgressRegistrations(res.body, res.headers);
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  reset(): void {
    this.page = 0;
    this.workInProgressRegistrations = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  search(query: string): void {
    this.workInProgressRegistrations = [];
    this.links = {
      last: 0,
    };
    this.page = 0;
    if (query && ['sequenceNumber', 'particulars', 'comments'].includes(this.predicate)) {
      this.predicate = 'id';
      this.ascending = true;
    }
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IWorkInProgressRegistration): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(workInProgressRegistration: IWorkInProgressRegistration): void {
    const modalRef = this.modalService.open(WorkInProgressRegistrationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.workInProgressRegistration = workInProgressRegistration;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.reset();
      }
    });
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateWorkInProgressRegistrations(data: IWorkInProgressRegistration[] | null, headers: HttpHeaders): void {
    const linkHeader = headers.get('link');
    if (linkHeader) {
      this.links = this.parseLinks.parse(linkHeader);
    } else {
      this.links = {
        last: 0,
      };
    }
    if (data) {
      for (const d of data) {
        this.workInProgressRegistrations.push(d);
      }
    }
  }
}
