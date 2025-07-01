export interface ICategory {
  id: string;
  name: string;
}

export type CategoryRequest = Pick<ICategory, 'name'>;

export interface UpdateCategoryRequest {
  id: string;
  category: CategoryRequest;
}
