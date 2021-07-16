import React, { useState } from 'react';
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";
import constants from "../../utils/constants";
import { Link, useHistory } from "react-router-dom";
import { storeAuthToken, storeAccountData } from "../../utils/storage/index";
import { callLoginApi } from '../../Action/AuthAction';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const Login = (props) => {
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [initialValues, setInitialValues] = useState({
        strategy: "local",
        approverEmail: "",
        password: "",
    });
    const [isError, setIsError] = useState({});
    const [isFocus, setIsFocus] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = validate(initialValues);
        setIsError(validation);
        props
        .callLoginApiAction(initialValues)
        .then((res) => {
            console.log("Login response", res);
            storeAuthToken(res.data.accessToken);
            console.log("res.data.accessToken", res.data.accessToken);
            console.log("res.data.approver", res.data.approver);
            storeAccountData(res.data.approver);
            history.push(constants.ROUTE.SIDEBAR.APPROVER);
            CustomeNotification("success", "Login Successfully", "Success", 2000);
        })
        .catch((error) => {
            if(error?.response?.data?.message){
                CustomeNotification(
                    "error",
                    error.response.data.message,
                    "Error",
                    2500,
                    () => {}
                );
            }
        });

    };

    const handleChangeValue = (e) => {
        setInitialValues({
            ...initialValues,
            [e.target.name]: e.target.value.trim(),
        });
        setIsError({ ...isError, [e.target.name]: "" });
    };


    const validate = (values) => {
        let errors = {};
        if (!values.approverEmail) {
            errors.approverEmail = "Email is Required";
        }
        if (!values.password) {
            errors.password = "Password is Required";
        }
        return errors;
    };


    const handleFocus = (e) => {
        const validation = validate(initialValues);
        setIsError(validation);
        setIsFocus({ ...isFocus, [e.target.name]: true });
    };

    return (
        <div className="login-registration-banner">
            <div className="login-row">
                <div className="main-logo">
                    <div className="login-pg-logo">
                        <img
                            src="assets/images/LOGO-Energy-BC-Transpernt-White.png"
                            alt="logo" />
                    </div>
                </div>
                <div className="login-content">
                    <div className="login-form">
                        <h2>Login</h2>
                        <form>
                            <div className="form-group">
                                <TextFieldComponent
                                    className=""
                                    name="approverEmail"
                                    id="exampleInputEmail1"
                                    placeholder="Email"
                                    type="text"
                                    value={initialValues.approverEmail}
                                    onBlur={handleFocus}
                                    onChange={handleChangeValue}
                                    error
                                    helperText={isError.approverEmail}
                                />
                            </div>
                            <div className="form-group">
                                <div className="password-input">
                                    <TextFieldComponent
                                        className=""
                                        name="password"
                                        id="exampleInputPassword1"
                                        placeholder="Password"
                                        type={showPassword ? "text" : "password"}
                                        value={initialValues.password}
                                        onBlur={handleFocus}
                                        onChange={handleChangeValue}
                                        error
                                        helperText={isError.password}
                                        helperTextClassName="errormsg"
                                    />
                                    <a href="#">
                                        <img src="assets/images/Icons/Password-visible.png"
                                            onClick={() => setShowPassword(!showPassword)}
                                            alt="view" />
                                    </a>
                                </div>
                                <small
                                    id="emailHelp"
                                    className="form-text">
                                    <a href="#">Forgot Password</a></small>
                            </div>
                            <button
                                type="submit"
                                className="btn"
                                onClick={handleSubmit}>Login</button>
                        </form>
                        <p>Don't have an account?
                                <Link to={constants.ROUTE.LOGIN.REGISTRATION}> Register now</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            callLoginApiAction: callLoginApi,
        },
        dispatch
    );

export default connect(null, mapDispatchToProps)(Login);