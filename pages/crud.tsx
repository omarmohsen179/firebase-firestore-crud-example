import React, { useState, useEffect } from "react";
import axios from "axios";

type Task = {
  id?: string;
  name: string;
  description: string;
};

export default function Task() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ name: "", description: "" });
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/getAll?collectionName=tasks");
      setTasks(response.data.documents);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createTask = async () => {
    try {
      await axios.post("/api/create", {
        collectionName: "tasks",
        docData: newTask,
      });
      fetchTasks();
      setNewTask({ name: "", description: "" }); // Reset form
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      await axios.put("/api/update", {
        collectionName: "tasks",
        docId: selectedTaskId,
        updateData: updatedTask,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`/api/delete?collectionName=tasks&docId=${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Tasks</h2>
      <div className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <button onClick={createTask} className="btn btn-primary">
          Create Task
        </button>
      </div>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
          >
            <div>
              <p className="font-bold">{task.name}</p>
              <p>{task.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTaskId(task.id)}
                className="btn btn-secondary btn-sm"
              >
                Select
              </button>
              <button
                onClick={() => deleteTask(task.id!)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedTaskId && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Update Selected Task</h2>
          <button
            onClick={() =>
              updateTask({
                name: "Updated Name",
                description: "Updated Description",
              })
            }
            className="btn btn-accent"
          >
            Update Task
          </button>
        </div>
      )}
    </div>
  );
}
