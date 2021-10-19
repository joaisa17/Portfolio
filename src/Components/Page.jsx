import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '@css/Components/Page.css';

export default function Page(props) {

    useEffect(() => {
        let header = document.querySelector('.header');
        let footer = document.querySelector('.footer');

        if (props.noheader) header.classList.add('hide');
        else header.classList.remove('hide');;

        if (props.nofooter) footer.classList.add('hide');
        else footer.classList.remove('hide');

        const hash = window.location.hash;

        if(hash === '#contact') {
            let contactElement = document.getElementById('contact');

            if (!contactElement) return;

            contactElement.classList.remove('flash-end');
            contactElement.classList.add('flash-enter');

            setTimeout(() => {
                contactElement.classList.remove('flash-enter')
                contactElement.classList.add('flash-end');
            }, 750);

            contactElement.scrollIntoView();
        }

        else window.scrollTo(0, 0);
    });

    return <React.Fragment>
        <Helmet>
            <title>{props.title ? `${props.title} | J.I` : 'Joakim Isaksen'}</title>

            {props.description ? <meta name="description" content={props.description} /> : ''}
        </Helmet>

        <div className="content" style={props.style}>{props.children}</div>
    </React.Fragment>
}