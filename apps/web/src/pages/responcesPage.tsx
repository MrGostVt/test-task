import { useLoaderData } from "react-router";
import { server } from "../common/Server";
import type { DefaultForm } from "../common/types/form.type";
import { FormPreview } from "../components/forms/formPreview";


export const ResponcesPageLoader = async ({params}: any) => {
    const {id}: {id: number} = params;
    await server.loading(1000);
    console.log('Form data loading')
    const result = await server.getResponces(+id);
    if(!result) throw new Response('Not Found', { status: 404 });
    return result;
}

export const ResponcesPage = ({}) => {
    const data: DefaultForm = useLoaderData();
    console.log(data);
    return(
        <div className="Page">
            <FormPreview data={data} callback={() => {}} disabled={true}/>
            
        </div>
    )
}