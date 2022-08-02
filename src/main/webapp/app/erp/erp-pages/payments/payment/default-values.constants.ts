import {Dayjs} from "dayjs";
import * as dayjs from "dayjs";
import { CurrencyTypes } from '../../../erp-common/enumerations/currency-types.model';

export const DEFAULT_CATEGORY = "CATEGORY0";
export const DEFAULT_DATE: Dayjs = dayjs();
export const DEFAULT_CURRENCY = CurrencyTypes.KES;
export const DEFAULT_TRANSACTION_AMOUNT = 0.0;
export const DEFAULT_INVOICE_AMOUNT = 0.0;
export const DEFAULT_DISBURSEMENT_COST = 0.0;
export const DEFAULT_VATABLE_AMOUNT = 0.0;
export const DEFAULT_CONVERSION_RATE = 1.0;
export const DEFAULT_DESCRIPTION = "SETTLEMENT"
