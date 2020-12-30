import * as React from 'react';
import classNames from 'classnames';
import { Select, SelectProps } from '@material-ui/core';
import FieldStyles from './SelectField.module.css';
import { CSSProperties } from '@material-ui/styles';


interface SelectFieldState {
    error: string,
    value: string,
    isTouched: boolean,
    isDirty: boolean,
    isFocused: boolean,
}

interface SelectFieldProps extends SelectProps {
    onValueChange?: Function,
    errormessage?: string,
    containerStyle?: CSSProperties,
    label?: string

}


const styles = {

    lightFont: {
        fontSize: 12,
        color: 'gray'
    }
}



class SelectField extends React.Component<SelectFieldProps, SelectFieldState> {
    static propTypes: { classes: any; };

    Ref: HTMLElement | null = null;

    constructor(props: any) {
        super(props)
        this.state = {
            error: props?.error,
            value: props.value,
            isTouched: props.value ? true : false,
            isDirty: props.value ? true : false,
            isFocused: false,
        }
    }


    static getDerivedStateFromProps(props: any, state: SelectFieldState) {
        if (props.error !== state.error || props.value !== state.value) {
            console.log('changed', props)
            return { ...state, error: props.error, value: props.value }
        } else {
            return null;
        }
    }


    touchField = () => {
        if (!this.state.isTouched) {
            this.setState({ isTouched: true })
        }

    }

    makeDirty = () => {
        if (!this.state.isDirty) {
            console.log('dirting date')
            this.setState({ isDirty: true })
        }
    }

    focusHandler = () => {
        this.Ref && this.Ref.setAttribute('type', 'date');
        this.setState({ isFocused: true })
        this.touchField();
    }

    blurHandler = () => {
        this.Ref && this.Ref.setAttribute('type', 'text');
        this.setState({ isFocused: false })
    }

    keyDownHandler = (event: React.KeyboardEvent) => {
        let target = event.target as HTMLInputElement;
        let value = target.value;
        console.log(value);
        this.setState({ value: value });
        this.props.onValueChange && this.props.onValueChange(event);
        this.makeDirty();
    }

    render() {

        const { errormessage } = this.props;
        const isError = this.state.error && this.state.isDirty;

        let newProps = { ...this.props, error: isError }

        return (
            <div style={this.props.containerStyle} >

                <div className={classNames(
                    FieldStyles.inputWrap,
                    {
                        [FieldStyles.focusedInput]: this.state.isFocused,
                        [FieldStyles.errorInput]: isError,
                    })}>
                    {
                        this.props.label ?
                            <label className={classNames([FieldStyles.inputLabel], {
                                [FieldStyles.labelFocused]: this.state.isFocused || this.state.value,
                                [FieldStyles.labelError]: isError,
                            })} >{this.props.label}</label>
                            : null
                    }
                    <Select
                        {...newProps}
                        onFocus={() => this.focusHandler()}
                        onChange={(event: any) => this.keyDownHandler(event)}
                        onBlur={() => this.blurHandler()}
                        className={FieldStyles.input}
                        MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                            }
                        }} >

                        {
                            this.props.children
                        }
                    </Select>
                </div>

                {
                    this.props.error && this.state.isDirty ?
                        <p className='error' style={{ marginLeft: 10, marginTop: 5, fontSize: 12, }}><small>{errormessage}</small></p>
                        : null
                }
            </div >
        );
    }
}


export default SelectField;
