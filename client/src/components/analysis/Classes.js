import React, { useState, useEffect } from 'react';

function Class({ fileExtension1, fileContent1, file }) {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileExtension, setFileExtension] = useState('');
  const [javaFileNotice, setJavaFileNotice] = useState(false);
  const [classInfo, setClassInfo] = useState([]);
  const [baseClass, setBaseClass] = useState('');

  useEffect(() => {
    
    fileContent1 = removeComments(fileContent1);

    if (fileExtension1 === 'java') {
      try {
        const Class = /class\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?:extends\s+([A-Za-z_][A-Za-z0-9_]*))?/g;
        const matches = [...fileContent1.matchAll(Class)];

        // Extract class information including class name and inheritance
        const classInfo = matches.map((match) => {
          const className = match[1];
          const inheritance = match[2] || 'No inheritance';

          // Check if this is the base class
          if (inheritance === 'No inheritance' &&  className!=='Main') {
            setBaseClass(className);
          }

          return {
            className,
            inheritance,
          };
        });

        setFileName(file.name);
        setFileContent(fileContent1); 
        setFileExtension(fileExtension1);
        setJavaFileNotice(false);
        setClassInfo(classInfo); 
      } catch (error) {
        
        console.error(error);

        setFileName(file.name);
        setFileContent(fileContent1);
        setFileExtension(fileExtension1);
        setJavaFileNotice(false);
        setClassInfo([]); 
        setBaseClass(''); 
      }
    } else {
      setFileName(file.name);
      setFileContent(fileContent1); 
      setFileExtension(fileExtension1);
      setJavaFileNotice(false);
      setClassInfo([]); 
      setBaseClass(''); 
    }
  }, [fileExtension1, fileContent1, file]);

  const removeComments = (fileContent1) => {
    
    return fileContent1.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '');
  };

  return (
    <div>
      

      

      {classInfo.length > 0 && (
        <div>
          <h2>All Classes:</h2>
          <ul>
            {classInfo.map((classData, index) => (
              <li key={index}>
                <p1>Class {classData.className}</p1>
              </li>
            ))}
          </ul>
        </div>
      )}
      <br></br>
{baseClass && (
        <div>
          <h2>Base Class:</h2>
          <p>Class {baseClass}</p>
        </div>
      )}
      
      {classInfo.length > 0 && (
        <div>
          <h2>Inheritance:</h2>
          <ul>
  {classInfo.map((classData, index) => (
    <li key={index}>
      <strong>Class Name:</strong> {classData.className}
      <br />
      <strong>Inheritance:</strong> {classData.inheritance}

      {classData.inheritance === 'No inheritance' ? (
        <p>{classData.className} does not inherit from any class</p>
      ) : (
        <p>
          {classData.className} inherits the properties and methods of the{' '}
          {classData.inheritance}
        </p>
      )}
    </li>
  ))}
</ul>

        </div>
      )}
    </div>
  );
}

export default Class;
