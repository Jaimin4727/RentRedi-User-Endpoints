import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setUserSlice } from "../redux/slice/user";
import { CREATE_USER, UPDATE_USER_BY_ID } from "../redux/types";
import { nanoid } from "@reduxjs/toolkit";

const UserForm = () => {
    const user = useSelector((state) => state.user);
    const errorMessage = useSelector((state) => state.users.error);
    const loading = useSelector((state) => state.users.loading);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({ name: "", zip_code: "" });

    useEffect(() => {
        if (errorMessage !== undefined && errorMessage !== null) {
            alert(errorMessage)
        }
    }, [errorMessage]);

    const handleChange = (prop) => (event) => {
        dispatch(setUserSlice({ ...user, [prop]: event.target.value }));
        setErrors({ ...errors, [prop]: "" }); // Clear error when typing
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { name: "", zip_code: "" };

        if (!user.name.trim()) {
            newErrors.name = "Name is required";
            valid = false;
        }
        if (!user.zip_code?.trim() || !/^[0-9]{5}(?:-[0-9]{4})?$/.test(user.zip_code)) {
            newErrors.zip_code = "Valid Zip Code is required";
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        if (validateForm()) {
            if (user.id === 0) {
                dispatch({ type: CREATE_USER, user: { ...user, id: nanoid(8) } });
            } else {
                dispatch({ type: UPDATE_USER_BY_ID, user });
            }
            dispatch(
                setUserSlice({
                    id: 0,
                    name: "",
                    zip_code: "",
                })
            );

        }
    };

    const handleClear = (event) => {
        event.preventDefault();
        setErrors({ name: "", zip_code: "" });
        dispatch(
            setUserSlice({
                id: 0,
                name: "",
                zip_code: "",
            })
        );
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <TextField
                    style={{ margin: "10px" }}
                    onChange={handleChange("name")}
                    label="Enter Name"
                    value={user.name}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    style={{ margin: "10px" }}
                    onChange={handleChange("zip_code")}
                    label="Enter Zip Code"
                    value={user.zip_code}
                    fullWidth
                    error={!!errors.zip_code}
                    helperText={errors.zip_code}
                />
                <Button
                    type="submit"
                    style={{ margin: "10px" }}
                    variant="contained"
                    size="medium"
                    disabled={loading}
                >
                    {!loading ? 'Submit' : 'Loading...'} 
                </Button>
                <Button
                    type="RESET"
                    style={{ margin: "10px" }}
                    variant="contained"
                    onClick={handleClear}
                >
                    Clear
                </Button>
            </form>
        </Container>
    );
};

export default UserForm;
