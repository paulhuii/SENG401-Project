import React, { useState } from 'react';

const EditProfile = ({ profileData, onSave, setEditing }) => {
  // Initialize local state with profileData passed from the parent component
  const [userData, setUserData] = useState({
    name: profileData.name || '',
    username: profileData.username || '',
    email: profileData.email || '',
    role: profileData.role || '',
    gender: profileData.gender || '',
    description: profileData.description || '',
  });


  // Handle input changes for form fields
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call onSave function passed from the parent component, passing the updated userData
    console.log("Submitting data:", userData);

    onSave(userData);
    // Optionally close the edit form / mode here or handle it externally via passed setEditing
    setEditing(false);
  };

  return (
    <div className="edit_profile">
      <button className="btn btn-danger btn_close" onClick={() => setEditing(false)}>Close</button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={userData.name} onChange={handleInput} />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" name="username" value={userData.username} onChange={handleInput} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={userData.email} onChange={handleInput} />
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

        <button type="submit" className="btn btn-info w-100">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
