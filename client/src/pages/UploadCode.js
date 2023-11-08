import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Sidebar from '../components/Layout/Sidebar';
import './CodeUpload.css';
import Header from '../components/Layout/Header';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import SyntaxError from "../components/analysis/SyntaxError";
import Count from "../components/analysis/Count";
import DublicateCode from "../components/analysis/dublicateCode";
import Class from "../components/analysis/Classes";
import { Lexer } from "chevrotain";
import { allTokens } from "../components/analysis/code_Metrics";
import { parse } from "java-parser";
import { isBranchStatement, isIterationStatement, isSwitchStatement, isClassDeclaration, countCases } from "../components/analysis/codeAnalysis";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useAuth } from "../context/auth";

function UploadCode() {
  const [file, setFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileExtension, setFileExtension] = useState(null);
  const [userId, setuserId] = useState('');
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState('');

  const [tokens, setTokens] = useState([]);
  const [tokenizing, setTokenizing] = useState(false);

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

  const [auth, setAuth] = useAuth();


  const saveCode = async (e) => {
    e.preventDefault();
    const userId = auth?.user?._id;

    if (!file || !fileContent) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', fileName);

    setuserId('');
    setFileName('');

    axios
      .post('http://localhost:8000/file/save', formData)
      .then((res) =>
        window.alert('Item Add is Successfully')
      )
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  let nestingLevel = 0;
  let currentNestingLevel = 0;
  let classStart = 0;
  let inheritance = 0;

  function isMethodDeclaration(code) {
    // Check for the presence of access modifiers and the absence of "class" and "main"
    if ((code.includes("public") || code.includes("private") || code.includes("protected")) &&
      !code.includes("class") && !code.includes("main")) {
      return true;
    }
    return false;
  }
  const removeComments = fileContent.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
  let caseCount = countCases(removeComments);
  // findInheritance(input);

  // console.log(caseCount);

  const lines = removeComments.split("\n");

  console.log(lines);

  var report = [];

  for (const line of lines) {
    const startReprt = {
      line: '',
      metric: {
        typeOfControlStructure: 0,
        nestingLevelStructure: 0,
        inheritanceLevelStructure: 0
      }
    }

    if (line.includes("class")) {
      classStart++;
    }
    if (line.includes("}")) {
      classStart--;
    }

    const lexer = new Lexer(allTokens);
    const tokenArray = lexer.tokenize(line);
    // console.log(tokenArray.tokens.length);

    startReprt.line = line;

    //Weight Due to Type of Control Structures (Wc)
    if (isBranchStatement(line)) {
      startReprt.metric.typeOfControlStructure = 1;

    }
    if (isIterationStatement(line)) {
      startReprt.metric.typeOfControlStructure = 2;
    }
    if (isSwitchStatement(line)) {
      startReprt.metric.typeOfControlStructure = 3;
    }

    // Weight Due to Nesting Level of Control Structures (Wn)
    if (!isClassDeclaration(line) && !isMethodDeclaration(line)) {
      if (line.includes("{")) {
        currentNestingLevel++;
      } else if (line.includes("}")) {
        currentNestingLevel--;
        currentNestingLevel = Math.max(currentNestingLevel, 0); // Ensure it's not negative
      }
    }

    // Weight Due to Size of Control Structures (Wi)
    if (isClassDeclaration(line)) {
      startReprt.metric.nestingLevelStructure = 0;
      if (line.includes("{")) {
        inheritance++;
      }
      else if (line.includes("}")) {
        inheritance--;
        inheritance = Math.max(inheritance, 0);
      }
    }




    startReprt.metric.inheritanceLevelStructure = inheritance;
    startReprt.metric.nestingLevelStructure = currentNestingLevel;

    //WC = wi + wn + wc
    startReprt.metric.WC = startReprt.metric.inheritanceLevelStructure + startReprt.metric.nestingLevelStructure + startReprt.metric.typeOfControlStructure;

    //complexity = WC * no of tokens
    if (startReprt.metric.WC == 0) {

      startReprt.metric.complexity = startReprt.metric.WC * tokenArray.tokens.length;
    }
    if (startReprt.metric.WC >= 1) {
      startReprt.metric.complexity = startReprt.metric.WC * tokenArray.tokens.length;
    }



    report.push(startReprt);

  }


  console.log(report);

  const tokenizeJavaCode = () => {
    setTokenizing(true);
    try {
      const lexer = new Lexer(allTokens);
      const { tokens } = lexer.tokenize(removeComments);
      setTokens(tokens);
    } catch (error) {
      // Handle parsing errors here
      console.error("Parsing error:", error.message);
    } finally {
      setTokenizing(false);
    }
  };

  const clearTokens = () => {
    setTokens([]);
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
          <form onSubmit={saveCode} encType="multipart/form-data">
            <input type="file" name="file" onChange={handleFileChange} />
            {file ? (
              <div>
                <br />

                <Button className="submit-btn" type="submit" style={{backgroundColor:'#0e0e1f'}}>Save File</Button>

              </div>
            ) : (

              <div>
                <br /><br />
                <center><h2>Welcome to <span style={{ fontWeight: 200 }}><><i>CodeSense</i></></span></h2></center>
                <p>Are you a Java developer looking to improve your code quality, optimize performance, and enhance your software's maintainability? </p>
                <p><i>Look no further!</i> Our Code Analyzer for Java is your go-to tool for assessing and improving your Java codebase. This web app provides a comprehensive suite of features to make your coding experience better and more efficient.</p>
                <h5>How to Use:</h5>
                <ul>
                  <li><b>Upload Your Java Code: </b> Click on the "Upload Code" button, select your Java file, and upload it. You'll instantly see your original code content.</li>
                  <li><b>Analyze Complexity: </b>Click the "Analyze Complexity" button to assess your code's complexity. Understand where improvements are needed to enhance performance and maintainability.</li>
                  <li><b>View Software Composition Metrics:</b>Explore software composition metrics to visualize your code's structure, class dependencies, and more.</li>
                  <li><b>Identify Syntax Errors: </b>Check for syntax errors in your code by clicking the "Check Syntax" button. We'll highlight any issues for you to address.</li>
                  <li><b>Detect Duplicated Code: </b>The "Detect Duplicates" feature will identify and display duplicated code segments, making it easy for you to refactor your codebase.</li>
                  <li><b>Recalculate Complexity: </b>After resolving duplicated code, use the "Recalculate Complexity" button to reassess your code's complexity without the redundancy.</li>
                </ul>
                <p>Start using our Code Analyzer for Java today to optimize your code, improve its quality, and streamline your development process. Whether you're a seasoned Java developer or
                  just getting started, our web app is here to support you in your coding journey.</p>
                <p><i>Make your Java code cleaner, more efficient, and error-free with the Code Analyzer for Java. Happy coding!</i></p>
              </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <br /><br /><br />
            {file && (
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" style={{ backgroundColor: '#0e0e1f', color: 'white', borderRadius: '10px' }}>
                  <Accordion.Header><c style={{ fontWeight: 600 }}> Original Code</c></Accordion.Header>
                  <Accordion.Body style={{ backgroundColor: '#0e0e1f', color: 'white', borderRadius: '10px' }}>
                    <Tabs
                      defaultActiveKey="profile"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab eventKey="profile" title="Original Code">
                        <p style={{ textAlign: 'center' }}>
                          <span style={{ color: 'orange' }}>• </span> Classes {' '}&nbsp;&nbsp;&nbsp;&nbsp;
                          <span style={{ color: '#164EFC' }}>• </span> For Loop{' '}&nbsp;&nbsp;&nbsp;&nbsp;
                          <span style={{ color: '#52F2C7' }}>• </span> While Loop{' '}&nbsp;&nbsp;&nbsp;&nbsp;
                          <span style={{ color: 'red' }}>• </span> If-Else{' '}&nbsp;&nbsp;&nbsp;&nbsp;
                          <span style={{ color: 'green' }}>• </span> Comments{' '}
                        </p>
                        {renderCodeWithClassHighlight()}
                      </Tab>
                      <Tab eventKey="home" title="Calculate Complexity for Original Code">
                        <table className="table" style={{ color: 'white' }}>
                          <thead>
                            <tr>
                              <th>Line No</th>
                              <th>Tokens</th>
                              <th>Wc</th>
                              <th>Wi</th>
                              <th>Wc</th>
                              <th>Wt</th>
                              <th >Complexity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {report.map((item, index) => (
                              <tr key={index}>
                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                <td>{item.line}</td>
                                <td style={{ textAlign: 'center' }}>{item.metric.typeOfControlStructure}</td>
                                <td style={{ textAlign: 'center' }}>{item.metric.nestingLevelStructure}</td>
                                <td style={{ textAlign: 'center' }}>{item.metric.inheritanceLevelStructure}</td>
                                <td style={{ textAlign: 'center' }}>{item.metric.WC}</td>
                                <td style={{ textAlign: 'center' }}>{item.metric.complexity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Tab>
                    </Tabs>



                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
            <br />
            {file && (
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" style={{ backgroundColor: '#0e0e1f', color: 'white', borderRadius: '10px' }}>
                  <Accordion.Header><b><c style={{ fontWeight: 600 }}> Row Software Composition Analysis Metrics</c></b></Accordion.Header>
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
                  <Accordion.Header><b><c style={{ fontWeight: 600 }}>Identified Classes and Inheritance</c></b></Accordion.Header>
                  <Accordion.Body style={{ backgroundColor: '#0e0e1f', color: 'white', borderRadius: '10px' }}>
                    <Class fileExtension1={fileExtension} fileContent1={fileContent} file={fileName} />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
            <br />
            {file && (
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" style={{ backgroundColor: '#0e0e1f', color: 'white', borderRadius: '10px' }}>
                  <Accordion.Header><b><c style={{ fontWeight: 600 }}> Syntax Errors</c></b></Accordion.Header>
                  <Accordion.Body style={{ backgroundColor: '#0e0e1f', color: 'white', borderRadius: '10px' }}>
                    <SyntaxError fileExtension1={fileExtension} fileContent1={fileContent} file={fileName} />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
            <br />
            {file && (
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" style={{ backgroundColor: '#0e0e1f', color: 'white', borderRadius: '10px' }}>
                  <Accordion.Header><b><c style={{ fontWeight: 600 }}> Duplicate Codes</c></b></Accordion.Header>
                  <Accordion.Body style={{ backgroundColor: '#0e0e1f', color: 'white', borderRadius: '10px' }}>
                    <DublicateCode fileExtension1={fileExtension} fileContent1={fileContent} file={fileName} />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadCode;
