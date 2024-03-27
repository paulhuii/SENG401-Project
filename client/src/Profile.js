import React, { useState, useEffect} from 'react';
import { Button } from "react-bootstrap";
import './Profile.css';
import EditProfile from './components/EditProfile';
import ProfilePic from './components/ProfilePic/ProfilePic.js';

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
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found. Please login again.');
        return;
      }
  
      const response = await fetch('/api/profile/info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the authentication token
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch profile data.');
      }
  
      const profileData = await response.json();
      setProfileData(profileData); // Update state with fetched profile data
      localStorage.setItem('user', JSON.stringify(profileData)); // Update localStorage with new profile data, including photo URL
      console.log("Profile data: ", profileData);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.toString());
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
      <ProfilePic 
        userProfilePhotoUrl={profileData.profile_photo} 
        onUpdate={(newPhotoUrl) => {
        const updatedProfileData = { ...profileData, profile_photo: newPhotoUrl };
        setProfileData(updatedProfileData);
        localStorage.setItem('user', JSON.stringify(updatedProfileData)); // Update local storage
        console.log("updatedProfileData:", updatedProfileData);
        }} 
      />

      
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
          <Button onClick={handleEdit}>Edit Profile</Button>
        </div>
      )}
    </div>
  );
}

export default Profile;
