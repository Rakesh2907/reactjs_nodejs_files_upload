import '../App.css';
import React, { useState } from 'react';
import { server } from '../server';
import axios from 'axios';

const FileUploadPage = () => {

    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleUpload = async () => {
        if (selectedFiles === null) {
            console.error('No files selected for upload.');
            return;
        }

        const formData = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }

        try {
            const response = await axios.post(`${server}/file_upload/upload`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });

            // Optionally, clear the selected files state after a delay or use the response
            setTimeout(() => {
                setSelectedFiles(null);
            }, 1000); // Adjust the delay as needed

            console.log(response.data);

        }catch (error) {
            console.error('Error uploading files:', error);
        }

    }

  return (
    <div className='App'>
      <h3>Upload Multiple files</h3>  
      <input type="file" multiple onChange={handleFileChange} required />
      <button onClick={handleUpload}>Upload Files</button>
    </div>
  )
}

export default FileUploadPage
