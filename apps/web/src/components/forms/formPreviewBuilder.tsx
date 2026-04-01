import { TextInput } from "../input/textinput";

interface Props {
    callback: (property: string, value: string) => void,
    placeholders: {name: string, description: string}
}

export const FormPreviewBuilder = ({placeholders, callback = () => {}}: Props) => {

    return(
        <section className="FormPreview VerticalMargin" onClick={(ev) => {
            ev.preventDefault();
        }}>
            <TextInput placeholder={placeholders.name} classes="FormPrevTitle"
            fontSize="2em" height="" defaults={placeholders.name} callback={(val) => {
                callback('name', val);
            }}
            />
            {/* <h1 className="FormPrevTitle">{placeholders.name}</h1> */}
            <TextInput placeholder={placeholders.description} classes="FormPrevDescription"
            fontSize="15px" defaults={placeholders.description} callback={(val) => {
                callback('description', val);
            }}
            />
        </section>
    );
}