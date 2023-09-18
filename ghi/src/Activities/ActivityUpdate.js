import { useState, useEffect } from "react";
import { useUpdateActivityMutation, useGetOneActivityQuery } from "../app/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ActivityUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [priority, setPriority] = useState([]);
  const [category, setCategory] = useState([]);
  const activityQuery = useGetOneActivityQuery(id);
  const { data: activityData } = activityQuery;
  const [updateActivity] = useUpdateActivityMutation();
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

  const [data, setData] = useState({
    title: activityData?.title,
    description: activityData?.description,
    start_date: activityData?.start_date,
    end_date: activityData?.end_date,
    location: activityData?.location,
    category: activityData?.category,
    priority: activityData?.priority,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!data.start_date && !data.end_date) {
      setData({
        ...data,
        start_date: null,
        end_date: null,
      });
    } else {
      setData({
        ...data,
        start_date: new Date(data.start_date),
        end_date: new Date(data.end_date),
      });
    }
    await updateActivity({ data, id: activityData.id });
    event.target.reset();
    navigate("/calendar");
  };

  const handleFormChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;

    setData({
      ...data,
      [inputName]: value,
    });
  };

  return (
    <div className="row d-flex p-2">
      <div className="offset-3 col-6 mb-5 mt-4">
        <h1 className="text-center">Update Activity</h1>
        <form onSubmit={handleSubmit} id="ActivityForm">
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              placeholder="Activity Title"
              type="text"
              name="title"
              id="title"
              className="form-control"
            />
            <label htmlFor="title">Activity Title</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              placeholder="Description"
              type="text"
              name="description"
              id="description"
              className="form-control"
            />
            <label htmlFor="description">Description</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              placeholder={activityData?.start_date}
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
              placeholder={activityData?.end_date}
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
              placeholder={activityData?.location}
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
              name="category"
              id="category"
              className="form-select"
            >
              <option>Current Category: {activityData?.category}</option>
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
              name="priority"
              id="priority"
              className="form-select"
            >
              <option>Current Priority: {activityData?.priority}</option>
              {priority.map((prio) => {
                return (
                  <option key={prio} value={prio}>
                    {prio}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default ActivityUpdate;
