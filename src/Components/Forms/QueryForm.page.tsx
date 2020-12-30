import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FormEvent, useEffect } from 'react';
import { FormHead } from '../FormHead.component';
import InputArea from '../TextArea.component/TextArea.component';
import InputField from '../TextField.component/TextField.component';
import { Theme, ValidateFields } from '../../Services/App.service';

export const QueryForm = (props: any) => {

    const [Form, setForm] = React.useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = React.useState(false);
    const [errorMessages, setErrorMessages]: any = React.useState([]);
    const [YearList, setYearList]: any = React.useState([]);
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:992px)');

    let inputRefs: any = [];
    let ReCaptchaRef: any = React.createRef();

    const fieldChangeHandler = (field: string, value: any) => {
        setForm(prev => {
            return {
                ...prev,
                [field]: value
            }
        })
    }

    useEffect(() => {
        let list = getCounsellingYearList();
        fieldChangeHandler('counsellingYear', list[0])
        setYearList(list);
    }, [])

    const getCounsellingYearList = () => {
        let date = new Date();
        let currentYear = date.getFullYear();
        let yearList = [];
        for (let i = 0; i < 5; i++) {
            yearList.push(currentYear + i);
        }
        console.log('yearList', yearList);
        return yearList;
    }

    const submitForm = (event: FormEvent) => {
        event.preventDefault();
        const formErrorConditions = [!Form.name, !Form.email, !Form.subject, Form.phone.length !== 10, !Form.message];

        ValidateFields(formErrorConditions, inputRefs);
    }

    return (
        <form onSubmit={submitForm}>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <InputField
                        ref={(ref: any) => { inputRefs[0] = ref }}
                        label='Parent Name'
                        variant='outlined'
                        size='small'
                        error={Form.name === ''}
                        errormessage='Name is required'
                        isrequired
                        name='name'
                        color='primary'
                        value={Form.name}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>

                <Grid item xs={12} >
                    <InputField
                        ref={(ref: any) => { inputRefs[1] = ref }}
                        label='Email'
                        error={Form.email === ''}
                        errormessage='Email is required'
                        isrequired
                        type='email'
                        name="email"
                        variant='outlined'
                        size='small'
                        color='primary'
                        value={Form.email}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>

                <Grid item xs={12} >
                    <InputField
                        ref={(ref: any) => { inputRefs[2] = ref }}
                        label='Subject'
                        error={Form.subject === ''}
                        errormessage='Subject is required'
                        isrequired
                        name="subject"
                        variant='outlined'
                        size='small'
                        color='primary'
                        value={Form.subject}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>

                <Grid item xs={12} >
                    <InputField
                        ref={(ref: any) => { inputRefs[3] = ref }}
                        label='parent Phone'
                        error={Form.phone === ''}
                        errormessage='Phone Number is required'
                        isrequired
                        type='number'
                        name="phone"
                        variant='outlined'
                        size='small'
                        color='primary'
                        value={Form.phone}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>

                <Grid item xs={12} >
                    <InputArea
                        ref={(ref: any) => { inputRefs[4] = ref }}
                        label='Message'
                        error={Form.message === ''}
                        errormessage='Message is required'
                        isrequired
                        name="message"
                        variant='outlined'
                        size='small'
                        color='primary'
                        value={Form.message}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>

                <Grid item xs={12} className='flexContainer' style={{ justifyContent: 'flex-end' }} >

                    <Button type='submit' variant='contained' color='primary'>Submit</Button>
                </Grid>
            </Grid>
        </form>
    )
}