import { Col, message, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bus from "../components/Bus";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

function Home() {
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [buses, setBuses] = useState([]);

    const getBuses = async () => {

        try {
            dispatch(ShowLoading());
            const response = await axios.get(
                "/api/buses/get-all-buses",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(HideLoading());
            if (response.data.success) {
                setBuses(response.data.data);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        getBuses();
    }, []);

    return (
        <div>
            <Row gutter={[15, 15]}>
                {buses
                    .filter((bus) => bus.status === "Yet To Start")
                    .map((bus) => (
                        <Col lg={12} xs={24} sm={24}>
                            <Bus bus={bus} />
                        </Col>
                    ))}
            </Row>
        </div>
    );
}

export default Home;