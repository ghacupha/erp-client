import dayjs from 'dayjs/esm';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IBankBranchCode } from 'app/entities/bank-branch-code/bank-branch-code.model';
import { IOutletType } from 'app/entities/outlet-type/outlet-type.model';
import { IOutletStatus } from 'app/entities/outlet-status/outlet-status.model';
import { ICountyCode } from 'app/entities/county-code/county-code.model';

export interface IServiceOutlet {
  id: number;
  outletCode?: string | null;
  outletName?: string | null;
  town?: string | null;
  parliamentaryConstituency?: string | null;
  gpsCoordinates?: string | null;
  outletOpeningDate?: dayjs.Dayjs | null;
  regulatorApprovalDate?: dayjs.Dayjs | null;
  outletClosureDate?: dayjs.Dayjs | null;
  dateLastModified?: dayjs.Dayjs | null;
  licenseFeePayable?: number | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  bankCode?: Pick<IBankBranchCode, 'id' | 'branchCode'> | null;
  outletType?: Pick<IOutletType, 'id' | 'outletType'> | null;
  outletStatus?: Pick<IOutletStatus, 'id' | 'branchStatusType'> | null;
  countyName?: Pick<ICountyCode, 'id' | 'countyName'> | null;
  subCountyName?: Pick<ICountyCode, 'id' | 'subCountyName'> | null;
}

export type NewServiceOutlet = Omit<IServiceOutlet, 'id'> & { id: null };
