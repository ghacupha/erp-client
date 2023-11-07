///
/// Erp System - Mark VII No 1 (Gideon Series) Client 1.5.5
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

import { IWorkInProgressReport } from '../work-in-progress-report.model';

import { ASC, DESC, ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { WorkInProgressReportService } from '../service/work-in-progress-report.service';
import { ParseLinks } from 'app/core/util/parse-links.service';
import * as dayjs from 'dayjs';
import { DATE_FORMAT } from '../../../../config/input.constants';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'jhi-work-in-progress-report',
  templateUrl: './work-in-progress-report.component.html',
})
export class WorkInProgressReportComponent implements OnInit {
  workInProgressReports: IWorkInProgressReport[];
  isLoading = false;
  itemsPerPage: number;
  links: { [key: string]: number };
  page: number;
  predicate: string;
  ascending: boolean;
  currentSearch: string;

  reportDateControlInput$ = new Subject<dayjs.Dayjs>();
  reportDate: dayjs.Dayjs = dayjs();

  constructor(
    protected workInProgressReportService: WorkInProgressReportService,
    protected parseLinks: ParseLinks,
    protected activatedRoute: ActivatedRoute
  ) {
    this.workInProgressReports = [];
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
      this.workInProgressReportService
        .search({
          query: this.currentSearch,
          page: this.page,
          size: this.itemsPerPage,
          sort: this.sort(),
        })
        .subscribe(
          (res: HttpResponse<IWorkInProgressReport[]>) => {
            this.isLoading = false;
            this.paginateWorkInProgressReports(res.body, res.headers);
          },
          () => {
            this.isLoading = false;
          }
        );
      return;
    }

    this.workInProgressReportService
      .queryByReportDate({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
        reportDate: this.reportDate.format(DATE_FORMAT),
      })
      .subscribe(
        (res: HttpResponse<IWorkInProgressReport[]>) => {
          this.isLoading = false;
          this.paginateWorkInProgressReports(res.body, res.headers);
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  reset(): void {
    this.page = 0;
    this.workInProgressReports = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  search(query: string): void {
    this.workInProgressReports = [];
    this.links = {
      last: 0,
    };
    this.page = 0;
    if (query && ['projectTitle', 'dealerName'].includes(this.predicate)) {
      this.predicate = 'id';
      this.ascending = true;
    }
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();

    this.reportDateControlInput$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(() => this.loadPage(1));
  }

  onDateInputChange(): void {
    this.reportDateControlInput$.next(this.reportDate);
  }

  trackId(index: number, item: IWorkInProgressReport): number {
    return item.id!;
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateWorkInProgressReports(data: IWorkInProgressReport[] | null, headers: HttpHeaders): void {
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
        this.workInProgressReports.push(d);
      }
    }
  }
}
