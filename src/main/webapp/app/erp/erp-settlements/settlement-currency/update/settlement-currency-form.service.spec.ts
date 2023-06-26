///
/// Erp System - Mark IV No 1 (David Series) Client 1.4.0
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

import { TestBed } from '@angular/core/testing';
import { sampleWithRequiredData, sampleWithNewData } from '../settlement-currency.test-samples';
import { SettlementCurrencyFormService } from './settlement-currency-form.service';

describe('SettlementCurrency Form Service', () => {
  let service: SettlementCurrencyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettlementCurrencyFormService);
  });

  describe('Service methods', () => {
    describe('createSettlementCurrencyFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSettlementCurrencyFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            iso4217CurrencyCode: expect.any(Object),
            currencyName: expect.any(Object),
            country: expect.any(Object),
            numericCode: expect.any(Object),
            minorUnit: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });

      it('passing ISettlementCurrency should create a new form with FormGroup', () => {
        const formGroup = service.createSettlementCurrencyFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            iso4217CurrencyCode: expect.any(Object),
            currencyName: expect.any(Object),
            country: expect.any(Object),
            numericCode: expect.any(Object),
            minorUnit: expect.any(Object),
            fileUploadToken: expect.any(Object),
            compilationToken: expect.any(Object),
            placeholders: expect.any(Object),
          })
        );
      });
    });

    describe('getSettlementCurrency', () => {
      it('should return NewSettlementCurrency for default SettlementCurrency initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSettlementCurrencyFormGroup(sampleWithNewData);

        const settlementCurrency = service.getSettlementCurrency(formGroup) as any;

        expect(settlementCurrency).toMatchObject(sampleWithNewData);
      });

      it('should return NewSettlementCurrency for empty SettlementCurrency initial value', () => {
        const formGroup = service.createSettlementCurrencyFormGroup();

        const settlementCurrency = service.getSettlementCurrency(formGroup) as any;

        expect(settlementCurrency).toMatchObject({});
      });

      it('should return ISettlementCurrency', () => {
        const formGroup = service.createSettlementCurrencyFormGroup(sampleWithRequiredData);

        const settlementCurrency = service.getSettlementCurrency(formGroup) as any;

        expect(settlementCurrency).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISettlementCurrency should not enable id FormControl', () => {
        const formGroup = service.createSettlementCurrencyFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSettlementCurrency should disable id FormControl', () => {
        const formGroup = service.createSettlementCurrencyFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
