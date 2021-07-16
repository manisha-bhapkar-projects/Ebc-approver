import React, { useState } from "react";
import { bindActionCreators } from "redux";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import { callGetTransactionApi } from "../../Action/EnergyAction";
import { connect } from "react-redux";
import { getAccountData } from "../../utils/storage/index";
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";
import { callAddEnergyAndFundAPI } from "../../Action/EnergyAction";
const LoadEnergy = (props) => {
  let accountData = getAccountData();
  const accountID = accountData._id;
  const [initialValues, setInitialValues] = useState({
    units: "",
    sourceType: "",
    userName: "",
  });

  const request = {
    units: parseInt(initialValues.units),
    sourceType: initialValues.sourceType,
    accountId: accountID,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props
      .callAddEnergyAndFundAPIAction(request)
      .then((res) => {
        console.log("add energy", res);
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
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
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="main-pg-content ml-5">
      <h5 class="title-page-content">Load Energy For Account</h5>
      <div className="row">
        <div className="col-sm-5">
          <div className="acount-info add-device-form">
            <form action>
              <div className="form-group row align-items-center">
                <label htmlFor="accountId" className="col-sm-4 col-form-label">
                  Units:
                </label>
                <div className="col-sm-8">
                  <TextFieldComponent
                    className=""
                    name="units"
                    id="units"
                    type="text"
                    value={initialValues.units}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>
              <div className="form-group row align-items-center">
                <label htmlFor="userName" className="col-sm-4 col-form-label">
                  Source Type:
                </label>
                <div className="col-sm-8">
                  <TextFieldComponent
                    className=""
                    name="sourceType"
                    id="sourceType"
                    type="text"
                    value={initialValues.sourceType}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>
              <div className="form-group row align-items-center">
                <label htmlFor="firstName" className="col-sm-4 col-form-label">
                  User Name:
                </label>
                <div className="col-sm-8">
                  <TextFieldComponent
                    className=""
                    name="userName"
                    id="userName"
                    type="text"
                    value={initialValues.userName}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="page-nav-btn">
        <button
          className="btn-primary btn btn-icon-text mb-2 mb-md-0"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callGetTransactionApiAction: callGetTransactionApi,
      callAddEnergyAndFundAPIAction: callAddEnergyAndFundAPI,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(LoadEnergy);
