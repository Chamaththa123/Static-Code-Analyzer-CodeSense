import React, { useState } from 'react';
import Navbar from './NavBar';
import SyntaxError from './SyntaxError';
import Class from './Classes';
import Count from './Count';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CodeFile() {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileExtension, setFileExtension] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      setFileName(file.name);
      setFileContent(reader.result);
      setFileExtension(getFileExtension(file.name));
    };

    reader.onerror = () => {
      console.log('file error', reader.error);
    };


    const getFileExtension = filename => {
      return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
    };
  };


  const renderCodeWithLineNumbers = () => {
    const lines = fileContent.split('\n');
    let insideForLoop = false;
    let insideWhileLoop = false;
    let insideMultiLineComment = false;

    const isComment = (line) => {
      return line.trim().startsWith('//');
    };

    return (
      <div>
        <pre style={{ fontSize: '17px' }}>
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
            if (
              (line.includes('if') || line.includes('else')) &&
              !insideMultiLineComment
            ) {
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
                    color:
                      insideForLoop || insideWhileLoop
                        ? 'blue'
                        : 'inherit',
                  }}
                >
                  {line}
                </span>
              </div>
            );
          })}
        </pre>
      </div>
    );
  };


  return (
    <div className='App'>
      <Navbar />
      <div style={{  paddingTop: '5%' }}>
        <div style={{  paddingLeft: '2%' }}>
        <h3>Upload Java File</h3>
        <input type='file' onChange={handleFileChange}></input>
        </div>
        <br></br><br></br>
   


        <Row>
          <Col>
            <div class="card" style={{ backgroundColor: '#181833', color: 'white' }}>

              <ul>
                <li><p>File Name : {fileName}</p></li>
                <li>
                  <p>This is {fileExtension} file.</p>
                </li>

              </ul>
            </div>
<br></br>
            <div class="card" style={{ backgroundColor: '#181833', color: 'white' }}>

              <Class fileExtension1={fileExtension} fileContent1={fileContent} file={fileName} />
            </div>
            <br></br>

            <div class="card" style={{ backgroundColor: '#181833', color: 'white' }}>

              <Count fileExtension1={fileExtension} fileContent1={fileContent} file={fileName} />
            </div>
            <br></br>

            <div class="card" style={{ backgroundColor: '#181833', color: 'white' }}>

            <SyntaxError fileExtension1={fileExtension} fileContent1={fileContent} file={fileName} />
            </div>


          </Col>
          <Col>
            <div class="card" style={{ backgroundColor: '#181833', color: 'white', width: '100%' }}>

              {renderCodeWithLineNumbers()}
            </div>
          </Col>
        </Row>

      </div>

    </div>
  );
}

export default CodeFile;
