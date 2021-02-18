import { Button, Grid, MenuItem, Typography, useMediaQuery } from '@material-ui/core';
import React, { FormEvent, useEffect } from 'react';
import InputField from '../TextField.component/TextField.component';
import { Theme } from '../../Services/App.service';
import SelectField from '../SelectField.component/SelectField.component';


export const CounsellingForm = (props: any) => {

    const [Form, setForm] = React.useState({
        name: '',
        phone: '',
        email: '',
        lastEducation: '',
        counselling: '',
        currentLocation: '',
        preferredLocation: '',
        counsellingYear: '',
        guardianName: '',
        guardianPhone: '',
        _10thDoc: '',
        _12thDoc: '',
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

    const submitForm = async (event: FormEvent) => {
        event.preventDefault();

    }

    return (
        <form onSubmit={submitForm} >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} >
                    <InputField
                        ref={(ref: any) => { inputRefs[0] = ref }}
                        label='Name'
                        error={Form.name === ''}
                        errormessage='Name is required'                        
                        name='name'
                        value={Form.name}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <InputField
                        ref={(ref: any) => { inputRefs[1] = ref }}
                        label='Phone number'
                        error={Form.phone === ''}
                        errormessage='Phone Number is required'                        
                        type='number'
                        name="phone"
                        value={Form.phone}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <InputField
                        ref={(ref: any) => { inputRefs[2] = ref }}
                        label='Email'
                        error={Form.email === ''}
                        errormessage='Email is required'                        
                        name='email'
                        type='email'
                        value={Form.email}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <InputField
                        ref={(ref: any) => { inputRefs[3] = ref }}
                        label='Last Education'
                        error={Form.lastEducation === ''}
                        errormessage='Last education is required'                        
                        name='lastEducation'
                        value={Form.lastEducation}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>

                <Grid item xs={12} sm={6} >
                    <InputField
                        ref={(ref: any) => { inputRefs[4] = ref }}
                        label='Counselling'
                        error={Form.counselling === ''}
                        errormessage='Counselling is required'                        
                        name='counselling'
                        value={Form.counselling}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <InputField
                        ref={(ref: any) => { inputRefs[5] = ref }}
                        label='Current location'
                        error={Form.currentLocation === ''}
                        errormessage='Current location is required'                        
                        name='currentLocation'
                        value={Form.currentLocation}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <InputField
                        ref={(ref: any) => { inputRefs[6] = ref }}
                        label='Preferred location'
                        error={Form.preferredLocation === ''}
                        errormessage='Preferred Location is required'                        
                        name='preferredLocation'
                        value={Form.preferredLocation}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <SelectField
                        ref={(ref: any) => { inputRefs[3] = ref }}
                        label='Counselling Year'
                        error={Form.counsellingYear === ''}
                        name='counsellingYear'
                        value={Form.counsellingYear}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} >
                        {
                            YearList?.map((year: number) => {
                                return (
                                    <MenuItem key={year} value={year}>{year}</MenuItem>
                                )
                            })
                        }
                    </SelectField>
                </Grid>


                <Grid item xs={12} sm={6} >
                    <InputField
                        ref={(ref: any) => { inputRefs[7] = ref }}
                        label='Guardian Name'
                        name='guardianName'
                        value={Form.guardianName}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>
                
                <Grid item xs={12} sm={6} >
                    <InputField
                        ref={(ref: any) => { inputRefs[8] = ref }}
                        label='Guardian Number'
                        error={Form.guardianPhone?.length !== 10}
                        errormessage='Enter correct contact number'
                        name='guardianPhone'
                        value={Form.guardianPhone}
                        onValueChange={(event: any) => fieldChangeHandler(event.target.name, event?.target.value)} />
                </Grid>
                <Grid item xs={12} className='flexContainer' >
                    <Typography
                        variant='body1'
                        className='smallText'
                        style={isMobile ? { fontSize: '12px !important' } : {}}
                    >Are you a parent?
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
                    <Button type='submit' color='primary' variant='contained' >Submit</Button>
                </Grid>
            </Grid>
        </form>
    )
}