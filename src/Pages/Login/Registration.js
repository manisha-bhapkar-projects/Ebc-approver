import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";
import CustomeDropDown from "../../Components/CustomeDropDown/CustomeDropDown";
import { callRegistrationApi, callOrgListApi } from "../../Action/AuthAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
const Registration = (props) => {
  const [isError, setIsError] = useState({});
  const [isFocus, setIsFocus] = useState({});
  const [orgName, setOrgList] = useState([]);

  const history = useHistory();

  const [initialValues, setInitialValues] = useState({
    approverName: "",
    approverEmail: "",
    password: "",
    approverLevel: "",
    orgName: "",
    orgId: "",
  });

  useEffect(() => {
    getOrgList();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate(initialValues);
    setIsError(validation);

    props
      .callRegistrationApiAction(initialValues)
      .then((res) => {
        history.push(constants.ROUTE.LOGIN.LOGIN);
        CustomeNotification(
          "success",
          "Registered Successfully",
          "Success",
          2000
        );
      })
      .catch((error) => {
        let errors = {};
        let result = error.response.data;
        if ("email" in result) {
          errors.email = result.message;
        }
        if ("password" in result) {
          errors.password = result.message;
        }
        CustomeNotification(
          "error",
          error.response.data.message,
          "Error",
          2000
        );
      });
  };

  const handleChangeValue = (e) => {
    setInitialValues({
      ...initialValues,
      [e.target.name]: e.target.value,
    });
    setIsError({ ...isError, [e.target.name]: "" });
  };

  const getOrgList = () => {
    props
      .callOrgListApiAction()
      .then((res) => {
        setOrgList(
          res.data.data && res.data.data.length
            ? res.data.data.map((x) => {
                return {
                  ...x,
                  id: x._id,
                  value: x.orgName,
                };
              })
            : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const validate = (values) => {
    let errors = {};

    if (!values.email) {
      errors.email = "Email is Required";
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

  const updateDropdown = (id) => {
    let value = orgName.filter((x) => x.orgName === id);
    console.log("val",value);
    setInitialValues({
      ...initialValues,
      orgName: value[0].value,
      orgId: value[0]._id,
    });
  };

  return (
    <div className="login-Account-banner registartion-content-banner">
      <div className="login-row">
        <div className="main-logo">
          <div className="login-pg-logo">
            <img
              src="assets/images/LOGO-Energy-BC-Transpernt-White.png"
              alt="logo"
            />
          </div>
        </div>
        <div className="login-content ">
          <div className="login-form registartion-from">
            <h2>Registration</h2>
            <form>
              <div className="row">
                <div className="col-sm-8">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="approverName"
                      id="approverName"
                      placeholder="Approver Name"
                      type="text"
                      value={initialValues.approverName}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="approverEmail"
                      id="approverEmail"
                      placeholder="Approver Email"
                      type="text"
                      value={initialValues.approverEmail}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="col-sm-8">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="password"
                      id="password"
                      placeholder="Password"
                      type="text"
                      value={initialValues.password}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="col-sm-8">
                  <div className="form-group custom_from_dropdown">
                    <CustomeDropDown
                      data={orgName}
                      placeholder="Organization Name*"
                      value={initialValues.orgName}
                      onSelect={updateDropdown}
                    />
                  </div>
                </div>

                <div className="col-sm-8">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="orgId"
                      id="orgId"
                      placeholder="Organization ID"
                      type="text"
                      value={initialValues.orgId}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="col-sm-8">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="approverLevel"
                      id="approverLevel"
                      placeholder="Approver Level"
                      type="text"
                      value={initialValues.approverLevel}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn ml-3" onClick={handleSubmit}>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callRegistrationApiAction: callRegistrationApi,
      callOrgListApiAction: callOrgListApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Registration);
