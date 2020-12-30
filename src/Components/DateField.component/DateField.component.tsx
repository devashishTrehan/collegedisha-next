import * as React from 'react';
import FieldStyles from './DateField.module.css';
import classNames from 'classnames';


interface DateFieldState {
    error: string,
    value: string,
    isTouched: boolean,
    isDirty: boolean,
    isFocused: boolean,
}


const styles = {

    lightFont: {
        fontSize: 12,
        color: 'gray'
    }
}



class DateField extends React.Component<any, DateFieldState> {
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


    static getDerivedStateFromProps(props: any, state: DateFieldState) {
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
                    <input
                        ref={(ref) => this.Ref = ref}
                        color='secondary'
                        style={{ width: '100%', ...styles.lightFont }}
                        className={FieldStyles.input}
                        {...newProps}
                        onFocus={() => this.focusHandler()}
                        onChange={(event: any) => this.keyDownHandler(event)}
                        onBlur={() => this.blurHandler()}

                        onKeyDown={(event: any) => {
                            this.keyDownHandler(event)
                        }}
                        type={'text'}
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


export default DateField;
