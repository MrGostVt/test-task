import { server } from "../common/serverController";
import { useEffect } from "react";

export const FillFormLoader = async ({params}: any) => {
    const {id} = params;
    await server.loading(1000);
    console.log('Form data loading')
    const result = await server.getForm(id);
    if(!result) throw new Response('Not Found', { status: 404 });
    return result;
}

export const FillFormPage = ({}) => {
    // const form = useLoaderData();

    useEffect(() => {

    }, []);

    return(
        <div className="Page">

        </div>
    );
}