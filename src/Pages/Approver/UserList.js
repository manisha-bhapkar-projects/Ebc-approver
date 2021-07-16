import React, { useEffect, useState } from 'react';
import CardListTable from "../../Components/CardListTable/CardListTable";
import { callUserListApi, UpdateUserStatusAPI } from '../../Action/UserAction';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAccountData } from "../../utils/storage/index";
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";


const UserList = (props) => {
    const [usersData, setUsersData] = useState([]);
    const [loading, setloading] = useState(false);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState();
    const [skip, setSkip] = useState(1);
    var accountID = getAccountData();

    useEffect(() => {
        getUserList(limit, skip, total);
     }, []);

    const UpdateStatusCheckbox = (e, id) => {
        console.log("e", e.target);
        props.UpdateUserStatusAPIAction(id)
            .then((res) => {
                CustomeNotification("success", "User Approved", "Success", 2000);
                getUserList();
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const handlePageChange = (skip) => {
        setSkip(skip);
        getUserList(limit, skip, total);
    }

    const getUserList = (limit, skip, total) => {
        setloading(true);
        props
            .callUserListApiAction(limit, skip, total)
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

    const UsersColumn = [

        {
            selector: "_id",
            right: false,
            grow: "1",
            cell: (row) => {
                return (
                    <>
                        <input type="checkbox"
                            onChange={(e) => UpdateStatusCheckbox(e, row._id)}
                        />

                    </>
                );
            },
        },
        {
            name: "ACCOUNT ID",
            selector: "_id",
            right: false,
            grow: "2",

        },
        {
            name: "USER NAME",
            selector: "userName",
            right: false,
            grow: "3",
        },
        {
            name: "FIRST NAME",
            selector: "firstName",
            right: false,
            grow: "3",
        },

        {
            name: "LAST NAME",
            selector: "lastName",
            grow: "3",
        },
        {
            name: "EMAIL",
            selector: "email",
            grow: "6",
        },
        {
            name: "STATUS",
            selector: "status",
            grow: "3",
        },
        {
            name: "APPROVAL VALUE",
            selector: "approvalValue",
            grow: "1",
        },
        {
            name: "ORG. NAME",
            selector: "orgName",
            grow: "3",
        },
        {
            name: "ORG. ID",
            selector: "orgId",
            grow: "3",
        },
        {
            name:"Funds Balance",
            selector:"fundsBalance",
            grow:"3"
        },

        {
            name:"Energy Balance",
            selector:"energyBalance",
            grow:"3"
        },


        
        

    ];
    return (
        <>
                <div className="title-page-content d-flex align-items-center justify-content-between ">
                    <h3>Users List</h3>
                </div>

                <div className="table-responsive bids_table adjust_TableCol">
                    <CardListTable
                        columns={UsersColumn}
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
        </>
    );
};


const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            callUserListApiAction: callUserListApi,
            UpdateUserStatusAPIAction: UpdateUserStatusAPI
        },
        dispatch
    );

export default connect(null, mapDispatchToProps)(UserList);