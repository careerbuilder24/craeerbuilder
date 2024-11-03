// components/HelmetHead.js
import React from 'react';
import { Helmet } from 'react-helmet';
import img from '../../assets/logo.jpg'

const HelmetHead = ({ title, description, keywords, author }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link  href="/logo.png" sizes="16x16" />
            <meta
                name="author" content={author} />
        </Helmet>
    );
};

export default HelmetHead;