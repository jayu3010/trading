/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress, IconButton, Divider, FormControl, Select, MenuItem, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import { IconArrowRight, IconX } from '@tabler/icons';
import CommonTable from 'ui-component/Table/CommonTable';
import { useAxios } from 'hooks';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { makeStyles } from '@mui/styles';
import SubCard from 'ui-component/cards/SubCard';
import DeclineKyc from './DeclineKyc';

let tableData = [];
const column = ['Aadhar No.', 'Aadhar Photo', 'PAN No.', 'PAN Card Photo', 'Check Photo', 'Actions'];

const style = {
    position: 'relative',
    top: '20%',
    width: '90%',
    margin: '5%'
};

const useStyles = makeStyles((theme) => ({
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end'
    }
}));

const KYC = ({ handleClose, open, kyc, page }) => {
    const classes = useStyles();
    const axios = useAxios();
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [isUpdateTable, setIsUpdateTable] = useState(false);
    const [searches, setSearches] = useState([]);
    const [openKyc, setOpenKyc] = useState('');
    const [previousDataKyc, setPreviousDataKyc] = useState(null);
    const [statusKyc, setStatusKyc] = useState(null);
    const res = [];
    const handleOpenKyc = () => {
        setOpenKyc(true);
        setPreviousDataKyc(null);
    };

    const handleCloseKyc = () => {
        setOpenKyc(false);
    };
    console.log(kyc);
    // useEffect(() => {
    //     /* eslint-disable no-underscore-dangle */
    //     setLoading(true);
    //     setCustomers([]);
    //     console.log(res);
    //     axios
    //         .post(`http://43.204.210.119/api/kyc/get-by-bidder`, { bidder: previousData._id })
    //         .then((response) => {
    //             setLoading(false);
    //             res.push(response.data.details);
    //             setCustomers(res);
    //         })
    //         .catch((err) => console.log(err));
    // setLoading(true);
    // setLoading(false);
    // setCustomers([
    //     {
    //         aadharNo: '45678 987 56',
    //         aadharPhoto: (
    //             <a href="https://hindi.cdn.zeenews.com/hindi/sites/default/files/2021/10/03/936734-aadhaar-card.jpg" target="_blenk">
    //                 <img
    //                     src="https://hindi.cdn.zeenews.com/hindi/sites/default/files/2021/10/03/936734-aadhaar-card.jpg"
    //                     alt=""
    //                     width="150px"
    //                 />
    //             </a>
    //         ),
    //         panNo: '567 78765',
    //         panPhoto: (
    //             <a
    //                 href="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2022/03/14/1047862-pan-card-ians.jpg"
    //                 target="_blenk"
    //             >
    //                 <img
    //                     src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2022/03/14/1047862-pan-card-ians.jpg"
    //                     alt=""
    //                     width="150px"
    //                 />
    //             </a>
    //         ),
    //         checkPhoto: (
    //             <a href="https://www.myloancare.in/assets/images/cancelled-cheque.webp" target="_blenk">
    //                 <img src="https://www.myloancare.in/assets/images/cancelled-cheque.webp" alt="" width="150px" />
    //             </a>
    //         )
    //     }
    // ]);

    // axios
    //     .get(`/customer`)
    //     .then((response) => {
    //         setLoading(false);
    //         setCustomers(response.data.customerList);
    //     })
    //     .catch((err) => console.log(err));
    // }, [isUpdateTable]);

    const handleDecline = (index) => {
        console.log("in decline",index)
        handleOpenKyc();
        setPreviousDataKyc(index);
    };

    const handleApprove = (index) => {
        setStatusKyc(true);
        setPreviousDataKyc(customers);
    };
    const data = [];
    
    data.push(kyc[0]);
    console.log("in data",data);
    tableData = data?.map((customer, i) => ({
        aadharNo: customer?.aadhar.number,
        aadhar: customer?.aadhar.imageLinkOne,
        panNo: customer?.pan.number,
        pan: customer?.pan.imageLink,
        check: customer?.bank.fileLink,
        action: (
            <div className={classes.actionsContainer}>
                {statusKyc ? (
                    <IconButton>
                        <Button variant="contained" color="success">
                            Approved
                        </Button>
                    </IconButton>
                ) : (
                    <div>
                        <IconButton>
                            <Button variant="contained" color="success" onClick={() => handleApprove(customer)}>
                                Approve
                            </Button>
                        </IconButton>
                        <IconButton>
                            <Button variant="outlined" color="error" onClick={() => handleDecline(customer)}>
                                Decline
                            </Button>
                        </IconButton>
                    </div>
                )}
            </div>
        )
    }));
console.log("customerscustomers",data?.length)
    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                   (
                        <CommonTable
                            column={column}
                            data={tableData}
                            setBanner={setCustomers}
                            setIsUpdateTable={setIsUpdateTable}
                            page={page}
                        />
                    )
                </Box>
            </Modal>
            <DeclineKyc handleClose={handleCloseKyc} open={openKyc} setIsUpdateTable={setIsUpdateTable} previousData={previousDataKyc} />
        </>
    );
};

export default KYC;
