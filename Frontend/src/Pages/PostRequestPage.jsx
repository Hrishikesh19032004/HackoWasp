import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const PostRequestPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    instituteName: '',
    donationType: '',
    totalAmount: '',
  });
  const [postedRequests, setPostedRequests] = useState([]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormData({
      instituteName: '',
      donationType: '',
      totalAmount: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostedRequests((prev) => [...prev, formData]);
    closeModal();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f7f7', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Post Your Donation Requirements</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {postedRequests.map((request, index) => (
            <div key={index} style={{
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{request.instituteName}</h3>
              <p style={{ color: '#666' }}>Type of Donation: {request.donationType}</p>
              <p style={{ color: '#666' }}>Total Amount Required: {request.totalAmount}</p>
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            position: 'relative'
          }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Post Requirements</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label htmlFor="instituteName" style={{ display: 'block', marginBottom: '.5rem' }}>Institute Name</label>
                <input
                  type="text"
                  id="instituteName"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleChange}
                  placeholder="Enter institute name"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  required
                />
              </div>
              <div>
                <label htmlFor="donationType" style={{ display: 'block', marginBottom: '.5rem' }}>Type of Donation</label>
                <input
                  type="text"
                  id="donationType"
                  name="donationType"
                  value={formData.donationType}
                  onChange={handleChange}
                  placeholder="Enter type of donation (e.g., rice, wheat)"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  required
                />
              </div>
              <div>
                <label htmlFor="totalAmount" style={{ display: 'block', marginBottom: '.5rem' }}>Total Amount Required</label>
                <input
                  type="number"
                  id="totalAmount"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  placeholder="Enter total amount required"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: '#FF5722',
                  color: '#fff',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  border: 'none',
                  fontSize: '1rem',
                }}
              >
                Submit
              </button>
            </form>

            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <button
        onClick={openModal}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          backgroundColor: '#FF5722',
          color: '#fff',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        +
      </button>
    </div>
  );
};

export default PostRequestPage;
