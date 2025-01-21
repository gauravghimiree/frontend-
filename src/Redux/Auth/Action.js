import axios from "axios";
import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
import { API_BASE_URL } from './config/api.js';

export const register = userData => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        console.log("register success", data);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);  // Fixed: Store only the JWT token
            dispatch({ type: REGISTER_SUCCESS, payload: data });  // Fixed: Corrected Payload to payload
        }
    } catch (error) {
        console.log(error);
    }
};

export const login = userData => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/login`, userData);  // Fixed: Correct URL
        console.log("login success", data);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);  // Fixed: Store only the JWT token
            dispatch({ type: LOGIN_SUCCESS, payload: data });  // Fixed: Corrected Payload to payload
        }
    } catch (error) {
        console.log(error);
    }
};

export const getUser = () => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });

    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);  // Fixed: Store only the JWT token
            dispatch({ type: GET_USER_SUCCESS, payload: data });  // Fixed: Corrected Payload to payload
        }
        console.log("login successful");
    } catch (error) {
        console.log(error);
    }
};

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
};
