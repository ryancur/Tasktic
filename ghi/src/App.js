import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import Calendar from "./calendar/Calendar";
import ActivityForm from "./Activities/ActivityForm";
import ActivityList from "./Activities/ActivityList";
import ActivityUpdate from "./Activities/ActivityUpdate";
import Nav from "./Nav";
import AccountInformation from "./AccountInfo";
import UpdateAccount from "./UpdateAccount";
import About from "./About";
import Footer from "./Footer";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <BrowserRouter basename={basename}>
      <Nav />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/activityform" element={<ActivityForm />} />
          <Route path="/accountinformation" element={<AccountInformation />} />
          <Route path="/activitylist" element={<ActivityList />} />
          <Route path="/activityupdate/:id" element={<ActivityUpdate />} />
          <Route path="/updateaccount" element={<UpdateAccount />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
