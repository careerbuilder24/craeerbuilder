import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Page() {
    const [portfolioTitle, setPortfolioTitle] = useState('');
    const [webPortfolioLink, setWebPortfolioLink] = useState('');
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [portfolioData, setPortfolioData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPortfolio = {
            portfolioTitle,
            webPortfolioLink,
            file,
            category,
            description,
            date,
        };

        if (editIndex !== null) {
            const updatedData = [...portfolioData];
            updatedData[editIndex] = newPortfolio;
            setPortfolioData(updatedData);
            setEditIndex(null);
        } else {
            setPortfolioData([newPortfolio, ...portfolioData]);
        }

        setPortfolioTitle('');
        setWebPortfolioLink('');
        setFile(null);
        setCategory('');
        setDescription('');
        setDate('');
    };

    const handleEdit = (index) => {
        const portfolio = portfolioData[index];
        setPortfolioTitle(portfolio.portfolioTitle);
        setWebPortfolioLink(portfolio.webPortfolioLink);
        setFile(portfolio.file);
        setCategory(portfolio.category);
        setDescription(portfolio.description);
        setDate(portfolio.date);
        setEditIndex(index);
    };

    useEffect(() => {
        // Update the document title dynamically based on the portfolioTitle
        document.title = portfolioTitle ? `${portfolioTitle} - Portfolio Manager` : 'Portfolio Manager';
    }, [portfolioTitle]);

    useEffect(() => {
        // Update the meta description based on the portfolio title or use a default description
        const metaDescription = portfolioTitle ? `Portfolio of ${portfolioTitle}` : "Manage your portfolio with ease. Add, edit, and organize your work for better visibility and presentation.";

        // Find the meta tag with name="description" and update its content
        const metaTag = document.querySelector('meta[name="description"]');
        if (metaTag) {
            metaTag.setAttribute('content', metaDescription);
        }
    }, [portfolioTitle]); // Re-run whenever portfolioTitle changes

    return (
        <>
            <Head>
                <meta name="description" content="Manage your portfolio with ease. Add, edit, and organize your work for better visibility and presentation." />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content={portfolioTitle ? `${portfolioTitle} - Portfolio Manager` : 'Portfolio Manager'} />
                <meta property="og:description" content="Manage your portfolio with ease. Add, edit, and organize your work for better visibility and presentation." />
                <meta property="og:type" content="website" />
                <meta name="robots" content="index, follow" />
                <meta name="keywords" content="portfolio, manager, web development, graphics design, digital marketing" />
                <title>{portfolioTitle ? `${portfolioTitle} - Portfolio Manager` : 'Portfolio Manager'}</title>
            </Head>
            <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Portfolio Information</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    <div style={{ flex: '1 1 100%' }}>
                        <label>Portfolio Title</label>
                        <input
                            type="text"
                            value={portfolioTitle}
                            onChange={(e) => setPortfolioTitle(e.target.value)}
                            placeholder="Enter portfolio title"
                            style={{ width: '100%', padding: '10px', marginBottom: '10px', color: '#333', backgroundColor: '#f9f9f9' }}
                        />
                    </div>

                    <div style={{ flex: '1 1 50%' }}>
                        <label>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginBottom: '10px', color: '#333', backgroundColor: '#f9f9f9' }}
                        >
                            <option value="">Select a category</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Graphics Design">Graphics Design</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                        </select>
                    </div>

                    <div style={{ flex: '1 1 50%' }}>
                        <label>Select Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginBottom: '10px', color: '#333', backgroundColor: '#f9f9f9' }}
                        />
                    </div>

                    <div style={{ flex: '1 1 100%' }}>
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter portfolio description"
                            style={{ width: '100%', padding: '10px', marginBottom: '10px', minHeight: '80px', color: '#333', backgroundColor: '#f9f9f9' }}
                        />
                    </div>

                    <div style={{ flex: '1 1 100%' }}>
                        <label>Web Portfolio Link</label>
                        <input
                            type="text"
                            value={webPortfolioLink}
                            onChange={(e) => setWebPortfolioLink(e.target.value)}
                            placeholder="Enter web portfolio link"
                            style={{ width: '100%', padding: '10px', marginBottom: '10px', color: '#333', backgroundColor: '#f9f9f9' }}
                        />
                    </div>

                    <div style={{ flex: '1 1 100%' }}>
                        <label>Upload File</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                        />
                    </div>

                    <div style={{ flex: '1 1 100%', textAlign: 'center' }}>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: editIndex !== null ? '#FFA500' : '#28a745',
                                color: '#fff',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            {editIndex !== null ? 'Update Portfolio' : 'Submit Portfolio'}
                        </button>
                    </div>
                </form>

                {/* Portfolio Cards */}
                <div style={{ marginTop: '40px' }}>
                    {portfolioData.length > 0 && (
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '20px',
                            }}
                        >
                            {portfolioData.map((data, index) => (
                                <div
                                    key={index}
                                    style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        padding: '20px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <h4>Portfolio {index + 1}</h4>
                                    <p><strong>Title:</strong> {data.portfolioTitle}</p>
                                    <p><strong>Category:</strong> {data.category}</p>
                                    <p><strong>Description:</strong> {data.description}</p>
                                    <p><strong>Date:</strong> {data.date}</p>
                                    <p>
                                        <strong>Web Link:</strong>{' '}
                                        <a href={data.webPortfolioLink} target="_blank" rel="noopener noreferrer">
                                            {data.webPortfolioLink}
                                        </a>
                                    </p>
                                    <p><strong>File:</strong> {data.file ? data.file.name : 'No file uploaded'}</p>
                                    <button
                                        onClick={() => handleEdit(index)}
                                        style={{
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            marginTop: '10px',
                                        }}
                                    >
                                        Edit
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
