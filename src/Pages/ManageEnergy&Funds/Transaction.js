import React, { useEffect, useState } from 'react';
import CardListTable from "../../Components/CardListTable/CardListTable";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


const Transaction = (props) => {
    const [transactionData, setTransactionData] = useState([]);
    const [loading, setloading] = useState(false);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState();
    const [skip, setSkip] = useState(10);


    useEffect(() => {
        getTransactionList(limit, skip, total);
    }, []);

    const handlePageChange = (skip) => {
        setSkip(skip);
        getTransactionList(limit, skip, total);
    }

    const getTransactionList = (limit, skip, total) => {
        setloading(true);
        // props
            // .callTransactionListApiAction(limit, skip, total)
            // .then((res) => {
            //     // console.log("Device List", res.data);
            //     setloading(false);
            //     setTransactionData(res.data.data);
            //     setLimit(res.data.limit);
            //     setTotal(res.data.total);
            // })
            // .catch((error) => {
            //     console.log(error);
            //     setloading(false);

            // });
    };


    const TransactionColumn = [
        {
            name: "TRANSACTION ID",
            selector: "tid",
            right: false,
            grow: "5",

        },
        {
            name: "UNITS",
            selector: "units",
            grow: "4",
        },
        {
            name: "RATE",
            selector: "rate",
            grow: "4",
        },

        {
            name: "PRODUCED AT",
            selector: "producedAt",
            grow: "3",
        },
        {
            name: "STATUS",
            selector: "status",
            grow: "3",
        },
        {
            name: "SOURCE TYPE",
            selector: "sourceType",
            grow: "3",
        },
        {
            name: "SOURCE ID",
            selector: "sourceID",
            grow: "3",
        },

        
    ];
    return (
        <div className="main-pg-content">

            <div>
                <div className="title-page-content d-flex align-items-center justify-content-between">
                    <h3>Transaction List</h3>
                </div>

                <div className="table-responsive">
                    <CardListTable
                        columns={TransactionColumn}
                        data={transactionData}
                        // pending={loading}
                        // pagination={false}
                        // custompagination
                        // paginationServer={false}
                        // noDataString={"No data found"}
                        // totalListCount={total}
                        // paginationTotalRows={total}
                        // paginationPerPage={limit}
                        // onPageChangedCalled={handlePageChange}
                        // inputClassName="mt-3"
                    />
                </div>
            </div>
        </div>
    );
};
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // callDeviceListApiAction: callDeviceListApi,
            // UpdateDeviceStatusAPIAction: UpdateDeviceStatusAPI
        },
        dispatch
    );

export default connect(null, mapDispatchToProps)(Transaction);