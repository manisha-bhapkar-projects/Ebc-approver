import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import {callGetTransactionApi} from "../../Action/EnergyAction";
import { getAccountData } from "../../utils/storage/index";

const GetEnergy = (props) => {
  const accountData = getAccountData();
  const id = accountData._id;

  const [initialValues, setInitialValues] = useState({
    units: "",
    sourceType: "",
    userName: "",
    energyAllocatedOffers: "",
    energyAvailable: "",
    energyBalance: "",
    energyConsumed: "",
    energyProduced: "",
    energyPurchasedOthers: "",
    energyPurchasedUtility: "",
    energySoldOthers: "",
    energySoldUtility: "",
    accountId:"",
    email:""
  });

  useEffect(()=>{
    console.log("accountData id", id);
    getEnergyList(id);
    },[])

  const getEnergyList = (id) => {
    props
        .callGetTransactionApiAction(id)
        .then((res) => {
            console.log("energy List", res);
        })
        .catch((error) => {
            console.log(error);
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
      <h5 class="title-page-content">Get Energy For Account</h5>
      <div className="row">
        <div className="col-sm-5">
          <div className="acount-info add-device-form">
            <form action>
              <div className="form-group row align-items-center">
                <label htmlFor="accountId" className="col-sm-4 col-form-label">
                  Account ID:
                </label>
                <div className="col-sm-8">
                  <TextFieldComponent
                    className=""
                    name="accountId"
                    id="accountId"
                    type="text"
                    value={initialValues.accountId}
                    readOnly
                    onChange={handleChangeValue}
                  />
                </div>
              </div>

              <div className="form-group row align-items-center">
                <label htmlFor="accountId" className="col-sm-4 col-form-label">
                  Email:
                </label>
                <div className="col-sm-8">
                  <TextFieldComponent
                    className=""
                    name="email"
                    id="email"
                    type="text"
                    value={initialValues.email}
                    readOnly
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
                    readOnly
                    value={initialValues.userName}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>

              <div className="form-group row align-items-center">
                <label htmlFor="firstName" className="col-sm-4 col-form-label">
                  Energy Allocated Offers:
                </label>
                <div className="col-sm-8">
                  <TextFieldComponent
                    className=""
                    name="energyAllocatedOffers"
                    id="energyAllocatedOffers"
                    type="text"
                    readOnly
                    value={initialValues.energyAllocatedOffers}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>

              <div className="form-group row align-items-center">
                <label htmlFor="firstName" className="col-sm-4 col-form-label">
                  Energy Available:
                </label>
                <div className="col-sm-8">
                  <TextFieldComponent
                    className=""
                    name="energyAvailable"
                    id="energyAvailable"
                    type="text"
                    readOnly
                    value={initialValues.energyAvailable}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>

              <div className="form-group row align-items-center">
                <label htmlFor="firstName" className="col-sm-4 col-form-label">
                  Energy Balance:
                </label>
                <div className="col-sm-8">
                  <TextFieldComponent
                    className=""
                    name="energyBalance"
                    id="energyBalance"
                    type="text"
                    readOnly
                    value={initialValues.energyBalance}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>

              <div className="form-group row align-items-center">
                <label htmlFor="firstName" className="col-sm-4 col-form-label">
                  Energy Consumed:
                </label>
                <div className="col-sm-8">
                  <TextFieldComponent
                    className=""
                    name="energyConsumed"
                    id="energyConsumed"
                    type="text"
                    readOnly
                    value={initialValues.energyConsumed}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-sm-2"></div>
        <div className="col-sm-5">
          <div className="acount-info add-device-form mr-5">
            <form action>
              <div className="form-group row align-items-center">
                <label htmlFor="firstName" className="col-sm-4 col-form-label">
                  Energy Produced:
                </label>
                <div className="col-sm-8">
                  <TextFieldComponent
                    className=""
                    name="energyProduced"
                    id="energyProduced"
                    type="text"
                    readOnly
                    value={initialValues.energyProduced}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>

              <div className="form-group row align-items-center">
                <label htmlFor="firstName" className="col-sm-4 col-form-label">
                  Energy Purchased Others:
                </label>
                <div className="col-sm-8">
                  <TextFieldComponent
                    className=""
                    name="energyPurchasedOthers"
                    id="energyPurchasedOthers"
                    type="text"
                    readOnly
                    value={initialValues.energyPurchasedOthers}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>

              <div className="form-group row align-items-center">
                <label htmlFor="firstName" className="col-sm-4 col-form-label">
                  Energy Purchased Utility:
                </label>
                <div className="col-sm-8">
                  <TextFieldComponent
                    className=""
                    name="energyPurchasedUtility"
                    id="energyPurchasedUtility"
                    type="text"
                    readOnly
                    value={initialValues.energyPurchasedUtility}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>

              <div className="form-group row align-items-center">
                <label htmlFor="firstName" className="col-sm-4 col-form-label">
                  Energy Sold Others:
                </label>
                <div className="col-sm-8">
                  <TextFieldComponent
                    className=""
                    name="energySoldOthers"
                    id="energySoldOthers"
                    type="text"
                    readOnly
                    value={initialValues.energySoldOthers}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>

              <div className="form-group row align-items-center">
                <label htmlFor="firstName" className="col-sm-4 col-form-label">
                  Energy Sold Utility:
                </label>
                <div className="col-sm-8">
                  <TextFieldComponent
                    className=""
                    name="energySoldUtility"
                    id="energySoldUtility"
                    type="text"
                    readOnly
                    value={initialValues.energySoldUtility}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>

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
                    readOnly
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
                    name="soueceType"
                    id="soueceType"
                    type="text"
                    readOnly
                    value={initialValues.sourceType}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="page-nav-btn">
        <button className="btn-primary btn btn-icon-text mb-2 mb-md-0">
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
  },
  dispatch
);

export default connect(null, mapDispatchToProps)(GetEnergy);


