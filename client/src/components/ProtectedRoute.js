import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {SetUser} from "../redux/usersSlice";
import {HideLoading, ShowLoading} from "../redux/alertsSlice";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({children}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.users);

    const validateToken = async () => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post(
                "/api/users/get-user-by-id",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(HideLoading());
            if (response.data.success) {
                dispatch(SetUser(response.data.data));
            }else{
                localStorage.removeItem("token");
                message.error(response.data.message);
                navigate("/login");
            }
        }
        catch (error) {
            localStorage.removeItem("token");
            message.error(error.message);
            dispatch(HideLoading());
            navigate("/login");
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            validateToken();
        } else {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        if (window.location.pathname.includes("admin")) {
            if (!user?.isAdmin) {
                message.error("You are not authorized to access this page");
                window.location.href = "/";
            }
        }
    }, [user]);

    return (
        <div>
            {user !== null && <DefaultLayout>{children}</DefaultLayout>}
        </div>
    );
}

export default ProtectedRoute;