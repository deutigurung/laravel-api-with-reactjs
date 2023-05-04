import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

import {createRoot} from 'react-dom/client';
import CompaniesIndex from './Pages/Companies/Index';

const root = createRoot(document.getElementById('root'));
root.render(< CompaniesIndex />);


Alpine.start();