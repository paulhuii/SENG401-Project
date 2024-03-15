import React, { useState, useEffect } from 'react';
import './Profile.css';
import EditProfile from './components/EditProfile';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setProfileData(JSON.parse(userData));
    } else {
      fetchProfileData();
    }
  }, []);

  useEffect(() => {
    if (profileData) {
      localStorage.setItem('user', JSON.stringify(profileData));
    }
  }, [profileData]); // Sync with local storage on profileData change
  
  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/profile');
      if (!response.ok) throw new Error('Failed to fetch profile data');
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []); // D

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async (updatedData) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Sending request to /api/profile with data:', updatedData);
      console.log('Authorization Token:', token);
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile data');
      }
      const data = await response.json();
      setProfileData(data.user); // Update state with the updated profile data
      setEditing(false); // Close the editing form
      fetchProfileData();
    } catch (error) {
      setError(error.message);
      return; // Exit the function if there's an error
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      {editing ? (
        <EditProfile profileData={profileData} onSave={handleSave} setEditing={setEditing} />
      ) : (
        <div className="profile-content">
          {/* Display profile data */}
          <p>Name: {profileData.name}</p>
          <p>Username: {profileData.username}</p>
          <p>Email: {profileData.email}</p>
          <p>Role: {profileData.role}</p>
          <p>Gender: {profileData.gender}</p>
          <p>Description: {profileData.description || 'Add a description to attract recruiters!'}</p>
          <button onClick={handleEdit}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
