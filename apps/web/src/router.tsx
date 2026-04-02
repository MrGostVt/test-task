import { createBrowserRouter } from 'react-router-dom';
import { FillFormPage } from './pages/fillFormPage';
import { FillFormLoader } from './pages/fillFormPage';
import { FormsPage, FormsPageLoader } from './pages/formsPage';
import App from './App';
import { FormBuilderPage } from './pages/formBuilderPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        loader: FormsPageLoader,
        errorElement: <div>Aligator</div>,
        children: [
            {
                index: true,
                element: <FormsPage/>,
                loader: FormsPageLoader,
            },
            {
                path: 'forms/:id/fill',
                element: <FillFormPage/>,
                loader: FillFormLoader,
            },
            {
                path: 'forms/new',
                element: <FormBuilderPage/>,
            },
        ]
    },
    {
        path: '*',
        element: <div>Bogdan</div>
    },
]);