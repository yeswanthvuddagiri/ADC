import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Edittask() {
  const [data, setData] = useState({
    task: "",
    status: "",
    deadline: ""
  });

  const { id: edit_taskid } = useParams(); // ✅ Fixed: useParams()

  useEffect(() => {
    const api = `https://todo-roan-seven-61.vercel.app/api/get_task_data/${edit_taskid}`;
    axios.get(api).then((response) => {
      setData(response.data.task_data);
    });
  }, [edit_taskid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const api = `https://todo-roan-seven-61.vercel.app/api/edit_task/${edit_taskid}`;
    axios.put(api, data).then((response) => {
      if (response.status === 200) {
        alert("Updated successfully.");
        setData({ task: "", status: "", deadline: "" });
        window.location.href = '/';
      } else {
        alert("Function not working");
      }
    });
  };

  return (
    <div className="col-md-4">
      <h2 className="first">Edit Task</h2>
      <br />
      <div className="card">
        <div className="card-body">
          <form className="five" onSubmit={handleSubmit}>
            <label><h5>Task</h5></label>
            <input
              type="text"
              placeholder="Enter Task"
              name="task"
              className="form-control"
              value={data.task}
              onChange={handleInputChange}
            />
            <br />
            <label><h5>Status</h5></label>
            <input
              type="text"
              placeholder="Enter Status"
              name="status"
              className="form-control"
              value={data.status}
              onChange={handleInputChange}
            />
            <br />
            <label><h5>Deadline</h5></label>
            <input
              type="date"
              name="deadline"
              className="form-control"
              value={data.deadline}
              onChange={handleInputChange}
            />
            <br />
            <input type="submit" value="Update" className="seven" />
          </form>
        </div>
      </div>
    </div>
  );
}
