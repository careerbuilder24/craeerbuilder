// components/HelmetHead.js
import React from 'react';
import { Helmet } from 'react-helmet';



const HelmetHead = ({ title, description, keywords, author }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <link rel="icon" href="../../public/icon1.jpg" />
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
    );
};

export default HelmetHead;
