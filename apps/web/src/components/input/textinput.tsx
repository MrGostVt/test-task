
interface Props {
    placeholder?: string
    height?: string
    fontSize?: string
    classes?: string
    defaults?: string
    callback: (val: string) => void
    disabled?: boolean
}

export const TextInput = ({placeholder = '', height, disabled=false, fontSize, classes = '', defaults = '', callback}: Props) => {

    return(
        <div className={`TextFieldInput ${classes}`}>
            <input disabled={disabled} className="ClearInput InputField" type="text" placeholder={placeholder}
            style={{
                fontSize, height
            }} defaultValue={defaults}
            onChange = {(ev) => {
                ev.preventDefault();
                callback(ev.target.value);
            }}
            ></input>
        </div>
    );
}