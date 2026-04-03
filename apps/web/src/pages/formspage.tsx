import { FormPreview } from '../components/forms/formPreview'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import type { FormPrev } from '../common/types/formPreview.type';
import { updateForms } from '../redux/formsSlice';
import { useCallback, useEffect } from 'react';
import { server } from '../application/Server';
import { useLoaderData, useNavigate } from 'react-router';

const createForm: FormPrev  = {
    id: -1,
    name: 'Create a new form',
    description: 'Create a new from with constructor'
}

export const FormsPageLoader = async () => {
    await server.loading(1000);
    const result = await server.getForms();
    return result;
}

export const FormsPage = ({}) => {
    const formsList = useLoaderData();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const forms = useAppSelector(state => state.forms.forms);

    useEffect(() => {
        console.log(formsList);
        dispatch(updateForms(formsList))
    }, []);

    const HandleSelect = useCallback((id: number, property?: string) => {
        if(!property) return;
        
        switch(property){
            case 'fill': navigate(`forms/${id}/fill`); break;
            case 'view': navigate(`forms/${id}/responces`); break;
        }

    }, [forms]);

    return(
        <div className='Page'>
            <FormPreview data={createForm} callback={() => {navigate('forms/new')}}/>
            {forms.map(val => (
                <FormPreview data={val} callback={HandleSelect} expandable={true} key={val.id}/>
            ))}
        </div>
    )
}
