import React, { useState } from "react"

const OrganizationCarousel = ({ organizations, onDonate }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextOrg = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % organizations.length)
  }

  const prevOrg = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + organizations.length) % organizations.length)
  }

  const currentOrg = organizations[currentIndex]

  return (
    <div className="carousel">
      <div className="carousel-header">
        <h3 className="text-xl font-bold" style={{ textAlign: "center" }}>
          {currentOrg.name}
        </h3>
      </div>
      <div className="carousel-content" style={{ textAlign: "center" }}>
        <p>
          <strong>Urgently needs:</strong> {currentOrg.needs}
        </p>
        <p>
          <strong>Location:</strong> {currentOrg.location}
        </p>
        <button onClick={() => onDonate(currentOrg)} className="button">
          Donate Here
        </button>
      </div>
      <div className="carousel-nav">
        <button onClick={prevOrg} className="button">
          ← Previous
        </button>
        <button onClick={nextOrg} className="button">
          Next →
        </button>
      </div>
    </div>
  )
}

export default OrganizationCarousel

