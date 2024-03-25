import { useState, useEffect } from "react";
import "./ProfilePic.css"

const ProfilePic = ({ userProfilePhotoUrl, onUpdate }) => {
  // Use userProfilePhotoUrl prop for the initial photo URL
  const [picSrc, setPicSrc] = useState("/profileDefault.png"); // userProfilePhotoUrl || 

  useEffect(() => {
    // Update component state when userProfilePhotoUrl prop changes
    setPicSrc("/profileDefault.png"); //userProfilePhotoUrl || 
  }, [userProfilePhotoUrl]);

  async function uploadPhoto(file) {
    const formData = new FormData();
    formData.append('profilePhoto', file);

    try {
      const token = localStorage.getItem('token');
      console.log('Authorization Token:', token);
      const response = await fetch('/api/profile/photo', {
        method: 'POST',
        body: formData,
        // Include authorization headers if needed
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      if (!response.ok) throw new Error('Photo upload failed');
      
      const data = await response.json();
      // Call onUpdate callback to notify parent component about the update
      onUpdate(data.profile_photo);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  }

  async function onButtonClicked() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = "image/*";

    fileInput.onchange = async () => {
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        setPicSrc(URL.createObjectURL(file)); // Update local UI immediately
        await uploadPhoto(file); // Upload the photo to the server
      }
    };

    fileInput.click();
  }

  return (
    <div className="profilepic">
      <img id="content" className="profilepic__image" src={picSrc} width="150" height="150" alt="Profile" />
      <div className="profilepic__content">
        {/* onClick={onButtonClicked} */}
        <span className="profilepic__icon"><i className="fas fa-camera"></i></span>
        <span className="profilepic__text">Change Picture</span>
      </div>
    </div>
  );
};

export default ProfilePic;
