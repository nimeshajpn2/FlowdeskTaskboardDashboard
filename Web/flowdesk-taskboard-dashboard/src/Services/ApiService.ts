// src/services/ApiService.ts
import axios from "axios";
import { LoginViewModel, RegisterViewModel } from "../Models/AuthModels";
import { Project, CreateProjectViewModel, UpdateProjectViewModel } from "../Models/ProjectModels";
import { Task, CreateTaskViewModel, UpdateTaskViewModel, UpdateStatusViewModel } from "../Models/TaskModels";

const API_BASE = "https://localhost:7085/api";

// Create axios instance (BEST PRACTICE)
const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // always send cookie
});

export const api = {

  //AUTH
  register: async (data: RegisterViewModel) => {
    const res = await apiClient.post("/auth/register", data);
    return res.data;
  },

  login: async (data: LoginViewModel) => {
    const res = await apiClient.post("/auth/login", data);
    return res.data;
  },

  //PROJECTS
  getAllProjects: async (includeArchived: boolean = false) => {
    const res = await apiClient.get(`/projects?includeArchived=${includeArchived}`);
    return res.data;
  },

  getProjectById: async (id: number) => {
    const res = await apiClient.get(`/projects/${id}`);
    return res.data;
  },

  createProject: async (dto: CreateProjectViewModel) => {
    const res = await apiClient.post("/projects", dto);
    return res.data;
  },

  updateProject: async (id: number, dto: UpdateProjectViewModel) => {
    const res = await apiClient.put(`/projects/${id}`, dto);
    return res.data;
  },

  archiveProject: async (id: number) => {
    const res = await apiClient.delete(`/projects/${id}`);
    return res.data;
  },

  //TASKS
  getTasksByProject: async (
    projectId: number,
    status?: string,
    priority?: string,
    assignedToUserId?: number
  ) => {
    const params: any = {};
    if (status) params.status = status;
    if (priority) params.priority = priority;
    if (assignedToUserId) params.assignedToUserId = assignedToUserId;

    const query = new URLSearchParams(params).toString();
    const url = `/tasks/project/${projectId}` + (query ? `?${query}` : "");

    const res = await apiClient.get(url);
    return res.data;
  },

  createTask: async (dto: CreateTaskViewModel) => {
    const res = await apiClient.post("/tasks", dto);
    return res.data;
  },

  updateTask: async (id: number, dto: UpdateTaskViewModel) => {
    const res = await apiClient.put(`/tasks/${id}`, dto);
    return res.data;
  },

  updateTaskStatus: async (id: number, dto: UpdateStatusViewModel) => {
    const res = await apiClient.patch(`/tasks/${id}/status`, dto);
    return res.data;
  },

  archiveTask: async (id: number) => {
    const res = await apiClient.delete(`/tasks/${id}`);
    return res.data;
  },
};