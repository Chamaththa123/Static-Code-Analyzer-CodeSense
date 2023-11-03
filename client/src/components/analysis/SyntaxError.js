import React, { useState, useEffect } from 'react';
import Parser from 'java-parser';

function SyntaxError({ fileExtension1, fileContent1, file }) {
  const [syntaxErrors, setSyntaxErrors] = useState([]);

  useEffect(() => {
    if (fileExtension1 === 'java') {
      try {
        const parsedCode = Parser.parse(fileContent1);
        setSyntaxErrors([]);
      } catch (error) {
        setSyntaxErrors([formatSyntaxError(error.message)]);
      }
    } else {
      setSyntaxErrors([]);
    }
  }, [fileExtension1, fileContent1]);

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
      {syntaxErrors.length > 0 ? (
        <div>
          <ul>
            {syntaxErrors.map((error, index) => (
              <li key={index}>
                <p>{error}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No syntax errors found in {file.name}</p>
      )}
    </div>
  );
}

export default SyntaxError;
