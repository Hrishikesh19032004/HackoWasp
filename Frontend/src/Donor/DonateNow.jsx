

import React, { useState, useRef } from "react"
import axios from "axios"
import UrgentDonationForm from "./UrgentDonationForm"
import OrganizationCarousel from "./OrganizationCarousel"
import "./styles.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"

export default function DonateNowComponent() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    unit: "", // Added unit for quantity
    expirationDate: "",
    pickupOption: "",
    location: "",
    contact: "",
  })
  const navigate = useNavigate();
  const videoRef = useRef(null)
  const [isScanning, setIsScanning] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [showUrgentForm, setShowUrgentForm] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  
    const token = localStorage.getItem("token") // Assuming the token is saved in localStorage
  
    const formDataToSend = new FormData()
    formDataToSend.append("foodName", formData.foodName)
    formDataToSend.append("quantity", formData.quantity)
    formDataToSend.append("expirationDate", formData.expirationDate)
    formDataToSend.append("category", formData.unit)
    formDataToSend.append("pickupLocation", formData.location)
    formDataToSend.append("contactDetails", formData.contact)
    
    if (uploadedImage) {
      const imageBlob = await fetch(uploadedImage)
        .then((res) => res.blob())
      formDataToSend.append("photo", imageBlob, "image.jpg")
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/food-posts/create",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure that this header is set for file upload
            Authorization: `Bearer ${token}`, // Add the token to the header
          },
        }
      )
  
      console.log("Response:", response.data)
      alert("Thank you for your donation!")
      setShowForm(false);
      navigate("/certificate", { state: { formData } });
    } catch (error) {
      console.error("Error submitting donation:", error)
      alert("Something went wrong! Please try again.")
    }
  }
  
  const startCamera = async () => {
    setIsScanning(true)
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    if (videoRef.current) videoRef.current.srcObject = stream
  }

  const captureImage = () => {
    if (!videoRef.current) return null

    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")

    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
    const imageData = canvas.toDataURL("image/jpeg")
    setCapturedImage(imageData)

    return imageData
  }

  const uploadImage = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const detectFood = async (imageData) => {
    if (!imageData) return

    if (videoRef.current) {
      const stream = videoRef.current.srcObject
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      videoRef.current.srcObject = null
    }
    setIsScanning(false)

    try {
      const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/fruits-24xta/1",
        params: {
          api_key: "5KzeotyZOJzrCeCGXB11",
        },
        data: imageData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      console.log("Roboflow Response:", response.data)

      if (response.data.predictions && response.data.predictions.length > 0) {
        const detectedFood = response.data.predictions[0].class
        setFormData((prevState) => ({
          ...prevState,
          foodName: detectedFood,
        }))
      } else {
        setFormData((prevState) => ({
          ...prevState,
          foodName: "Food not detected",
        }))
      }
    } catch (error) {
      console.error("Error detecting food:", error.message)
    }
  }

  const handleFoodDetection = () => {
    const imageData = capturedImage || uploadedImage
    detectFood(imageData)
  }
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* <Navbar/> */}
      <div className="container mx-auto px-4 py-8">
        {/* Top Heading */}
        <h1 className="text-4xl font-bold mb-8" style={{ textAlign: "center", color: "#1aa14b" }}>
          Donation Form
        </h1>

        {!showForm ? (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title text-2xl font-bold" style={{ color: "#1aa14b", textAlign: "center" }}>
                Donation Form
              </h2>
            </div>
            <div className="card-content">
              <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                  <label htmlFor="foodName" className="label">
                    Food Name
                  </label>
                  <input
                    type="text"
                    id="foodName"
                    name="foodName"
                    placeholder="Enter or detect food name"
                    value={formData.foodName}
                    onChange={handleInputChange}
                    required
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label className="label">Scan Food</label>
                  {!isScanning ? (
                    <button type="button" onClick={startCamera} className="button">
                      Start Camera & Scan
                    </button>
                  ) : (
                    <div>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        style={{ width: "600px", height: "450px", objectFit: "cover" }} // Adjust size here
                      />

                      <button type="button" onClick={() => detectFood(captureImage())} className="button">
                        Detect Food
                      </button>
                    </div>
                  )}
                </div>

                {capturedImage && (
                  <div>
                    <h3>Captured Image:</h3>
                    <img
                      src={capturedImage || "/placeholder.svg"}
                      alt="Captured"
                      style={{ width: "300px", height: "200px", objectFit: "cover", borderRadius: "8px" }} // Adjust size here
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="uploadImage" className="label">
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    id="uploadImage"
                    name="uploadImage"
                    accept="image/*"
                    onChange={uploadImage}
                    className="input"
                  />
                  {uploadedImage && (
                    <div>
                      <h3>Uploaded Image:</h3>
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded"
                        style={{ width: "300px", height: "200px", objectFit: "cover", borderRadius: "8px" }} // Adjust size here
                      />
                    </div>
                  )}
                </div>

                <button type="button" onClick={handleFoodDetection} className="button">
                  Detect Food
                </button>

                <div className="form-group">
                  <label htmlFor="quantity" className="label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    className="input"
                  />
                </div>

                {/* Unit Selection */}
                <div className="form-group">
                  <label htmlFor="unit" className="label">
                    Unit
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="select"
                    required
                  >
                    <option value="">Select Unit</option>
                    <option value="kgs">Kgs</option>
                    <option value="pounds">Pounds</option>
                    <option value="dozens">Dozens</option>
                    <option value="units">Units</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="expirationDate" className="label">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    id="expirationDate"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    required
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pickupOption" className="label">
                    Pickup Option
                  </label>
                  <select
                    name="pickupOption"
                    value={formData.pickupOption}
                    onChange={handleInputChange}
                    className="select"
                  >
                    <option value="">Select Option</option>
                    <option value="pickup">Pickup</option>
                    <option value="dropoff">Drop-off</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="location" className="label">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Your Location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact" className="label">
                    Contact Information
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    placeholder="Your Contact Information"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    className="input"
                  />
                </div>

                <button type="submit" className="button">
                  Submit Donation
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title text-2xl font-bold" style={{ color: "#1aa14b" }}>
                List Your Food for Donation
              </h2>
            </div>
            <div className="card-content">
              <form onSubmit={handleSubmit} className="form">
                {/* ... (rest of the form content remains unchanged) ... */}
              </form>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1aa14b", textAlign: "center" }}>
            Who Needs Your Help Right Now?
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <OrganizationCarousel
              organizations={[
                {
                  id: 1,
                  name: "Local Food Bank #1",
                  needs: "Canned goods, rice, pasta",
                  location: "123 Main St, Anytown, USA",
                },
                {
                  id: 2,
                  name: "Local Food Bank #2",
                  needs: "Fresh produce, dairy products",
                  location: "456 Oak Ave, Somewhere, USA",
                },
                {
                  id: 3,
                  name: "Local Food Bank #3",
                  needs: "Baby food, diapers, formula",
                  location: "789 Pine Rd, Elsewhere, USA",
                },
              ]}
              onDonate={(org) => {
                setSelectedOrganization(org)
                setShowUrgentForm(true)
              }}
            />
          </div>
        </div>
      </div>
      {showUrgentForm && selectedOrganization && (
        <UrgentDonationForm
          organizationName={selectedOrganization.name}
          location={selectedOrganization.location}
          urgentNeeds={selectedOrganization.needs}
          onClose={() => setShowUrgentForm(false)}
        />
      )}
    </div>
  )
}
