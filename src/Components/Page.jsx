import React, { useEffect } from 'react';

import { Helmet } from 'react-helmet';

import Header from './Header';
import Footer from './Footer';

import '../css/Components/Page.css';

export default function Page(props) {

    useEffect(() => {
        window.scrollTo(0, 0)
        
        const hash = window.location.hash;

        if(hash === '#contact') {
            let contactElement = document.getElementById('contact');

            if (!contactElement) return;

            contactElement.classList.remove('flash-end');
            contactElement.classList.add('flash-enter')
            setTimeout(() => {
                contactElement.classList.remove('flash-enter')
                contactElement.classList.add('flash-end');
            }, 750);
        }
    });

    return <React.Fragment>
        <Helmet>
            <title>{props.title ? `${props.title} | J.I` : 'Joakim Isaksen'}</title>
        </Helmet>

        {!props.noheader ? <Header title={props.title} /> : null}
        <div className="content" style={props.style}>{props.children}</div>
        {!props.nofooter ? <Footer /> : null}
    </React.Fragment>
}