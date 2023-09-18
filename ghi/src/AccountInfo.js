import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUpdateAccountMutation,
  useGetTokenQuery,
  useGetAccountQuery,
  useDeleteAccountMutation,
  useLogOutMutation,
} from "./app/authApi";
import ActivityStats from "./ActivityStats";
import StatsPage from "./StatsPage";


function AccountInformation() {
  const tokenQuery = useGetTokenQuery();
  const [deleteAccount] = useDeleteAccountMutation();
  const [account, setAccount] = useState({});
  const accountQuery = useGetAccountQuery();
  const { data: tokenData } = tokenQuery;
  const { data: accountData } = accountQuery;
  const [logout] = useLogOutMutation();
  const navigate = useNavigate();



  function deleteRefresh(id) {
    deleteAccount(id);
    logout(id);
    navigate("/");
  }

  const getAccountQuery = useGetAccountQuery(tokenData?.account.id);

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

  useEffect(() => {
    if (getAccountQuery.data) {
      setAccount(getAccountQuery.data);
    }
  }, [getAccountQuery]);

  return (
      <div>
          <div
              style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2,50%)",
                  rowGap: "45px",
                  columnGap: "0px",
                  justifyItems: "center",
                  alignItems: "center",
                  margin: "100px 100px 100px 100px",
                  width: "60%",
                  marginLeft:"auto", marginRight:"auto"
              }}
          >
              <div>
                  <h1 align="center" className="mt-3">
                      Account Information
                  </h1>
                  <div className="text-center">
                      <img
                          src={account.picture_url}
                          alt="profile"
                          width="200"
                          height="200"
                          style={{
                              objectFit: "cover",
                              width: "175px",
                              height: "175px",
                              marginLeft: "auto",
                              marginRight: "auto",
                              borderRadius: "50%",
                              borderStyle: "solid",
                              borderWidth: "1px",
                              borderColor: "#ffffff",
                              backgroundColor: "#ffda64",
                          }}
                      />
                  </div>
                  <div align="center">Username: {account.username}</div>
                  <div align="center">Email: {account.email}</div>
                  <div align="center">First Name: {account.first_name}</div>
                  <div align="center">Last Name: {account.last_name}</div>
                  <div align="center">
                      <button
                          className="btn m-3"
                          style={{
                              backgroundColor: "#be003e",
                              color: "#ffffff",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#deleteModal"
                      >
                          Delete Account
                      </button>
                      <button
                          className="btn m-3"
                          style={{
                              backgroundColor: "#00a9b4",
                              color: "#ffffff",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#updateModal"
                      >
                          Update Account
                      </button>
                  </div>
              </div>
              <div className="modal" id="deleteModal">
                  <div className="modal-dialog" style={{ width: "800px" }}>
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                              >
                                  Are you sure you want to delete your account?
                              </h5>
                              <button
                                  type="button"
                                  className="close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                              >
                                  <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div className="modal-body">
                              <p>
                                  <button
                                      data-bs-dismiss="modal"
                                      onClick={() => deleteRefresh(account.id)}
                                  >
                                      Yes, delete my account
                                  </button>
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="modal" id="updateModal">
                  <div className="modal-dialog" style={{ width: "800px" }}>
                      <div className="modal-content">
                          <div className="modal-header">
                              <h2
                                  className="modal-title"
                                  id="exampleModalLabel"
                              >
                                  Update Account
                              </h2>
                              <button
                                  type="button"
                                  className="close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                              >
                                  <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div className="modal-body">
                              <form
                                  onSubmit={(e) => handleSubmit(e)}
                                  id="AccountForm"
                              >
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
                                      <label htmlFor="first_name">
                                          First Name
                                      </label>
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
                                      <label htmlFor="last_name">
                                          Last Name
                                      </label>
                                  </div>
                                  <div className="form-floating mb-3">
                                      <input
                                          onChange={handleFormChange}
                                          placeholder="picture_url"
                                          type="url"
                                          name="picture_url"
                                          id="picture_url"
                                          className="form-control"
                                      />
                                      <label htmlFor="picture_url">
                                          picture url
                                      </label>
                                  </div>
                                  <button
                                      type="submit"
                                      className="btn btn-primary"
                                      data-bs-dismiss="modal"
                                  >
                                      Submit
                                  </button>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
              <div>
                  <ActivityStats />
              </div>
          </div>
          <div style={{marginLeft:"auto", marginRight:"auto"}}>
              <StatsPage />
          </div>
      </div>
  );
}

export default AccountInformation;
