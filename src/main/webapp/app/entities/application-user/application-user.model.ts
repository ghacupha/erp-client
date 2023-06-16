import { IDealer } from 'app/entities/dealers/dealer/dealer.model';
import { ISecurityClearance } from 'app/entities/security-clearance/security-clearance.model';
import { IUser } from 'app/entities/user/user.model';
import { IUniversallyUniqueMapping } from 'app/entities/universally-unique-mapping/universally-unique-mapping.model';

export interface IApplicationUser {
  id: number;
  designation?: string | null;
  applicationIdentity?: string | null;
  organization?: Pick<IDealer, 'id' | 'dealerName'> | null;
  department?: Pick<IDealer, 'id' | 'dealerName'> | null;
  securityClearance?: Pick<ISecurityClearance, 'id' | 'clearanceLevel'> | null;
  systemIdentity?: Pick<IUser, 'id' | 'login'> | null;
  userProperties?: Pick<IUniversallyUniqueMapping, 'id' | 'mappedValue'>[] | null;
  dealerIdentity?: Pick<IDealer, 'id' | 'dealerName'> | null;
}

export type NewApplicationUser = Omit<IApplicationUser, 'id'> & { id: null };
