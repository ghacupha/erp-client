///
/// Erp System - Mark VI No 1 (Phoebe Series) Client 1.5.3
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

import { ConfigurationService } from './configuration.service';
import { Bean, PropertySource } from './configuration.model';

@Component({
  selector: 'jhi-configuration',
  templateUrl: './configuration.component.html',
})
export class ConfigurationComponent implements OnInit {
  allBeans!: Bean[];
  beans: Bean[] = [];
  beansFilter = '';
  beansAscending = true;
  propertySources: PropertySource[] = [];

  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.configurationService.getBeans().subscribe(beans => {
      this.allBeans = beans;
      this.filterAndSortBeans();
    });

    this.configurationService.getPropertySources().subscribe(propertySources => (this.propertySources = propertySources));
  }

  filterAndSortBeans(): void {
    const beansAscendingValue = this.beansAscending ? -1 : 1;
    const beansAscendingValueReverse = this.beansAscending ? 1 : -1;
    this.beans = this.allBeans
      .filter(bean => !this.beansFilter || bean.prefix.toLowerCase().includes(this.beansFilter.toLowerCase()))
      .sort((a, b) => (a.prefix < b.prefix ? beansAscendingValue : beansAscendingValueReverse));
  }
}
