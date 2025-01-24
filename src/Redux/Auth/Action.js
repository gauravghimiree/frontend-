import axios from "axios";
import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

const api = "http://localhost:8080";  // API base URL

export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
        const { data } = await axios.post(`${api}/auth/signup`, userData);
        console.log("Register success", data);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);  // Store JWT token
            dispatch({
                type: REGISTER_SUCCESS,
                payload: { user: data.user, jwt: data.jwt },
            });
        }
    } catch (error) {
        console.log("Error during registration:", error);
    }
};

export const login = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const { data } = await axios.post(`${api}/auth/signing`, userData);  // Correct URL for signin
        console.log("Login success", data);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);  // Store JWT token
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data.user, jwt: data.jwt },
            });
        }
    } catch (error) {
        console.log("Error during login:", error);
    }
};

export const getUser = () => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });

    try {
        const { data } = await axios.get(`${api}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,  // Use the JWT token
            },
        });
        dispatch({ type: GET_USER_SUCCESS, payload: data });
        console.log("User data fetched successfully", data);
    } catch (error) {
        console.log("Error during fetching user data:", error);
    }
};

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();  // Clear JWT and other data from localStorage
    console.log("User logged out successfully");
};
