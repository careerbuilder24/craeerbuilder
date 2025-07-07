import useSavedPortfolioSaved from '@/hooks/useSavedPortfolioSaved'
import useMatchingUploadedPortfolio from '@/hooks/useMatchingUploadedPortfolio'
import React from 'react'

export default function UploadedPortfolio() {
  const [studentSavedPortfolio] = useSavedPortfolioSaved();
  const {matchedStudentPortfolio} = useMatchingUploadedPortfolio();

  console.log(matchedStudentPortfolio)

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center my-12">Uploaded Portfolios</h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {matchedStudentPortfolio?.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-[45%] lg:w-[30%] xl:w-[23%] transition hover:shadow-lg"
          >
            <img
              src={item.file}
              alt={item.portfolioTitle}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{item.portfolioTitle}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Category:</strong> {item.category}
              </p>
              <p className="text-sm text-gray-500 break-all">
                <strong>Link:</strong>{' '}
                <a
                  href={item.webPortfolioLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {item.webPortfolioLink}
                </a>
              </p>
              <p className="text-sm text-gray-400 mt-2">
                <strong>Date:</strong>{' '}
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
