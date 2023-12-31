import React, { useState, useEffect } from 'react';
import BarChart from './Graph';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Count({ fileExtension1, fileContent1, file }) {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [singleLineCommentsCount, setSingleLineCommentsCount] = useState(0);
  const [multiLineCommentsCount, setMultiLineCommentsCount] = useState(0);
  const [ifElseCount, setIfElseCount] = useState(0);
  const [forLoopCount, setForLoopCount] = useState(0);
  const [whileLoopCount, setWhileLoopCount] = useState(0);
  const [returnStatementCount, setReturnStatementCount] = useState(0);
  const [stringCount, setStringCount] = useState(0);
  const [intCount, setIntCount] = useState(0);
  const [doubleCount, setDoubleCount] = useState(0);
  const [booleanCount, setBooleanCount] = useState(0);
  const [floatCount, setFloatCount] = useState(0);

  useEffect(() => {
    
    const fileContentWithoutComments = fileContent1.replace(/\/\/[^\r\n]*|\/\*[\s\S]*?\*\//g, '');

    // Count if-else statements
    const ifElse = /\bif\b|\belse\b/g;
    const ifElseMatches = fileContentWithoutComments.match(ifElse);
    const ifElseCount = ifElseMatches ? ifElseMatches.length : 0;
    setIfElseCount(ifElseCount);

    // Count loops
    const forLoop = /\bfor\b/g;
    const whileLoop = /\bwhile\b/g;
    const forLoopMatches = fileContentWithoutComments.match(forLoop);
    const whileLoopMatches = fileContentWithoutComments.match(whileLoop);
    setForLoopCount(forLoopMatches ? forLoopMatches.length : 0);
    setWhileLoopCount(whileLoopMatches ? whileLoopMatches.length : 0);

    // Count return statements
    const returnStatement = /\breturn\b/g;
    const returnStatementMatches = fileContentWithoutComments.match(returnStatement);
    const returnStatementCount = returnStatementMatches ? returnStatementMatches.length : 0;
    setReturnStatementCount(returnStatementCount);

    // Count data types
    const string = /\bString\b/g;
    const int = /\bint\b/g;
    const double = /\bdouble\b/g;
    const boolean = /\bBoolean\b/g;
    const float = /\bfloat\b/g;

    const stringMatches = fileContentWithoutComments.match(string);
    const intMatches = fileContentWithoutComments.match(int);
    const doubleMatches = fileContentWithoutComments.match(double);
    const booleanMatches = fileContentWithoutComments.match(boolean);
    const floatMatches = fileContentWithoutComments.match(float);

    setStringCount(stringMatches ? stringMatches.length : 0);
    setIntCount(intMatches ? intMatches.length : 0);
    setDoubleCount(doubleMatches ? doubleMatches.length : 0);
    setBooleanCount(booleanMatches ? booleanMatches.length : 0);
    setFloatCount(floatMatches ? floatMatches.length : 0);

    setFileContent(fileContent1);

    // Count comments
    const singleLine = /\/\/[^\r\n]*/g;
    const multiLine = /\/\*[\s\S]*?\*\//g;
    const singleLineMatches = fileContent1.match(singleLine);
    const multiLineMatches = fileContent1.match(multiLine);
    

    setSingleLineCommentsCount(singleLineMatches ? singleLineMatches.length : 0);
    setMultiLineCommentsCount(multiLineMatches ? multiLineMatches.length : 0);
  }, [fileExtension1, fileContent1, file]);

  return (
    <div>
      <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Word frequency">
      <table className="table" style={{color:'white',width:'20%'}} >
        <thead>
          <tr>
            <th>Word</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td style={{textAlign:'center'}}>Return</td>
              <td style={{textAlign:'center'}}>{returnStatementCount}</td>
            </tr>
            <tr>
              <td style={{textAlign:'center'}}>String</td>
              <td style={{textAlign:'center'}}>{stringCount}</td>
            </tr>
            <tr>
              <td style={{textAlign:'center'}}>Int</td>
              <td style={{textAlign:'center'}}>{intCount}</td>
            </tr>
            <tr>
              <td style={{textAlign:'center'}}>Double</td>
              <td style={{textAlign:'center'}}>{doubleCount}</td>
            </tr>
            <tr>
              <td style={{textAlign:'center'}}>Boolean</td>
              <td style={{textAlign:'center'}}>{booleanCount}</td>
            </tr>
            <tr>
              <td style={{textAlign:'center'}}>Float</td>
              <td style={{textAlign:'center'}}>{floatCount}</td>
            </tr>
        </tbody>
      </table>
      </Tab>
      <Tab eventKey="profile" title="Bar Chart">
      <BarChart
        singleLineCommentsCount={singleLineCommentsCount}
        multiLineCommentsCount={multiLineCommentsCount}
        ifElseCount={ifElseCount}
        forLoopCount={forLoopCount}
        whileLoopCount={whileLoopCount}
        returnStatementCount={returnStatementCount}
        stringCount={stringCount}
        intCount={intCount}
        doubleCount={doubleCount}
        booleanCount={booleanCount}
        floatCount={floatCount}
      />
      </Tab>
      <Tab eventKey="contact" title="Pie Chart">
        Tab content for Contact
      </Tab>
    </Tabs>

      
    </div>
  );
}

export default Count;
