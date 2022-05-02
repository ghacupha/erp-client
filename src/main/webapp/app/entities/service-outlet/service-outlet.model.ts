import * as dayjs from 'dayjs';
import { IPlaceholder } from 'app/entities/erpService/placeholder/placeholder.model';
import { IBankBranchCode } from 'app/entities/bank-branch-code/bank-branch-code.model';
import { IOutletType } from 'app/entities/outlet-type/outlet-type.model';
import { IOutletStatus } from 'app/entities/outlet-status/outlet-status.model';
import { ICountyCode } from 'app/entities/county-code/county-code.model';

export interface IServiceOutlet {
  id?: number;
  outletCode?: string;
  outletName?: string;
  town?: string | null;
  parliamentaryConstituency?: string | null;
  gpsCoordinates?: string | null;
  outletOpeningDate?: dayjs.Dayjs | null;
  regulatorApprovalDate?: dayjs.Dayjs | null;
  outletClosureDate?: dayjs.Dayjs | null;
  dateLastModified?: dayjs.Dayjs | null;
  licenseFeePayable?: number | null;
  placeholders?: IPlaceholder[] | null;
  bankCode?: IBankBranchCode | null;
  outletType?: IOutletType | null;
  outletStatus?: IOutletStatus | null;
  countyName?: ICountyCode | null;
  subCountyName?: ICountyCode | null;
}

export class ServiceOutlet implements IServiceOutlet {
  constructor(
    public id?: number,
    public outletCode?: string,
    public outletName?: string,
    public town?: string | null,
    public parliamentaryConstituency?: string | null,
    public gpsCoordinates?: string | null,
    public outletOpeningDate?: dayjs.Dayjs | null,
    public regulatorApprovalDate?: dayjs.Dayjs | null,
    public outletClosureDate?: dayjs.Dayjs | null,
    public dateLastModified?: dayjs.Dayjs | null,
    public licenseFeePayable?: number | null,
    public placeholders?: IPlaceholder[] | null,
    public bankCode?: IBankBranchCode | null,
    public outletType?: IOutletType | null,
    public outletStatus?: IOutletStatus | null,
    public countyName?: ICountyCode | null,
    public subCountyName?: ICountyCode | null
  ) {}
}

export function getServiceOutletIdentifier(serviceOutlet: IServiceOutlet): number | undefined {
  return serviceOutlet.id;
}
