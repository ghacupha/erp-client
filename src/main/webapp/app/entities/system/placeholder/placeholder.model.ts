export interface IPlaceholder {
  id: number;
  description?: string | null;
  token?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  containingPlaceholder?: Pick<IPlaceholder, 'id' | 'description'> | null;
}

export type NewPlaceholder = Omit<IPlaceholder, 'id'> & { id: null };
