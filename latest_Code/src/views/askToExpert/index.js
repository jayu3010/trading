/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Switch, FormControl, Select, MenuItem, TextField } from '@mui/material';
import { IconUserCheck, IconBuildingBank, IconLicense, IconEdit } from '@tabler/icons';
import ReplySharpIcon from '@mui/icons-material/ReplySharp';
import { format } from 'date-fns';
import { NavLink } from 'react-router-dom';
import config from 'config';
import SubCard from 'ui-component/cards/SubCard';
import CommonTable from 'ui-component/Table/CommonTable';
import DropDown from 'ui-component/Table/CustomDropDown';
import Answer from './Answer';
import { makeStyles } from '@mui/styles';
import { useAxios } from 'hooks';

let tableData = [];
const column = ['Sl. No', 'Questions', 'Question Posted Date', 'Answer', 'Answer Posted Date', 'Actions'];

const useStyles = makeStyles((theme) => ({
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end'
    }
}));

const AskToExpert = () => {
    const classes = useStyles();
    const axios = useAxios();
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(true);
    const [askToExpert, setAskToExpert] = useState([]);
    const [isUpdateTable, setIsUpdateTable] = useState(false);
    const [open, setOpen] = useState('');
    const [searches, setSearches] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [previousData, setPreviousData] = useState(null);
    const [page, setPage] = useState('');
    const handleOpen = () => {
        setPreviousData(null);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        // setLoading(true);
        setLoading(false);
        setAskToExpert([
            {
                question: 'What is bids jhj gujh gjgj ?',
                qdate: '12/12/2022',
                answer: 'jhckj dchjksdh cksdhcjksdhkjhs',
                adate: '12/12/2022'
            },
            {
                question: 'kjhkjd jhd',
                qdate: '12/12/2022'
            }
        ]);

        // axios
        //     .get(`/askToExpert`)
        //     .then((response) => {
        //         setLoading(false);
        //         setAskToExpert(response.data.customerList);
        //     })
        //     .catch((err) => console.log(err));
    }, [isUpdateTable]);

    const handleKeyUpSearch = (e) => {
        setIsSearch(true);
        console.log(askToExpert, 'askToExpert');
        const data = askToExpert.filter((b) => b?.name.toUpperCase().includes(e.target.value.toUpperCase()));
        console.log(data, 'data');
        setSearches(data);
        if (e.target.value === '') setIsSearch(false);
    };

    const handleActive = (e) => {
        let active = false;
        if (e.target.value === 'active') active = true;

        setActive(e.target.value);
        setIsSearch(true);
        // eslint-disable-next-line eqeqeq
        const data = askToExpert.filter((b) => active === b.active);
        console.log(data, askToExpert, e.target.value, 'data');
        setSearches(data);
        if (!e.target.value) setIsSearch(false);
    };

    const data = isSearch ? searches : askToExpert;
    console.log(data, isSearch);

    const handleReply = (index) => {
        handleOpen();
        setPreviousData(askToExpert[index]);
    };

    tableData = data?.map((askToExpert, i) => ({
        id: i + 1,
        question: askToExpert?.question,
        qdate: askToExpert?.qdate,
        answer: askToExpert?.answer,
        adate: askToExpert?.adate,
        action: (
            <div className={classes.actionsContainer}>
                <Button title="Reply" variant="contained" color="secondary" startIcon={<ReplySharpIcon />} onClick={() => handleReply(i)}>
                    Reply
                </Button>
            </div>
        )
    }));

    return (
        <>
            <div>
                <SubCard title={loading ? <CircularProgress color="secondary" /> : 'Ask to Expert'}>
                    {askToExpert.length <= 0 ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                p: 1,
                                m: 1,
                                bgcolor: 'background.paper',
                                borderRadius: 1
                            }}
                        >
                            <CircularProgress color="secondary" />
                        </Box>
                    ) : (
                        <CommonTable column={column} data={tableData} setBanner={setAskToExpert} setIsUpdateTable={setIsUpdateTable} />
                    )}
                </SubCard>
                <Answer handleClose={handleClose} open={open} setIsUpdateTable={setIsUpdateTable} previousData={previousData} />
            </div>
        </>
    );
};

export default AskToExpert;
