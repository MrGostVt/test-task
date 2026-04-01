import { useState } from "react";

type Option = {
    id: number,
    value: string
}

interface Props {
    callback: (id: number) => void
    values: Option[]
}

export const DropDownList = (props: Props) => {
    const { callback, values } = props;
    const [options] = useState<Option[]>(values)

    return(
        <select className="DropDownList" onChange={(ev) => {
            callback(+ev.target.value);
        }}>
            {options.map((val) => (
                <option key={val.id} value={val.id}>{val.value}</option>
            ))}
        </select>
    );
}