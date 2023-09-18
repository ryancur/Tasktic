import React, { useEffect, useState } from "react";
import { useCreateActivityMutation } from "../app/api";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ActivityFormModal() {
  const [priority, setPriority] = useState([]);
  const [category, setCategory] = useState([]);
  const [createActivity] = useCreateActivityMutation();
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(!modal);
  };

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
    showModal(!modal);
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
    <div>
      <Button
        outline
        color="info"
        size="lg"
        animation="wave"
        onClick={showModal}
      >
        Create +
      </Button>
      <Modal isOpen={modal} toggle={showModal} size="md">
        <ModalHeader toggle={showModal}>Create an Activity</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                onChange={handleFormChange}
                placeholder="Activity Title"
                required
                type="text"
                name="title"
                id="title"
              />
              <label htmlFor="title">Activity Title</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                onChange={handleFormChange}
                placeholder="Description"
                type="text"
                name="description"
                id="description"
              />
              <label htmlFor="description">Description</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                onChange={handleFormChange}
                value={formData.start_date || ""}
                placeholder=""
                type="datetime-local"
                name="start_date"
                id="start_date"
              />
              <label htmlFor="start_date">Start Date</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                onChange={handleFormChange}
                value={formData.end_date || ""}
                placeholder=""
                type="datetime-local"
                name="end_date"
                id="end_date"
              />
              <label htmlFor="end_date">End Date</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                onChange={handleFormChange}
                placeholder="Location"
                type="text"
                name="location"
                id="location"
              />
              <label htmlFor="location">Location</label>
            </div>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                onChange={handleFormChange}
                required
                type="select"
                name="category"
                id="category"
              >
                <option value="">Choose a Category</option>
                {category.map((cat) => {
                  return (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <select
                className="form-select"
                onChange={handleFormChange}
                required
                type="select"
                name="priority"
                id="priority"
              >
                <option value="">Choose a Priority</option>
                {priority.map((prio) => {
                  return (
                    <option key={prio} value={prio}>
                      {prio}
                    </option>
                  );
                })}
              </select>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <Button color="secondary" onClick={showModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ActivityFormModal;
