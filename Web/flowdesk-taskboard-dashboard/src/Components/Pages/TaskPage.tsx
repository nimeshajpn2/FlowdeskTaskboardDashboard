import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../Services/ApiService.ts";
import { Task, CreateTaskViewModel, UpdateTaskViewModel } from "../../Models/TaskModels";

const TasksPage: React.FC = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskForm, setTaskForm] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Fetch tasks for the project
  const fetchTasks = async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const res = await api.getTasksByProject(Number(projectId));
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  // Open modal for add/edit
  const openModal = (task?: Task) => {
    if (task) {
      setEditingTask(task);
      setTaskForm({ title: task.title, description: task.description || "" });
    } else {
      setEditingTask(null);
      setTaskForm({ title: "", description: "" });
    }
    setErrors({});
    setShowModal(true);
  };

  // Open delete confirmation modal
  const openDeleteModal = (task: Task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  // Validate both title and description
  const validateForm = () => {
    const newErrors: { title?: string; description?: string } = {};
    if (!taskForm.title.trim()) newErrors.title = "Task title is required";
    if (!taskForm.description.trim()) newErrors.description = "Task description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveTask = async () => {
    if (!validateForm()) return;
    if (!projectId) return;

    try {
      if (editingTask) {
        await api.updateTask(editingTask.id, taskForm as UpdateTaskViewModel);
      } else {
        await api.createTask({ projectId: Number(projectId), ...taskForm } as CreateTaskViewModel);
      }
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) return;
    try {
      await api.archiveTask(selectedTask.id);
      setShowDeleteModal(false);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setEditingTask(null);
    setTaskForm({ title: "", description: "" });
    setErrors({});
    setShowModal(false);
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Tasks</h2>
        <button className="btn btn-primary" onClick={() => openModal()}>
          + Add Task
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => openModal(t)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => openDeleteModal(t)}>
                  Delete
                </button>
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
                <h5 className="modal-title">{editingTask ? "Edit Task" : "Add Task"}</h5>
                <button className="btn-close" onClick={resetForm}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                    rows={3}
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  />
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveTask}>
                  {editingTask ? "Update" : "Add"}
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
                Are you sure you want to delete task <strong>{selectedTask?.title}</strong>?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDeleteTask}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;