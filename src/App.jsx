import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/Navbar/Navbar";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import IssueDetails from "./pages/IssueDetails/IssueDetails";
import Subscription from "./pages/Subscription/Subscription";
import Auth from "./pages/Auth/Auth.jsx"; // Import Auth component
import Home from "./pages/Home/Home";
import './index.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./Redux/Auth/Action";
import { fetchProjects } from "./Redux/Project/Action";
import AcceptInvitation from "./pages/Project/AcceptInvitation";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store); 
  
 useEffect(()=>{
  dispatch(getUser())
  dispatch(fetchProjects({}))

 },[auth.jwt])
  console.log(auth);

  return (
    <>
      { auth.user ? (
        <div>
          <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/project/:projectId/issue/:issueId" element={<IssueDetails />} />
          <Route path="/upgrade_plan" element={<Subscription />} />
          <Route path="/accept_invitation" element={<AcceptInvitation />} />
          </Routes>
        </div>
      ) : (
        <Auth />  
      )}
    </>
  );
}

export default App;
