///
/// Erp System - Mark VI No 2 (Phoebe Series) Client 1.5.3
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
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWorkInProgressTransfer } from '../work-in-progress-transfer.model';

import { ParseLinks } from 'app/core/util/parse-links.service';
import { ASC, DESC, ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { WorkInProgressTransferService } from '../service/work-in-progress-transfer.service';
import { WorkInProgressTransferDeleteDialogComponent } from '../delete/work-in-progress-transfer-delete-dialog.component';

@Component({
  selector: 'jhi-work-in-progress-transfer',
  templateUrl: './work-in-progress-transfer.component.html',
})
export class WorkInProgressTransferComponent implements OnInit {
  workInProgressTransfers: IWorkInProgressTransfer[];
  isLoading = false;
  itemsPerPage: number;
  links: { [key: string]: number };
  page: number;
  predicate: string;
  ascending: boolean;
  currentSearch: string;

  constructor(
    protected workInProgressTransferService: WorkInProgressTransferService,
    protected modalService: NgbModal,
    protected parseLinks: ParseLinks,
    protected activatedRoute: ActivatedRoute
  ) {
    this.workInProgressTransfers = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
    this.currentSearch = this.activatedRoute.snapshot.queryParams['search'] ?? '';
  }

  loadAll(): void {
    this.isLoading = true;
    if (this.currentSearch) {
      this.workInProgressTransferService
        .search({
          query: this.currentSearch,
          page: this.page,
          size: this.itemsPerPage,
          sort: this.sort(),
        })
        .subscribe(
          (res: HttpResponse<IWorkInProgressTransfer[]>) => {
            this.isLoading = false;
            this.paginateWorkInProgressTransfers(res.body, res.headers);
          },
          () => {
            this.isLoading = false;
          }
        );
      return;
    }

    this.workInProgressTransferService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IWorkInProgressTransfer[]>) => {
          this.isLoading = false;
          this.paginateWorkInProgressTransfers(res.body, res.headers);
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  reset(): void {
    this.page = 0;
    this.workInProgressTransfers = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  search(query: string): void {
    this.workInProgressTransfers = [];
    this.links = {
      last: 0,
    };
    this.page = 0;
    if (query && ['description', 'targetAssetNumber', 'transferType'].includes(this.predicate)) {
      this.predicate = 'id';
      this.ascending = true;
    }
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IWorkInProgressTransfer): number {
    return item.id!;
  }

  delete(workInProgressTransfer: IWorkInProgressTransfer): void {
    const modalRef = this.modalService.open(WorkInProgressTransferDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.workInProgressTransfer = workInProgressTransfer;
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

  protected paginateWorkInProgressTransfers(data: IWorkInProgressTransfer[] | null, headers: HttpHeaders): void {
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
        this.workInProgressTransfers.push(d);
      }
    }
  }
}
