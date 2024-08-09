import React, { useEffect, useState, useContext } from "react";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { AuthContext } from "../context/AuthProvider";

const Applicantjobdetails = () => {
  const { id } = useParams(); // Get job ID from URL
  const [job, setJob] = useState(null); // Changed to object instead of array
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://13.60.171.7:5000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, [id]);

  const handleJobApply = async () => {
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "CV or Resume URL address",
      inputPlaceholder: "Enter the URL"
    });
    if (url) {
      fetch(`http://13.60.171.7:5000/all-jobs/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cvUrl: url, email: user.email }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire("Application Submitted Successfully!", "", "success");
        } else {
          Swal.fire("Failed to Submit Application", "", "error");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire("Failed to Submit Application", "", "error");
      });
    }
  };

  if (!job) {
    return <div>Loading...</div>; // Show a loading state until job data is fetched
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"Job Details Page"} path={"Single Job"} />
      <div className="mt-10">
        <h3 className="font-semibold mb-2">Job ID: {id}</h3>
        <div className="my-4">
          <h2 className="text-2xl font-medium text-blue">{job.jobTitle}</h2> {/* Job title */}
          <p className="text-primary/75 md:w-1/3 text-sm italic my-1">
            {job.companyName} {/* Company name */}
          </p>
        </div>
        <div className="my-4 space-y-2">
          <div className="flex items-center gap-2">
            <FaBriefcase />
            <p className="text-xl font-medium mb-2">Employment Type</p>
          </div>
          <button className="bg-blue px-6 py-1 text-white rounded-sm">
            {job.employmentType} {/* Employment type */}
          </button>
          <button className="bg-indigo-700 px-6 py-1 text-white rounded-sm ms-2" onClick={handleJobApply}>
            Apply Now
          </button>
        </div>
        <div className="mt-12">
          <h4 className="text-lg font-medium mb-3">Job Description</h4>
          <p className="text-base text-primary/90">{job.description}</p> {/* Job description */}
        </div>
      </div>
    </div>
  );
};

export default Applicantjobdetails;
