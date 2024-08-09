import React, { useEffect, useState, useContext } from "react";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { AuthContext } from "../context/AuthProvider";

const JobDetails = () => {
  const { id } = useParams(); // Get job ID from URL
  const [job, setJob] = useState(null); // Changed to object instead of array
  const { user } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null); // State to manage the selected file

  useEffect(() => {
    fetch(`http://13.60.171.7:8000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, [id]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Set the selected file
  };

  const handleJobApply = async () => {
    if (!selectedFile) {
      Swal.fire("Please select a file to upload", "", "warning");
      return;
    }
  
    const formData = new FormData();
    formData.append("cv", selectedFile);
    formData.append("email", user.email);
  
    try {
      const response = await fetch(`http://13.60.171.7:8000/all-jobs/${id}`, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Swal.fire("Application Submitted Successfully!", "", "success");
      } else {
        Swal.fire(data.message || "Failed to Submit Application", "", "error");
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire("Failed to Submit Application", "", "error");
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
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange} 
            className="block mt-4"
          /> {/* File input for CV upload */}
          <button 
            className="bg-indigo-700 px-6 py-1 text-white rounded-sm ms-2 mt-2" 
            onClick={handleJobApply}
          >
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

export default JobDetails;
