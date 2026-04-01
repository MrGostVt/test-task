import type { FormPrev } from "../../common/types/formPreview.type";

interface PrevProps {
    callback: (id: number) => void,
    data: FormPrev
}

export const FormPreview = (props: PrevProps) => {
    const {data, callback} = props;

    return(
        <section className="FormPreview VerticalMargin" onClick={(ev) => {
            ev.preventDefault();
            callback(data.id);
        }}>
            <h1 className="FormPrevTitle">{data.name}</h1>
            <span className="FormPrevDescription">{data.description}</span>
        </section>
    );
}