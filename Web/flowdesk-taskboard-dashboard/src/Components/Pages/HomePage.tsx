import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-success mb-3">Flowdesk Dashboard</h2>
      <p className="fst-italic mb-5">
        Welcome to Flowdesk – a simple task and project management system.
      </p>

      <div className="row text-center">
        <div className="col-md-6 mb-4">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-2">Task Management</h5>
            <p>Assign and track tasks to improve collaboration and productivity.</p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-2">Project Oversight</h5>
            <p>Monitor projects, deadlines, and progress with clarity and ease.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;