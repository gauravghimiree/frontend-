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
import { getUser  } from "./Redux/Auth/Action";
import { fetchProjects } from "./Redux/Project/Action";
import AcceptInvitation from "./pages/Project/AcceptInvitation";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUser ());
        await dispatch(fetchProjects({}));
        // toast.success('User  data and projects fetched successfully!'); // Success notification
      } catch (error) {
        // toast.error('Failed to fetch user data or projects.'); // Error notification
      }
    };

    fetchData();
  }, [dispatch, auth.jwt]); // Added dispatch to the dependency array

  console.log(auth);

  return (
    <>
      <ToastContainer /> {/* Add ToastContainer here */}
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