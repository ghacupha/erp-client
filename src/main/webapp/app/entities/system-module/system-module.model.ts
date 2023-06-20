export interface ISystemModule {
  id: number;
  moduleName?: string | null;
}

export type NewSystemModule = Omit<ISystemModule, 'id'> & { id: null };
