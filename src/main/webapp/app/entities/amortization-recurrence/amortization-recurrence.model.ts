import dayjs from 'dayjs/esm';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IPrepaymentMapping } from 'app/entities/prepayment-mapping/prepayment-mapping.model';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';
import { IDepreciationMethod } from 'app/entities/depreciation-method/depreciation-method.model';
import { IPrepaymentAccount } from 'app/entities/prepayment-account/prepayment-account.model';
import { recurrenceFrequency } from 'app/entities/enumerations/recurrence-frequency.model';

export interface IAmortizationRecurrence {
  id: number;
  firstAmortizationDate?: dayjs.Dayjs | null;
  amortizationFrequency?: recurrenceFrequency | null;
  numberOfRecurrences?: number | null;
  notes?: string | null;
  notesContentType?: string | null;
  particulars?: string | null;
  isActive?: boolean | null;
  isOverWritten?: boolean | null;
  timeOfInstallation?: dayjs.Dayjs | null;
  recurrenceGuid?: string | null;
  prepaymentAccountGuid?: string | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  parameters?: Pick<IPrepaymentMapping, 'id' | 'parameter'>[] | null;
  applicationParameters?: Pick<IUniversallyUniqueMapping, 'id' | 'mappedValue'>[] | null;
  depreciationMethod?: Pick<IDepreciationMethod, 'id' | 'depreciationMethodName'> | null;
  prepaymentAccount?: Pick<IPrepaymentAccount, 'id' | 'catalogueNumber'> | null;
}

export type NewAmortizationRecurrence = Omit<IAmortizationRecurrence, 'id'> & { id: null };
