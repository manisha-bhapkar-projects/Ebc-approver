import React, { useEffect, useState } from "react";
import CardListTable from "../../Components/CardListTable/CardListTable";
import {
  callDeviceListApi,
  UpdateDeviceStatusAPI,
} from "../../Action/DeviceAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";

const DevicesList = (props) => {
  const [checked, setChecked] = React.useState(false);
  const [usersData, setUsersData] = useState([]);
  const [loading, setloading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(1);

  useEffect(() => {
    getDeviceList(limit, skip, total);
  }, []);

  const UpdateStatusCheckbox = (id) => {
    props
      .UpdateDeviceStatusAPIAction(id)
      .then((res) => {
        CustomeNotification("success", "Device Approved", "Success", 2000);
        getDeviceList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = (skip) => {
    setSkip(skip);
    getDeviceList(limit, skip, total);
  };

  const getDeviceList = (limit, skip, total) => {
    setloading(true);
    props
      .callDeviceListApiAction(limit, skip, total)
      .then((res) => {
        setloading(false);
        setUsersData(res.data.data);
        setLimit(res.data.limit);
        setTotal(res.data.total);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  };

  const DeviceColumn = [
    {
      name: "",
      selector: "_id",
      right: false,
      grow: "0.5",
      cell: (row) => {
        console.log("row.id", row.id);
        return (
          <>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => UpdateStatusCheckbox(row._id)}
            />
          </>
        );
      },
    },
    {
      name: "DEVICE ID",
      selector: "_id",
      right: false,
      grow: "5",
    },
    {
      name: "DEVICE NAME",
      selector: "deviceName",
      grow: "4",
    },
    {
      name: "DEVICE TYPE",
      selector: "deviceType",
      grow: "4",
    },

    {
      name: "STATUS",
      selector: "status",
      grow: "3",
    },
    {
      name: "CAPACITY KVA",
      selector: "capacityKVA",
      grow: "3",
    },
    {
      name: "STORAGE KWH",
      selector: "storageKWH",
      grow: "3",
    },
  ];
  return (
    <div>
      <div>
        <div className="title-page-content d-flex align-items-center justify-content-between">
          <h3>Devices List</h3>
        </div>

        <div className="table-responsive">
          <CardListTable
            columns={DeviceColumn}
            data={usersData}
            pending={loading}
            pagination={false}
            custompagination
            paginationServer={false}
            noDataString={"No data found"}
            totalListCount={total}
            paginationTotalRows={total}
            paginationPerPage={limit}
            onPageChangedCalled={handlePageChange}
            inputClassName="mt-3"
          />
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callDeviceListApiAction: callDeviceListApi,
      UpdateDeviceStatusAPIAction: UpdateDeviceStatusAPI,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(DevicesList);
