import React, { useEffect, useState } from 'react';

function UserUploadedFiles() {
    const [userFiles, setUserFiles] = useState([]);

    useEffect(() => {
        // Fetch the user's uploaded files from the backend
        fetch('/api/user/codes', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Replace with your actual token retrieval
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUserFiles(data);
            })
            .catch((error) => {
                console.error('Error fetching user files:', error);
            });
    }, []);

    return (
        <div>
            <h2>Uploaded Files</h2>
            {userFiles.length === 0 ? (
                <p>No files uploaded yet.</p>
            ) : (
                <ul>
                    {userFiles.map((file) => (
                        <li key={file._id}>
                            {/* Display file information, you can customize this part */}
                            <div>File Name: {file.file}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserUploadedFiles;
