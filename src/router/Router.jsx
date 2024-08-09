import React from 'react'

import {createBrowserRouter,} from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import MyJobs from '../pages/MyJobs';
import SalaryPage from '../pages/SalaryPage';
import CreateJob from '../pages/CreateJob.jsx';
import UpdateJob from '../pages/UpdateJob';
import JobDetails from '../pages/JobDetails';
import Login from '../pages/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Myjob_posting from '../pages/Myjob_posting.jsx';
import Register from '../pages/Register.jsx';
import Employermyjobs from '../pages/Employermyjobs.jsx';
import Applicanthome from '../pages/Applicanthome.jsx';
import Applicantjobdetails from '../pages/Applicantjobdetails.jsx';
import Employercreatejob from '../pages/Employercreatejob.jsx';
import EmployerpostJob from '../pages/Employerpostjobs.jsx';
import Employerupdatejob from '../pages/Employerupdatejob.jsx';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/my-job",
            element: <PrivateRoute><MyJobs/></PrivateRoute>
        },
        {
            path: "/salary",
            element: <SalaryPage/>
        },
        {
          path: "/post-job",
          element: <CreateJob/>
        },
        {
          path: "/post-myjob",
          element: <Myjob_posting/>
        },
        {
          path: "edit-job/:id",
          element: <UpdateJob/>,
          loader: ({params}) => fetch(`http://13.60.171.7:5000/all-jobs/${params.id}`)
        },
        {
          path:"/employer-dashboard",
          element: <Employermyjobs/>,
        },
        {
          path:"/employer-update-job/:id",
          element: <Employerupdatejob/>,
          loader: ({params}) => fetch(`http://13.60.171.7:5000/all-jobs/${params.id}`)
        },
        {
          path:"/applicant-job-details/:id",
          element: <Applicantjobdetails/>,
        },
        {
          path:"/employer-post-job",
          element: <EmployerpostJob/>,
        },
        {
          path:"/employer-create-job",
          element: <Employercreatejob/>,
        },
        {
          path:"/applicant-dashboard",
          element: <Applicanthome/>,
        },
        {
          path:"/jobs/:id",
          element: <JobDetails/>,
        }
      ]
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    }
  ]);

  export default router;