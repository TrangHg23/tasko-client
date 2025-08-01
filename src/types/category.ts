export interface ICategory {
  id: string;
  name: string;
  taskCount: number;
}

export type CategoryRequest = Pick<ICategory, 'name'>;

export interface UpdateCategoryRequest {
  id: string;
  category: CategoryRequest;
}
