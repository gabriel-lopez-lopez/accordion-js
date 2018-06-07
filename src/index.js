/**
 * APP
 *
 */

// Components and dependencies
import Accordion from './components/accordion';
import FooterContent from './components/footer';
import ButtonAddItems from './components/button';
import http, { services } from './lib/http';

// CORE SUI FRAMEKORK CSS (scaffolding)
import './assets/css/sui.css';
// Main CSS that overwite styles
import './scss/_index.scss';

document.onreadystatechange = () => {
    // document ready
    if (document.readyState === 'complete') {

        // ACCORDION COMPONENT
        const accordion = new Accordion({
            selector: '#accordion',
            dataItems: [
                { id: 0, title: 'Title item 0', text: 'Item 0' },
                { id: 1, title: 'Title item 1', text: 'Item 1' },
                { id: 2, title: 'Title item 2', text: 'Item 2' }
            ],
            oneOpen: true
        });

        // FOOTER COMPONENT
        new FooterContent({
            selector: 'footer'
        });

        // BUTTON ADD ELEMENTS TO THE ACCORDION COMPONENT
        new ButtonAddItems({
            selector: 'body',
            onClick: () => http.get(services.api),
            onSuccess: (res) => {
                accordion.appendData(res)
            }
        });

    }
};