/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Switch, FormControl, Select, MenuItem, TextField, Grid, Divider } from '@mui/material';
import { IconUser, IconArrowRight } from '@tabler/icons';
import { format } from 'date-fns';

import config from 'config';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
// import AddUser from './AddUser';
import CommonTable from 'ui-component/Table/CommonTable';
import DropDown from 'ui-component/Table/CustomDropDown';
import { makeStyles } from '@mui/styles';
import { useAxios } from 'hooks';
import { Formik } from 'formik';
import swal from 'sweetalert';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';

const useStyles = makeStyles((theme) => ({
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end'
    }
}));

const AnalysisReport = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = useState('');
    const classes = useStyles();
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [isUpdateTable, setIsUpdateTable] = useState(false);
    const [open, setOpen] = useState(false);
    const [searches, setSearches] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [previousData, setPreviousData] = useState(null);
    const [checked, setChecked] = useState(false);
    const axios = useAxios();
    const [initialValues, setInitialValues] = useState({
        title: '',
        subtitle: ''
    });

    useEffect(() => {
        console.log(editorState);
    }, [editorState]);

    const convertContentToHTML = () => {
        const currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        console.log(currentContentAsHTML);
        setConvertedContent(currentContentAsHTML);
    };

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    };

    function uploadImageCallBack(file) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID ##clientid##');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                console.log(response);
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                console.log(error);
                reject(error);
            });
        });
    }

    return (
        <>
            <div>
                <MainCard title="Analysis Report">
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        onSubmit={async (values, form) => {
                            try {
                                console.log(values);
                                const options = {
                                    headers: { 'Access-Control-Allow-Origin': '' }
                                };
                                const response = await axios.post(`/customer/register`, values, options);
                                console.log(response, 'response');
                                swal(response.data.message, { icon: 'success' });
                            } catch (err) {
                                swal(err.response.data.message || 'Something went wrong');
                            }
                        }}
                    >
                        {({ handleBlur, handleChange, values, handleSubmit, isSubmitting, touched }) => (
                            <SubCard>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <TextField
                                            name="title"
                                            onChange={handleChange('title')}
                                            onBlur={() => handleBlur('title')}
                                            fullWidth
                                            value={values.title}
                                            id="title"
                                            label="Title *"
                                            variant="outlined"
                                            color="secondary"
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <TextField
                                            name="subtitle"
                                            onChange={handleChange('subtitle')}
                                            onBlur={() => handleBlur('subtitle')}
                                            fullWidth
                                            value={values.subtitle}
                                            id="subtitle"
                                            label="Sub Title *"
                                            variant="outlined"
                                            color="secondary"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={10}>
                                        <div>
                                            <div
                                                style={{
                                                    border: '1px solid #bfbfbf',
                                                    padding: '2px',
                                                    minHeight: '400px',
                                                    borderRadius: '10px'
                                                }}
                                            >
                                                <Editor
                                                    editorState={editorState}
                                                    onEditorStateChange={handleEditorChange}
                                                    toolbar={{
                                                        inline: { inDropdown: true },
                                                        list: { inDropdown: true },
                                                        textAlign: { inDropdown: true },
                                                        link: { inDropdown: true },
                                                        history: { inDropdown: true },
                                                        image: {
                                                            uploadCallback: uploadImageCallBack,
                                                            alt: { present: true, mandatory: true }
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Divider />
                                {/* <Box sx={{ mt: 4, mx: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}
                                <Button
                                    sx={{ mt: 4, alignItems: 'center' }}
                                    onClick={handleSubmit}
                                    variant="contained"
                                    endIcon={<IconArrowRight />}
                                    color="secondary"
                                    disabled={isSubmitting}
                                >
                                    Create
                                </Button>
                            </SubCard>
                        )}
                    </Formik>
                    <div dangerouslySetInnerHTML={{ __html: convertedContent }} />
                </MainCard>
            </div>
            {/* <AddUser handleClose={handleClose} open={open} setIsUpdateTable={setIsUpdateTable} /> */}
        </>
    );
};

export default AnalysisReport;
