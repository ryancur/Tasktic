import React, { useEffect, useState } from "react";
import { useCreateActivityMutation } from "../app/api";
import { useNavigate } from "react-router-dom";

function ActivityForm() {
  const [priority, setPriority] = useState([]);
  const [category, setCategory] = useState([]);
  const [createActivity] = useCreateActivityMutation();
  const [activityAlert, setActivityAlert] = useState(false);
  const navigate = useNavigate();

  const fetchCategoryData = async () => {
    const categoryUrl = `${process.env.REACT_APP_API_SERVICE_API_HOST}/api/categories`;
    const response = await fetch(categoryUrl);
    if (response.ok) {
      const data = await response.json();
      setCategory(data);
    }
  };

  const fetchPriorityData = async () => {
    const priorityUrl = `${process.env.REACT_APP_API_SERVICE_API_HOST}/api/priorities`;
    const response = await fetch(priorityUrl);
    if (response.ok) {
      const data = await response.json();
      setPriority(data);
    }
  };

  useEffect(() => {
    fetchCategoryData();
    fetchPriorityData();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: null,
    end_date: null,
    location: "",
    category: "",
    priority: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      (formData.end_date && !formData.start_date) ||
      (!formData.end_date && formData.start_date)
    ) {
      setFormData({
        ...formData,
        start_date: null,
        end_date: null,
      });
      alert("Invalid Date Range");
      return;
    } else if (formData.end_date < formData.start_date) {
      setFormData({
        ...formData,
        start_date: null,
        end_date: null,
      });
      alert("Invalid Date Range");
      return;
    } else if (!formData.start_date && !formData.end_date) {
      setFormData({
        ...formData,
        start_date: null,
        end_date: null,
      });
    } else {
      setFormData({
        ...formData,
        start_date: new Date(formData.start_date),
        end_date: new Date(formData.end_date),
      });
    }

    await createActivity(formData);
    setActivityAlert(!activityAlert);
    event.target.reset();
    setTimeout(() => {
      navigate("/calendar");
    }, 1000);
  };

  const handleFormChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  return (
    <div className="row d-flex p-2">
      <div className="offset-3 col-6 mb-5 mt-4">
        <h1 className="text-center">Create an Activity</h1>
        <form onSubmit={handleSubmit} id="create-Appointment-form">
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              placeholder="Activity Title"
              required
              type="text"
              name="title"
              id="title"
              className="form-control"
            />
            <label htmlFor="title">Activity Title</label>
          </div>
          <div className="form-floating mb-3">
            <input
              maxLength={250}
              onChange={handleFormChange}
              placeholder="Description"
              type="textarea"
              name="description"
              id="description"
              className="form-control"
            />
            <label htmlFor="description">Description</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              value={formData.start_date || ""}
              placeholder=""
              type="datetime-local"
              name="start_date"
              id="start_date"
              className="form-control"
            />
            <label htmlFor="start_date">Start Date</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              value={formData.end_date || ""}
              placeholder=""
              type="datetime-local"
              name="end_date"
              id="end_date"
              className="form-control"
            />
            <label htmlFor="end_date">End Date</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              placeholder="Location"
              type="text"
              name="location"
              id="location"
              className="form-control"
            />
            <label htmlFor="location">Location</label>
          </div>
          <div className="mb-3">
            <select
              onChange={handleFormChange}
              required
              name="category"
              id="category"
              className="form-select"
            >
              <option>Choose a Category</option>
              {category.map((cat) => {
                return (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-3">
            <select
              onChange={handleFormChange}
              required
              name="priority"
              id="priority"
              className="form-select"
            >
              <option>Choose a Priority</option>
              {priority.map((prio) => {
                return (
                  <option key={prio} value={prio}>
                    {prio}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            {activityAlert ? (
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <div>
                  <div
                    className="close ml-auto"
                    onClick={() => setActivityAlert(false)}
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <strong>Success!</strong> Your Activity has been created and
                    can be viewed on the calendar
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ActivityForm;
