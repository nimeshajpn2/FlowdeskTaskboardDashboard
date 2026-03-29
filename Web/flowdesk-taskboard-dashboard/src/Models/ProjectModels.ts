
export interface Project {
  id: number;
  name: string;
  description?: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateProjectViewModel {
  name: string;
  description?: string;
}

export interface UpdateProjectViewModel {
  name?: string;
  description?: string;
}

export interface ProjectResponse<T = Project | Project[]> {
  message: string;
  data?: T;
}