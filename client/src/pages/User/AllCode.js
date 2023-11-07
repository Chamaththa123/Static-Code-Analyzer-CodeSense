import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserUploadedFiles() {
    const [userFiles, setUserFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCode();
    }, []);

    const getCode = () => {
        axios
            .get(`http://localhost:8000/code`)
            .then((res) => {
                setUserFiles(res.data);
                setLoading(false);
            })
            .catch((err) => {
                alert(err.message);
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Uploaded Files</h2>
            {loading ? (
                <p>Loading files...</p>
            ) : (
                <ul>
                    {userFiles.length === 0 ? (
                        <p>No files uploaded yet.</p>
                    ) : (
                        userFiles.map((file) => (
                            <li key={file._id}>
                                <div>
                                    <strong>File Name:</strong> {file.file}
                                </div>
                                <div>
                                    <strong>Uploaded At:</strong> {new Date(file.createdAt).toLocaleString()}
                                </div>
                                <div>
                                    <a href={`http://localhost:8000/uploads/${file.file}`} target="_blank" rel="noreferrer">
                                        Download
                                    </a>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}

export default UserUploadedFiles;
