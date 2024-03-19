import React, { useState } from 'react';
import { updateRole } from '../../src/App.js';


const EditProfile = ({ profileData, onSave, setEditing }) => {
  const [userData, setUserData] = useState({
    name: profileData.name || '',
    username: profileData.username || '',
    email: profileData.email || '',
    role: profileData.role || '',
    gender: profileData.gender || '',
    description: profileData.description || '',
    profile_photo: profileData.profile_photo || "/profileDefault.png"
  });

  // State to store validation errors
  const [errors, setErrors] = useState({});
  
  // Email validation pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    const allFieldsFilled = Object.values(userData).every(value => (value.trim() !== "") || value === userData.role ||value === userData.description ); // Role can't be changed and description is optional to fill in.

    if (hasErrors || !allFieldsFilled) {
      alert("Please correct the errors before submitting.");
      return;
    }
    console.log("Submitting data:", userData);
    onSave(userData);
    setEditing(false);
    };

  return (
    <div className="edit_profile">
      <form onSubmit={handleSubmit}>
        {/* Fields */}
        <p/>
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
          <select className="form-control" id="role" name="role" value={userData.role} onChange={handleInput} disabled>
            <option value="Recruiter">Recruiter</option>
            <option value="Jobseeker">Jobseeker</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select className="form-control" id="gender" name="gender" value={userData.gender} onChange={handleInput}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary/Other">Non-binary/Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" id="description" name="description" rows="3" value={userData.description} onChange={handleInput}></textarea>
        </div>
        
        <p/>

        <button className="btn btn-primary " type="submit" >Save</button>
        <button style={{float:'right'}} className="btn btn-danger  btn_close" onClick={() => setEditing(false)}>Close</button>
      </form>
    </div>
  );
};

export default EditProfile;
