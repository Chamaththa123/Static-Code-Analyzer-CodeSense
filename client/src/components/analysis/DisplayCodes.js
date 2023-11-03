import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardBody, CardTitle,CardHeader, Col, Row, Table } from "reactstrap";




import Class from "components/code/Classes";
import Count from "components/code/Count";
import SyntaxError from "components/code/SyntaxError";
import DublicateCode from "components/code/dublicateCode";
import DisGraph from "components/code/disGraph";

function DisplayCodes() {
  const [oitems, setoitems] = useState([]);
  const [deletedItemId, setDeletedItemId] = useState(null);
  const id = useParams().id;

  const [code, setCode] = useState([]);
  // const [loading, setLoading] = useState(false);

  // const DelayedData = ({ code }) => {
  //   return (
  //     <div>
  //       {code.length > 0 ? (
  //         <ul>
  //           {code.map((item) => (
  //             <li key={item._id}>{item.codeName}</li>
  //           ))}
  //         </ul>
  //       ) : (
  //         <p>No data available.</p>
  //       )}
  //     </div>
  //   );
  // }

  
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);

    
  };
  const [file, setFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileExtension, setFileExtension] = useState('');
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

  // const saveCode = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  
  //   formData.append('codeName', fileName);
  //   formData.append('CodeData', fileContent);
  
  //   try {
  //     const response = await fetch('http://localhost:6000/api/v1/users/addcode', {
  //       method: 'POST',
  //       body: formData,
  //     });
  
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       alert('File Uploaded Successfully');
  //     } else {
  //       throw new Error('Error Uploading File');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert('Error Uploading File');
  //   }
  // };
  

  const codeName = file;
  const CodeData = fileContent;
  
  const saveCode = async (e) => {
    e.preventDefault();
  
    const code = {
      codeName,
      CodeData,
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

  const getFileExtension = filename => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  };



  const current = new Date();
  const dates = `${current.getDate()}/${current.getMonth() + 1
    }/${current.getFullYear()}`;

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
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/users/getallcode");
  
        if (res.status === 200) {
          setCode(res.data); // Assuming res.data is an array
          
        } else {
          alert('Error occurred while retrieving data!');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error occurred while retrieving data!');
        setCode([]); // Set a default value (an empty array) in case of an error
        
      }
    };
  
    fetchData();
  }, []);

  const deleteCode = async (_id) => {
    const res = await axios.delete(`/users/deletecode/${_id}`);
    if (res.status === 200) {
      alert("Code deleted successfully!");
      window.location.reload();
    } else {
      alert("Error occurred while deleting code!");
    }
  }


  // useEffect(() =>{
  //   axios.get("/users/getallcode").then((res) => {
  //     setCode(res.data);
  //   })

  // },[])
  // console.log(code);
  // console.log(loading)
  // console.log(code);

  return (
    <div  className="content">
      
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Saved Codes</h5>
                {/* {loading ? data.map(code =>{
                  return(
                    <div>
                      <h1>{code.codeName}</h1>
                    </div>
                  )
                }): <p>Loading data...</p>} */}
                {/* {Object.values(code).map((c, index) => (
                  <div key={index}>
                    {Object.values(c).map((item, index) => (
                      <div key={index}>
                        <h1>{item.codeName}</h1>
                      </div>
                    
                    ))}
                  </div>
                ))} */}

                <Table bordered={false} className="table-transparent">
                <thead>
                  </thead>
                  <tbody>
                    {Object.values(code).map((c, index) => (
                      <div key={index}>
                        {Object.values(c).map((item, index) => (
                          <div key={index}>
                            <tr key={item._id}>
                              <td>{item.codeName}</td>
                              <td><Button onClick={() => deleteCode(item._id)}>Delete File</Button></td>
                              
                            </tr>
                          </div>
                        
                        ))}
                      </div>
                    ))}
                  </tbody>
                </Table>

              </CardHeader>
              <CardBody>
                
              </CardBody>
            </Card>
          </Col>     
        
        <div className="content">
        
      
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                {/* <h5 className="card-category">Upload Code File</h5> */}
                <CardTitle tag="h4">Upload Code File</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                
            
              <Col>

                <input type="file" name="file" onChange={handleFileChange} />

                <form onSubmit={saveCode} encType="multipart/form-data">
                  <input type="text" name="codeName" onChange={(e) => setFile(e.target.value)} value={codeName} required style={{ visibility: 'hidden' }}/>
                  <input type="text" name="CodeData" onChange={(e) => setFileContent(e.target.value)} value={CodeData} required style={{ visibility: 'hidden' }} />
                  <Button>submit</Button>
                </form>


                {/* <br></br>
                <input type="file" name="file" onChange={handleFileChange} style={{ marginTop: '-500px' }} />
          
              
                <form onSubmit={submitHandler()}>
                
                <input type="text" name="codeName" value={file} />
                <input type="text" name="CodeData" value={fileContent}  />
                  <Button type="submit"  >
                    Save Code
                  </Button>
                </form> */}
                </Col>
             

            {/* {fileName && (
              <div>
                <p>File Name: {file}</p>
                <p>Code: This is {fileExtension} Code</p>
              </div>
            )} */}
                </div>
              </CardBody>
            </Card>
          </Col>
          
          
          
       
      
      
        <Row>
          
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Duplicate Code Lines</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  
                  <tbody>
                  <DublicateCode fileExtension1={fileExtension} fileContent1={fileContent} file={fileName} />
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          
          
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">RAW Code</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  
                  <tbody>
                  
            {renderCodeWithLineNumbers()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          {/* <Metrics fileExtension1={fileExtension} fileContent1={fileContent} file={fileName}/> */}
        </Row>
      </div>
    </div>
  );
}

export default DisplayCodes;
