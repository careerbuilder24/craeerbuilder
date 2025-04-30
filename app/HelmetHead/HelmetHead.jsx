import React from 'react';
import { Helmet } from 'react-helmet';

const HelmetHead = ({ title, description, keywords, author, logoImage }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="icon" href={logoImage} sizes="16x16" />
    </Helmet>
  );
};

export default HelmetHead;
