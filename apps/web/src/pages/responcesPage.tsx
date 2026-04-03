import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router";
import { server } from "../common/Server";
import type { DefaultForm } from "../common/types/form.type";
import { FormPreview } from "../components/forms/formPreview";
import { ResponcesPreview } from "../components/forms/responcesPreview";
import { useMemo } from "react";


export const ResponcesPageLoader = async ({params}: any) => {
    const {id}: {id: number} = params;
    await server.loading(1000);
    const result = await server.getResponces(+id);
    if(!result) throw new Response('Not Found', { status: 404 });
    return result;
}

export const ResponcesPage = ({}) => {
    const data: DefaultForm = useLoaderData();
    const {userAnswers} = data;
    const navigate = useNavigate();
    const address = useLocation();
    
    const responces = useMemo(() => {
        if(!address.pathname.split("/").includes("responce")){
            return userAnswers.map((val, i) => (            //I lost identifier here, so I put the index in key.
                <ResponcesPreview title={`Responce ${i+1}`} key={i} callback={() => { 
                    navigate('responce/' + i);
                }}/>
            ))
        }
        else return null;
    }, [address, userAnswers]);

    return(
        <div className="Page">
            <FormPreview data={data} callback={() => {}} disabled={true}/>
            {
                responces
            }
            <Outlet />
        </div>
    )
}