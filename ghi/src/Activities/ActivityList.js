import React, { useState, useEffect } from "react";
import { useGetActivitiesQuery, useDeleteActivityMutation } from "../app/api";
import { useNavigate } from "react-router-dom";

export default function ActivityList() {
  const [activities, setActivities] = useState([]);
  const { data: activityData } = useGetActivitiesQuery();
  const [deleteActivity] = useDeleteActivityMutation();
  const navigate = useNavigate();
  const [singleActivity, setSingleActivity] = useState({
    id: "",
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    category: "",
    priority: "",
    is_event: null,
  });
  useEffect(() => {
    if (activityData) {
      setActivities(activityData.activities);
    }
  }, [activityData]);

  const showDetail = (singleActivity) => {
    setSingleActivity(singleActivity);
  };

  const editDetail = (id) => {
    navigate(`/activityupdate/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteActivity(id);
    } catch (error) { }
  };
  return (
    <div className="container mt-2">
      <div className="row mt-2">
        <div className="col-lg-1 col-md-6 col-sm-12"></div>
        <div className="col-lg-12 col-md-6 col-sm-12">
          <h1>Activities</h1>
          <div className="mt-5">
            <table className="table table-striped table-sm">
              <thead className="thead-light">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>Start Time</th>
                  <th>End date</th>
                  <th>End Time</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Task/Event</th>
                  <th>Show Details</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.title}</td>
                    <td>{activity.description}</td>
                    <td>
                      {activity.start_date
                        ? new Date(activity.start_date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {activity.start_date
                        ? new Date(activity.start_date).toLocaleTimeString()
                        : "N/A"}
                    </td>
                    <td>
                      {activity.end_date
                        ? new Date(activity.end_date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {activity.end_date
                        ? new Date(activity.end_date).toLocaleTimeString()
                        : "N/A"}
                    </td>
                    <td>{activity.location}</td>
                    <td>{activity.category}</td>
                    <td>{activity.priority}</td>
                    <td>{activity.is_event ? "Event" : "Task"}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={(e) => showDetail(activity)}
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="modal" id="myModal">
        <div className="modal-dialog" style={{ width: "700px" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Activity Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Title: {singleActivity.title}</p>
              <p>Description: {singleActivity.description}</p>
              <p>
                Start Date:{" "}
                {singleActivity.start_date
                  ? new Date(singleActivity.start_date).toLocaleDateString(
                    "en-US",
                    { timeZone: "America/New_York" }
                  )
                  : "N/A"}
              </p>
              <p>
                Start Time:{" "}
                {singleActivity.start_date
                  ? new Date(singleActivity.start_date).toLocaleTimeString(
                    "en-US",
                    { timeZone: "America/New_York" }
                  )
                  : "N/A"}
              </p>
              <p>
                End Date:{" "}
                {singleActivity.end_date
                  ? new Date(singleActivity.end_date).toLocaleDateString(
                    "en-US",
                    { timeZone: "America/New_York" }
                  )
                  : "N/A"}
              </p>
              <p>
                End Time:{" "}
                {singleActivity.end_date
                  ? new Date(singleActivity.end_date).toLocaleTimeString(
                    "en-US",
                    { timeZone: "America/New_York" }
                  )
                  : "N/A"}
              </p>
              <p>Location: {singleActivity.location}</p>
              <p>Category: {singleActivity.category}</p>
              <p>Priority: {singleActivity.priority}</p>
              <p>Activity Type: {singleActivity.is_event ? "Event" : "Task"}</p>
              <p>
                <button
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    editDetail(singleActivity.id);
                  }}
                >
                  Edit
                </button>
              </p>
              <p>
                <button
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => handleDelete(singleActivity.id)}
                >
                  Delete
                </button>
              </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
