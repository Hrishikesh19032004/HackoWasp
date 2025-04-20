import React, { useState } from "react"

const UrgentDonationForm = ({ organizationName, location, urgentNeeds, onClose }) => {
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    unit: "",
    deliveryOption: "",
    contact: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Urgent donation submitted:", formData)
    alert("Thank you for your urgent donation!")
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-2xl font-bold text-[#1aa14b] mb-4">Urgent Donation to {organizationName}</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="foodName" className="label">
              Food Name
            </label>
            <input
              type="text"
              id="foodName"
              name="foodName"
              value={formData.foodName}
              onChange={handleInputChange}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity" className="label">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="unit" className="label">
              Unit
            </label>
            <select
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              required
              className="input"
            >
              <option value="">Select Unit</option>
              <option value="kgs">Kgs</option>
              <option value="dozens">Dozens</option>
              <option value="unit">Unit</option>
              <option value="pounds">Pounds</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="deliveryOption" className="label">
              Delivery Option
            </label>
            <select
              id="deliveryOption"
              name="deliveryOption"
              value={formData.deliveryOption}
              onChange={handleInputChange}
              required
              className="input"
            >
              <option value="">Select Delivery Option</option>
              <option value="pickup">Pickup</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="contact" className="label">
              Contact Information
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="button">
              Submit Urgent Donation
            </button>
            <button
              onClick={onClose}
              className="button"
              style={{ marginLeft: "10px", backgroundColor: "#ccc", color: "#333" }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UrgentDonationForm
