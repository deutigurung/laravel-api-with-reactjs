import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

import {createRoot} from 'react-dom/client';
import CompaniesIndex from './Pages/Companies/Index';
import App from './Layouts/App';

const root = createRoot(document.getElementById('root'));
root.render(< App />);


Alpine.start();