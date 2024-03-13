import React, { useState } from 'react';
import axios from 'axios'

const EditProfile = ({ profileData, onSave, setEditing }) => {
  const [userData, setUserData] = useState({
    name: profileData.name || '',
    username: profileData.username || '',
    email: profileData.email || '',
    role: profileData.role || '',
    gender: profileData.gender || '',
    description: profileData.description || '',
  });

  // State to store validation errors
  const [errors, setErrors] = useState({});

  // Email validation pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // File input constant
  const [file, setFile] = useState();

  // TODO: Upload a resume to the backend using Axios and Multer: https://www.youtube.com/watch?v=-7w2KtfiMEM
  const upload = () => {
    // Check if there was an upload
    if (document.getElementById("resume").value !== ''){
      const formData = new FormData()
      formData.append('file', file)
      axios.post('PATHTOCHANGE', formData)
      .then( res => {})
      .catch( er => console.log(er))
    }
  }

  // Username validation pattern (basic example, adjust as needed)
  // const usernamePattern = /^[a-zA-Z]+(?:_+[a-zA-Z0-9]+)*(?:\.[a-zA-Z0-9]+(?:_+[a-zA-Z0-9]+)*)?$/;


  // // Name validation pattern (allowing only alphabetic characters)
  // const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

  // Validate input and update state
  const validateInput = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'name':
        if (!value) {
          errorMessage = 'Name is required.';
        } else if (/^[ ]|.*[ ]$/.test(value)) {
          // Checks if the name starts or ends with a space
          errorMessage = 'Name must not start or end with a space.';
        } else if (!/^[A-Za-z ]+$/.test(value)) {
          // Checks if the name contains characters other than letters and spaces
          errorMessage = 'Name must contain only letters and spaces.';
        } else if (/  +/.test(value)) {
          // Checks for multiple consecutive spaces
          errorMessage = 'Name must not contain consecutive spaces.';
        }
        break;
      case 'username':
        if (!value) errorMessage = 'Username is required.';
        else if (!/^[a-zA-Z]+(?:_+[a-zA-Z0-9]+)*(?:\.[a-zA-Z0-9]+(?:_+[a-zA-Z0-9]+)*)?$/.test(value))
          errorMessage = 'Username must start with a letter, contain only alphanumeric characters, underscores, or a single dot. Consecutive underscores or dots and combinations of dots and underscores are not allowed.';
        else if (/\.{2,}/.test(value) || /\._|_\./.test(value))
          errorMessage = 'Username cannot contain consecutive dots or underscores, nor can it have a dot and underscore next to each other.';
        else if (value.startsWith('.') || value.endsWith('.'))
          errorMessage = 'Username cannot start or end with a dot.';
        break;
      case 'email':
        if (!value) errorMessage = 'Email is required.';
        else if (!emailPattern.test(value)) errorMessage = 'Email is not valid.';
        break;
      default:
        break;
    }
    return errorMessage;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value);
    setUserData({ ...userData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Re-validate all fields to ensure the errors state is up to date
    Object.keys(userData).forEach(key => {
      const error = validateInput(key, userData[key]);
      setErrors(prevErrors => ({ ...prevErrors, [key]: error }));
    });

    // Check for any errors after re-validation
    const hasErrors = Object.values(errors).some(error => error !== "");

    // Check if all fields are filled
    const allFieldsFilled = Object.values(userData).every(value => value.trim() !== "");

    if (hasErrors || !allFieldsFilled) {
      alert("Please correct the errors before submitting.");
      return;
    }
    upload();
    console.log("Submitting data:", userData);
    onSave(userData);
    setEditing(false);
  };

  return (
    <div className="edit_profile">
      <form onSubmit={handleSubmit}>
        {/* Fields */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={userData.name} onChange={handleInput} />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>
        {/* Repeat for other fields, including username and email, with error display */}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" name="username" value={userData.username} onChange={handleInput} />
          {errors.username && <div className="text-danger">{errors.username}</div>}

        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={userData.email} onChange={handleInput} />
          {errors.email && <div className="text-danger">{errors.email}</div>}

        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select className="form-control" id="role" name="role" value={userData.role} onChange={handleInput}>
            <option value="recruiter">Recruiter</option>
            <option value="jobseeker">Jobseeker</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select className="form-control" id="gender" name="gender" value={userData.gender} onChange={handleInput}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Non-binary/Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" id="description" name="description" rows="3" value={userData.description} onChange={handleInput}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="resume" className="form-label">Upload Resume</label>
          <input className="form-control" type="file" id="resume" accept='.docx, .doc, .pdf' onChange={(e) => {
            // Check if our file has the appropriate extension:
            var name = document.getElementById("resume").value;
            if (name.slice(-4) === (".pdf") || name.slice(-4) === (".doc") || name.slice(-4) === (".docx")){
              setFile(e.target.files[0]);
              console.log("Resume set to " + name);
            } else {
              // Rest if not what was expected
              document.getElementById("resume").value = '';
              console.log("Invalid file type selected...");
            }
            }}/>
          {/* The upload will be moved to the submit function of this form */}
        </div>
        <p/>

        <button className="btn btn-primary " type="submit" >Save</button>
        <button style={{float:'right'}} className="btn btn-danger  btn_close" onClick={() => setEditing(false)}>Close</button>
      </form>
    </div>
  );
};

export default EditProfile;
