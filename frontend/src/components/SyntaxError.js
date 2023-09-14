import React, { useState, useEffect } from 'react';
import Parser from 'java-parser';

function SyntaxError({ fileExtension1, fileContent1, file }) {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileExtension, setFileExtension] = useState('');
  const [javaFileNotice, setJavaFileNotice] = useState(false);
  const [syntaxErrors, setSyntaxErrors] = useState([]);

  useEffect(() => {
    if (fileExtension1 === 'java') {
      try {
        
        const parsedCode = Parser.parse(fileContent1);
        setFileName(file.name);
        setFileContent(fileContent1);
        setFileExtension(fileExtension1);
        setJavaFileNotice(false);
        setSyntaxErrors([]); 
      } catch (error) {
        
        setFileName(file.name);
        setFileContent(fileContent1);
        setFileExtension(fileExtension1);
        setJavaFileNotice(true);
        setSyntaxErrors([formatSyntaxError(error.message)]);
      }
    } else {
      setFileName(file.name);
      setFileContent(fileContent1);
      setFileExtension(fileExtension1);
      setJavaFileNotice(false);
      setSyntaxErrors([]); 
    }
  }, [fileExtension1, fileContent1, file]);


  const formatSyntaxError = (errorMessage) => {
    
    let cleanedErrorMessage = errorMessage.replace(/Sad sad panda/g, '').trim();
    
    cleanedErrorMessage = cleanedErrorMessage.replace(/parsing errors/g, '').trim();
  
    const parts = cleanedErrorMessage.split('!');
    
    if (parts.length > 1) {
      return `Syntax error ${parts[0].trim()} \n\n${parts[1].trim()}`;
    }
    
    return cleanedErrorMessage;
  };
  

  return (
    <div>
    
      {syntaxErrors.length > 0 && (
        <div>
          <h2>Syntax Errors:</h2>
          <ul>
            {syntaxErrors.map((error, index) => (
              <li key={index}>
                <p>{error}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      
    </div>
  );
}

export default SyntaxError;
