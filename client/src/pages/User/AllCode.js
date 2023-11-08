import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import java from '../../images/java.png'
import download from '../../images/download.gif'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    const handleDownload = (fileName) => {
        axios
            .get(`http://localhost:8000/file/download/${fileName}`)
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                alert("Error downloading file: " + error.message);
            });
    };
    return (
        <div>
            <i> <h4>My Files</h4></i><br />
            {loading ? (
                <p>Loading files...</p>
            ) : (
                <ul>
                    {userFiles.length === 0 ? (
                        <p>No files uploaded yet.</p>
                    ) : (
                        userFiles.map((file) => (
                            <span key={file._id}>
                                <Card style={{ borderColor: 'white', margin: '1%' }}>
                                    <Row>
                                        <Col>
                                            <img src={java} alt='java.png' style={{ width: '20%' }} />
                                        </Col>
                                        <Col>
                                            {file.file}<br />
                                            {new Date(file.createdAt).toLocaleString()}
                                        </Col>
                                        <Col>
                                            <center><Button onClick={() => handleDownload(file.file)} style={{backgroundColor:'#0e0e1f'}}>Download File</Button></center>
                                        </Col>
                                    </Row>
                                </Card>
                            </span>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}

export default UserUploadedFiles;
