import useSavedPortfolioSaved from '@/hooks/useSavedPortfolioSaved'
import React from 'react'

export default function UploadedPortfolio() {

  const [studentSavedPortfolio] = useSavedPortfolioSaved();

  console.log(studentSavedPortfolio)
  return (
    <div>
      <h1>siguie</h1>
    </div>
  )
}
