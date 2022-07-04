import { IDealer } from '../models/dealer.model';
import { ISecurityClearance } from '../security-clearance/security-clearance.model';
import { IUser } from '../../../admin/user-management/user-management.model';
import { IUniversallyUniqueMapping } from '../../erp-pages/universally-unique-mapping/universally-unique-mapping.model';

export interface IApplicationUser {
  id?: number;
  designation?: string;
  applicationIdentity?: string;
  organization?: IDealer;
  department?: IDealer;
  securityClearance?: ISecurityClearance;
  systemIdentity?: IUser;
  userProperties?: IUniversallyUniqueMapping[] | null;
  dealerIdentity?: IDealer;
}

export class ApplicationUser implements IApplicationUser {
  constructor(
    public id?: number,
    public designation?: string,
    public applicationIdentity?: string,
    public organization?: IDealer,
    public department?: IDealer,
    public securityClearance?: ISecurityClearance,
    public systemIdentity?: IUser,
    public userProperties?: IUniversallyUniqueMapping[] | null,
    public dealerIdentity?: IDealer
  ) {}
}

export function getApplicationUserIdentifier(applicationUser: IApplicationUser): number | undefined {
  return applicationUser.id;
}
