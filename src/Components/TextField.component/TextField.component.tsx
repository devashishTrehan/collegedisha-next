import * as React from 'react';
import FieldStyles from './TextField.module.css';
import classNames from 'classnames';
import { InputProps } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';


interface TextFieldState {
    error: string,
    value: string,
    isTouched: boolean,
    isDirty: boolean,
    isFocused: boolean,
}

interface TextFieldProps extends InputProps {
    error?: boolean,
    onValueChange?: Function,
    errormessage?: string,
    containerStyle?: CSSProperties,
    label?: string

}



class InputField extends React.Component<any, TextFieldState> {
    static propTypes: { classes: any; };


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


    static getDerivedStateFromProps(props: any, state: TextFieldState) {
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
            console.log('dirting')
            this.setState({ isDirty: true })
        }
    }

    focusHandler = () => {
        this.setState({ isFocused: true })
        this.touchField();
    }

    blurHandler = () => {
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
                    <input
                        color='secondary'
                        style={{ width: '100%' }}
                        className={FieldStyles.input}
                        {...newProps}
                        onFocus={() => this.focusHandler()}
                        onChange={(event: any) => this.keyDownHandler(event)}
                        onBlur={() => this.blurHandler()}

                        // startAdornment={this.props?.icon ? (
                        //     <InputAdornment position="start">
                        //         <span style={styles.lightFont}>
                        //             {
                        //                 this.props.icon
                        //             }
                        //         </span>
                        //     </InputAdornment>
                        // ) : null}

                        onKeyDown={(event: any) => {
                            this.keyDownHandler(event)
                        }}
                    />
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


export default InputField;
