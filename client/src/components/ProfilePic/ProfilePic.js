import { useState } from "react";
import "./ProfilePic.css"

const ProfilePic = () => {
  // TODO: Set this to our fetched image by default
  const [picSrc, setPicSrc] = useState("/profileDefault.png");

  async function selectFile(contentType, multiple) {
    return new Promise(resolve => {
      let input = document.createElement('input');
      input.type = 'file';
      input.multiple = false;
      input.accept = contentType;

      input.onchange = () => {
        let files = Array.from(input.files);
        if (multiple)
          resolve(files);
        else
          resolve(files[0]);
      };

      input.click();
    });
  }

  async function onButtonClicked() {
    let files = await selectFile("image/*", true);
    let fileUrls = files.map(file => URL.createObjectURL(file));
    setPicSrc(fileUrls[0]); // Assuming you only want to display the first selected image
  }

  return (
      <div className="profilepic">
        <img id="content" className="profilepic__image" src={picSrc} content="justify" width="150" height="150" alt="Profile" />
        <div className="profilepic__content" onClick={onButtonClicked}>
          <span className="profilepic__icon"><i className="fas fa-camera"></i></span>
          <span className="profilepic__text">Change Picture</span>
        </div>
      </div>
  );
};

export default ProfilePic;