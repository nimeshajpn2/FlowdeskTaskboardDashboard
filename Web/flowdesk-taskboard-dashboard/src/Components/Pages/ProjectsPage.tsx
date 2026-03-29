import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../Services/ApiService.ts";
import { Project, CreateProjectViewModel, UpdateProjectViewModel } from "../../Models/ProjectModels";

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<CreateProjectViewModel>({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const navigate = useNavigate(); // For navigating to tasks page

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.getAllProjects();
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!projectForm.name.trim()) newErrors.name = "Project name is required";
    if (!projectForm.description?.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProject = async () => {
    if (!validateForm()) return;
    try {
      if (editingProject) {
        await api.updateProject(editingProject.id, projectForm as UpdateProjectViewModel);
      } else {
        await api.createProject(projectForm);
      }
      await fetchProjects();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({ name: project.name, description: project.description || "" });
    setErrors({});
    setShowModal(true);
  };

  // Open delete confirmation modal
  const openDeleteModal = (project: Project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const handleDeleteProject = async () => {
    if (!selectedProject) return;
    try {
      await api.archiveProject(selectedProject.id);
      setShowDeleteModal(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const viewTasks = (projectId: number) => {
    navigate(`/Projects/${projectId}/Tasks`);
  };

  const resetForm = () => {
    setEditingProject(null);
    setProjectForm({ name: "", description: "" });
    setErrors({});
    setShowModal(false);
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="container mt-4">
      <h2>Projects</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>Add Project</button>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => viewTasks(p.id)}>View Tasks</button>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditProject(p)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => openDeleteModal(p)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingProject ? "Edit Project" : "Add Project"}</h5>
                <button className="btn-close" onClick={resetForm}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  />
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={resetForm}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSaveProject}>
                  {editingProject ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Confirm Delete</h5>
                <button className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete project <strong>{selectedProject?.name}</strong>?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDeleteProject}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;