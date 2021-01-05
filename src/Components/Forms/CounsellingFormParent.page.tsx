import { Button, Grid, Typography, useMediaQuery } from '@material-ui/core';
import React, { FormEvent, useEffect } from 'react';
import InputField from '../TextField.component/TextField.component';
import { Theme, ValidateFields } from '../../Services/App.service';

export const CounsellingFormParent = (props: any) => {

    const [Form, setForm] = React.useState({
        name: '',
        studentName: '',
        phone: '',
        studentPhone: '',
        studentLastEducation: '',
        studentDream: '',
        address: '',
        preferredLocation: '',
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
        const formErrorConditions = [!Form.name, Form.phone?.length !== 10, !Form.studentName, Form.studentPhone.length !== 10, !Form.studentLastEducation, !Form.studentDream, !Form.address, !Form.preferredLocation];

        ValidateFields(formErrorConditions, inputRefs);
    }

    return (
        <form onSubmit={submitForm}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} >
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
                <Grid item xs={12} sm={6} >
                    <InputField
                        ref={(ref: any) => { inputRefs[1] = ref }}
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
                <Grid item xs={12} sm={6} >
                    <InputField
                        ref={(ref: any) => { inputRefs[2] = ref }}
                        label='Student Name'
                        error={Form.studentDream === ''}
                        errormessage='Student Name is required'
                        isrequired
                        name='studentName'
                        variant='outlined'
                        size='small'
                        type='email'
                        color='primary'
                        value={Form.studentName}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <InputField
                        ref={(ref: any) => { inputRefs[3] = ref }}
                        label='Student Phone'
                        error={Form.studentPhone === ''}
                        errormessage='Student Phone is required'
                        isrequired
                        name='studentPhone'
                        variant='outlined'
                        size='small'
                        color='primary'
                        value={Form.studentPhone}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>

                <Grid item xs={12} sm={6} >
                    <InputField
                        ref={(ref: any) => { inputRefs[4] = ref }}
                        label='Last Education'
                        error={Form.studentLastEducation === ''}
                        errormessage='student Last Education is required'
                        isrequired
                        name='studentLastEducation'
                        variant='outlined'
                        size='small'
                        color='primary'
                        value={Form.studentLastEducation}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <InputField
                        ref={(ref: any) => { inputRefs[5] = ref }}
                        label='Student Dream'
                        error={Form.studentDream === ''}
                        errormessage='Student Dream is required'
                        isrequired
                        name='studentDream'
                        variant='outlined'
                        size='small'
                        color='primary'
                        value={Form.studentDream}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <InputField
                        ref={(ref: any) => { inputRefs[6] = ref }}
                        label='Address'
                        error={Form.address === ''}
                        errormessage='Address is required'
                        isrequired
                        name='address'
                        variant='outlined'
                        size='small'
                        color='primary'
                        value={Form.address}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>

                <Grid item xs={12} sm={6} >
                    <InputField
                        ref={(ref: any) => { inputRefs[7] = ref }}
                        label='Preferred location'
                        error={Form.preferredLocation === ''}
                        errormessage='Preferred Location is required'
                        isrequired
                        name='preferredLocation'
                        variant='outlined'
                        size='small'
                        color='primary'
                        value={Form.preferredLocation}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />

                </Grid>

                <Grid item xs={12} className='flexContainer' >
                    <Typography
                        variant='body1'
                        className='smallText'
                        style={isMobile ? { fontSize: '12px !important' } : {}}
                    >Are you a student?
                    <span
                            style={{
                                color: Theme.primary,
                                marginLeft: 5,
                                cursor: 'pointer'
                            }}
                            onClick={() =>
                                props?.onFormTypeChange &&
                                props.onFormTypeChange()}>Click Here</span>
                    </Typography>
                    <Button type='submit' variant='contained' color='primary'>Submit</Button>
                </Grid>
            </Grid>
        </form>
    )
}