import { useState } from "react";
import { useUpdateAccountMutation, useGetAccountQuery } from "./app/authApi";

function UpdateAccount() {
  const accountQuery = useGetAccountQuery();
  const { data: accountData } = accountQuery;
  const [updateAccount] = useUpdateAccountMutation();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    picture_url: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateAccount({ formData, id: accountData?.id });
    event.target.reset();
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
        <h1 className="text-center">Update Account</h1>
        <form onSubmit={(e) => handleSubmit(e)} id="AccountForm">
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              placeholder="Email"
              type="text"
              name="email"
              id="email"
              className="form-control"
            />
            <label htmlFor="">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              placeholder="Username"
              type="text"
              name="username"
              id="username"
              className="form-control"
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              placeholder="Password"
              type="text"
              name="password"
              id="password"
              className="form-control"
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              placeholder="First Name"
              type="text"
              name="first_name"
              id="first_name"
              className="form-control"
            />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              placeholder="Last Name"
              type="text"
              name="last_name"
              id="last_name"
              className="form-control"
            />
            <label htmlFor="last_name">Last Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              placeholder="picture_url"
              type="text"
              name="picture_url"
              id="picture_url"
              className="form-control"
            />
            <label htmlFor="picture_url">picture url</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default UpdateAccount;
