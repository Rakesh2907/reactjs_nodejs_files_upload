import React, { useState } from 'react';
import { server } from '../server';
import axios from 'axios';

const FileUploadPage = () => {

    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleUpload = async () => {
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

            // Optionally, clear the selected files state
            setSelectedFiles(null);
            console.log(response.data);

        }catch (error) {
            console.error('Error uploading files:', error);
        }

    }

  return (
    <div>
      <h3>Upload Multiple files</h3>  
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Files</button>
    </div>
  )
}

export default FileUploadPage
