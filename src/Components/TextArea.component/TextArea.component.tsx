import * as React from 'react';
import styles from './TextArea.module.css';
import { TextareaAutosize } from '@material-ui/core';
import classNames from 'classnames';
import { Theme } from '../../Services/App.service';

interface TextFieldState {
    error: string,
    value: string,
    isTouched: boolean,
    isDirty: boolean,
    isFocused: boolean
}

// const styles = {

//     lightFont: {
//         fontSize: 12,
//         color: 'gray'
//     }
// }



class InputArea extends React.Component<any, TextFieldState> {
    static propTypes: { classes: any; };


    constructor(props: any) {
        super(props)
        this.state = {
            value: '',
            error: props?.error,
            isTouched: false,
            isDirty: false,
            isFocused: false,
        }
    }


    static getDerivedStateFromProps(props: any, state: TextFieldState) {
        if (props.error !== state.error) {
            console.log('changed', props)
            return { ...state, error: props.error }
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


        return (
            <div style={this.props.containerStyle} >
                <div className={styles.textInputWrap}>
                    <label className={classNames(styles.textLabel, {
                        [styles.labelFocused]: this.state.isFocused || this.state.value,
                        [styles.labelError]: isError,
                    })} >{this.props.label}</label>
                    <TextareaAutosize color='secondary'
                        rowsMin={3}
                        rowsMax={5}
                        className={classNames(
                            styles.input,
                            {
                                [styles.focusedInput]: this.state.isFocused,
                                [styles.errorInput]: isError,
                            })}
                        style={{ width: '100%', borderColor: isError ? Theme.error : 'gray' }}
                        {...this.props} onFocus={() => this.focusHandler()}
                        onKeyDown={(event: any) => this.keyDownHandler(event)}
                        onChange={(event: any) => this.keyDownHandler(event)}
                        onBlur={() => this.blurHandler()}
                    />
                </div>
                {
                    this.props.error && this.state.isDirty ?
                        <p className='error' style={{ marginLeft: 10, fontSize: 12, }}><small>{errormessage}</small></p>
                        : null
                }
            </div >
        );
    }
}


export default InputArea;
