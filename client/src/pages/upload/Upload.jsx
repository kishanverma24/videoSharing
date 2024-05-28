import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./upload.css";
function Upload() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [imgUrl, setImgurl] = useState();
  const [videoUrl, setVideourl] = useState();
  const [tags, setTags] = useState();
  const navigate = useNavigate();
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8800/api/video/addvideo", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imgUrl,
          videoUrl,
          tags,
        }),
      });
      const data = await response.json();
      if (data.success) {
        navigate("/");
      } else {
        window.alert("Uploading Failed");
        navigate("/upload");
      }
    } catch (error) {
      console.log("Error while uploading!", error);
    }

    console.log("Uploaded Successfully!");
  };
  return (
    <div className="uploadcontainer">
      <h1>Upload New Video</h1>
      <hr style={{ width: "50%", marginBottom: "5px" }} />
      <div className="mainuploadcontainer">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          value={title}
        />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          value={description}
        />

        <input
          type="text"
          onChange={(e) => setImgurl(e.target.value)}
          placeholder="ImageUrl"
          value={imgUrl}
        />
        <input
          type="text"
          onChange={(e) => setVideourl(e.target.value)}
          placeholder="VideoUrl"
          value={videoUrl}
        />
        <input
          type="text"
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags"
          value={tags}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div />
    </div>
  );
}

export default Upload;
