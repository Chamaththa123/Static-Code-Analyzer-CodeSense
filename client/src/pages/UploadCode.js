import React, { useState } from "react";
import axios from 'axios';
import Sidebar from '../components/Layout/Sidebar';
import './CodeUpload.css';
import Header from '../components/Layout/Header';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import SyntaxError from "../components/analysis/SyntaxError";
import Count from "../components/analysis/Count";

function UploadCode() {
  const [file, setFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileExtension, setFileExtension] = useState(null);
  const [date, setDate] = useState('');
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFileName(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {

      setFile(file.name);
      setFileExtension(getFileExtension(file.name));
      setFileContent(reader.result);
    };

    reader.onerror = () => {
      console.log('File read error:', reader.error);
    };
  };

  const getFileExtension = filename => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  };
  const saveCode = async (e) => {
    e.preventDefault();

    if (!file || !fileContent) {
      setError("Please select a file to upload.");
      return;
    }

    const code = {
      codeName: file.name,
      codeData: fileContent,
    };

    try {
      const response = await axios.post("/users/addcode", code, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Success:", response.data);
      } else {
        console.log("Error:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderCodeWithClassHighlight = () => {
    const lines = fileContent.split('\n');
    let insideForLoop = false;
    let insideWhileLoop = false;
    let insideMultiLineComment = false;

    const isComment = (line) => {
      return line.trim().startsWith('//');
    };

    const highlightClasses = (line) => {
      const classRegex = /\bclass\s+(\w+)\b/g;
      return line.replace(classRegex, (match) => {
        return `<span style="color: orange;">${match}</span>`;
      });
    };


    return (
      <div>
        <pre>
          {lines.map((line, index) => {
            // Check for multi-line comment
            if (line.includes('/*')) {
              insideMultiLineComment = true;
            }
            if (line.includes('*/')) {
              insideMultiLineComment = false;
            }

            // Check for single-line comment
            if (isComment(line)) {
              return (
                <div key={index}>
                  <span style={{ marginRight: '10px', color: 'green' }}>
                    {index + 1}
                  </span>
                  <span style={{ color: 'green' }}>{line}</span>
                </div>
              );
            }

            // Check for if and else
            if ((line.includes('if') || line.includes('else')) && !insideMultiLineComment) {
              return (
                <div key={index}>
                  <span style={{ marginRight: '10px', color: 'red' }}>
                    {index + 1}
                  </span>
                  <span style={{ color: 'red' }}>{line}</span>
                </div>
              );
            }

            // Check for for loop
            if (line.includes('for') && !insideMultiLineComment) {
              insideForLoop = true;
            } else if (line.includes('}') && insideForLoop) {
              insideForLoop = false;
            }

            // Check for while loop
            if (line.includes('while') && !insideMultiLineComment) {
              insideWhileLoop = true;
            } else if (line.includes('}') && insideWhileLoop) {
              insideWhileLoop = false;
            }

            return (
              <div key={index}>
                <span style={{ marginRight: '10px' }}>{index + 1}</span>
                <span
                  style={{
                    color: insideForLoop ? '#164EFC' : (insideWhileLoop ? '#52F2C7' : 'inherit'),
                  }}
                  dangerouslySetInnerHTML={{
                    __html: highlightClasses(line)
                  }} />
              </div>
            );
          })}
        </pre>
      </div>
    );
  };

  return (
    <div>
      <Sidebar />
      <div className='main'>
        <Header />
        <div className='content'>
          <h3>Upload Code File</h3>
          <input type="file" name="file" onChange={handleFileChange} />
          {file && (
            <div>
              <p>File Name: {file.name}</p>
              <p>Code: This is  Code</p>
            </div>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={saveCode} encType="multipart/form-data">
            <Button className="submit-btn" type="submit">Save Code</Button>
          </form>
          <br /><br /><br />
          {file && (
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0" style={{ backgroundColor: '#0e0e1f', color: 'white', borderRadius: '10px' }}>
                <Accordion.Header><c style={{fontWeight:600}}> Original Code</c></Accordion.Header>
                <Accordion.Body style={{ backgroundColor: '#0e0e1f', color: 'white', borderRadius: '10px' }}>
                  <p style={{ textAlign: 'center' }}>
                    <span style={{ color: 'orange' }}>• </span> Classes {' '}&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{ color: '#164EFC' }}>• </span> For Loop{' '}&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{ color: '#52F2C7' }}>• </span> While Loop{' '}&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{ color: 'red' }}>• </span> If-Else{' '}&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{ color: 'green' }}>• </span> Comments{' '}
                  </p>
                  {renderCodeWithClassHighlight()}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )}
          <br />
          {file && (
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0" style={{ backgroundColor: '#0e0e1f', color: 'white', borderRadius: '10px' }}>
                <Accordion.Header><b><c style={{fontWeight:600}}> Raw Metrics</c></b></Accordion.Header>
                <Accordion.Body style={{ backgroundColor: '#0e0e1f', color: 'white', borderRadius: '10px' }}>
                <Count fileExtension1={fileExtension} fileContent1={fileContent} file={fileName} />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )}
          <br />
          {file && (
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0" style={{ backgroundColor: '#0e0e1f', color: 'white', borderRadius: '10px' }}>
                <Accordion.Header><b><c style={{fontWeight:600}}> Syntax Error</c></b></Accordion.Header>
                <Accordion.Body style={{ backgroundColor: '#0e0e1f', color: 'white', borderRadius: '10px' }}>
                  <SyntaxError fileExtension1={fileExtension} fileContent1={fileContent} file={fileName} />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadCode;
