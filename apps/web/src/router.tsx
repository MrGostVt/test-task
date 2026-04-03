import { createBrowserRouter } from 'react-router-dom';
import { FillFormPage } from './pages/fillFormPage';
import { FillFormLoader } from './pages/fillFormPage';
import App from './App';
import { FormBuilderPage } from './pages/formBuilderPage';
import { FormsPage, FormsPageLoader } from './pages/formspage';
import { ResponcesPage, ResponcesPageLoader } from './pages/responcesPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        loader: FormsPageLoader,
        errorElement: <div>Wrong request</div>,
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
            {
                path: 'forms/:id/responces',
                element: <ResponcesPage />,
                loader: ResponcesPageLoader,
            }
        ]
    },
    {
        path: '*',
        element: <div>Wrong page</div>
    },
]);