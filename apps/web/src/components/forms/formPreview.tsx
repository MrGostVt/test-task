import { useMemo, useState } from "react";
import type { FormPrev } from "../../common/types/formPreview.type";

interface PrevProps {
    callback: (id: number, property?: string) => void,
    data: FormPrev,
    expandable?: boolean, disabled?: boolean,
}

export const FormPreview = (props: PrevProps) => {
    const {data, callback, expandable = false, disabled = false} = props;
    const [size, setSize] = useState(false);

    const buttons = useMemo(() => {
        if(size) return <div style={{
            position: 'relative', left:'5%', width: '90%', 
            display: 'flex', gap: '10%', marginTop: '7px',
        }}>
            <button className="AddButton" onClick={(ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                callback(data.id, 'fill');
            }}>Fill</button>
            <button className="AddButton" style={{marginBottom: '15px'}} onClick={(ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                callback(data.id, 'view');
            }}>View</button>
        </div>
        return null;
    }, [size, data, callback]);

    return(
        <section className="FormPreview VerticalMargin" style={{
            height: '', cursor: disabled? 'default':'',
        }} onClick={(ev) => {
            ev.preventDefault();
            if(expandable) {
                setSize(!size);
            }
            else{
                callback(data.id);
            }
        }}>
            <h1 className="FormPrevTitle">{data.name}</h1>
            <span className="FormPrevDescription">{data.description}</span>
            {buttons}
        </section>
    );
}