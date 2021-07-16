import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import { callFileUploadAPI } from "../../Action/EnergyAction";
import Loader from "react-loader-spinner";
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";
import { useHistory } from "react-router-dom";
import csvSample from "../../Icons/csvFileSample.png";

const LoadCSVFile = (props) => {
  const hiddenFileInput = React.useRef(null);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [CSV_File, setCSVFile] = useState("");
  const [file, setFile] = useState("");
  const [formData, setFromData] = useState("");

  const history = useHistory();

  const handleClickFile = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChangeImage = (event) => {
    setFile(event.target.files[0].name);
    const image = new FormData();
    image.append("csv", event.target.files[0]);
    setFromData(image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsImgLoading(true);
    props
      .callFileUploadAPIAction(formData)
      .then((res) => {
        console.log("upload image", res);
        setCSVFile(res.data.filename ? res.data.filename : "");
        setIsImgLoading(false);
        CustomeNotification(
          "success",
          "CSV File Uploaded Successfully",
          "Success",
          2000
        );
        setFile("");
      })
      .catch((error) => {
        console.log(error);
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
  return (
    <div className="main-pg-content ml-5">
      <h5 class="title-page-content">Load CSV Energy File</h5>
      <div className="row mr-0">
        <div className="col-sm-5">
          <div className="acount-info add-device-form">
            <form action>
              <label
                htmlFor="accountId"
                className="col-sm-4 col-form-label custome_label"
              >
                CSV File Name:
              </label>
              <input
                type="file"
                name="img[]"
                className="file-upload-default"
                accept=".csv"
                ref={hiddenFileInput}
                onChange={handleChangeImage}
                style={{ display: "none" }}
              />
              <div className="input-group col-xs-12 file_upload">
                <TextFieldComponent
                  className=""
                  name="CSV_File"
                  id="CSV_File"
                  type="text"
                  value={file}
                />

                <span className="input-group-append">
                  <button
                    onClick={handleClickFile}
                    className="file-upload-browse btn btn-primary btn-icon-text"
                    type="button"
                  >
                    {isImgLoading ? (
                      <Loader
                        type="Oval"
                        color="white"
                        height={30}
                        width={30}
                        timeout={3000000}
                      />
                    ) : (
                      <> Upload CSV File </>
                    )}
                  </button>
                </span>
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
      <div>
        The CSV energy file must include the correct account numbers to load
        energy for.
        <br />
        The first line is column header names. All lines must have values
        separated by a semi colon ; <br />
        A sample file is shown below <br />
        <br />
        <img src={csvSample} className="csv_file_sample" />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callFileUploadAPIAction: callFileUploadAPI,
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(LoadCSVFile);
