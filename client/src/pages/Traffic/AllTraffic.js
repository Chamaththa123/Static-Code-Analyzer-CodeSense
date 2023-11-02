import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";
import Layout from "./../../components/Layout/Layout";
import "../../App.css";
function AllTraffic() {

    const [Traffic, setTraffic] = useState([]);
    console.log(Traffic);

    const id = useParams().id;
    console.log(id);

    useEffect(() => {
        getTraffic();
    }, [id]);
    const getTraffic = () => {
        axios
            .get("http://localhost:8000/traffic/")
            .then((res) => {
                setTraffic(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    };


    return (
        <Layout>
            <center><h3 className="traffic-header ">All Traffic Conditions</h3></center>

            <Table
                class="table table-bordered "
                striped
                style={{ width: "98%", margin: "10px", marginTop: "25px" }}
            >
                <thead>
                    <tr className="table-dark">
                        <th scope="col">Id</th>
                        <th scope="col">Bus No </th>
                        <th scope="col">Bus Route</th>
                        <th scope="col">Route Segment</th>
                        <th scope="col">Time of Day</th>
                        <th scope="col">Traffic Type</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {Traffic.map((Traffic, id) => {
                        return (
                            <>
                                <tr
                                    style={{
                                        borderStyle: "dotted",
                                        fontSize: "15px",
                                    }}
                                >
                                    <th scope="row" style={{ borderStyle: "dotted" }}>
                                        {id + 1}
                                    </th>

                                    <td style={{ borderStyle: "dotted" }}>{Traffic.bus}</td>
                                    <td style={{ borderStyle: "dotted" }}>
                                        {Traffic.route}
                                    </td>
                                    <td style={{ borderStyle: "dotted" }}>
                                        {Traffic.segment}
                                    </td>

                                    <td style={{ borderStyle: "dotted" }}>
                                        {Traffic.time}
                                    </td>

                                    <td style={{ borderStyle: "dotted" }}>
                                        {Traffic.type}
                                    </td>
                                    <td style={{ borderStyle: "dotted" }}>
                                        {Traffic.status}
                                    </td>

                                    <td style={{ borderStyle: "dotted" }}>
                                        <a
                                            href={`/Traffic/${Traffic._id}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            See More
                                        </a>
                                    </td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </Table>
        </Layout>
    )
}

export default AllTraffic
