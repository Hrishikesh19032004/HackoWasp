import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDonations from '../AdminComponents/UserDonations';
import InstituteRequirements from '../AdminComponents/InstituteReq';
import MapComponent from '../Data/NGOMap';
import PurchaseForm from './PurchaseForm';
import MlComponent from '../python/ml';
import OrphanageMap from '../Data/Orphanage';

const AdminPage = () => {
  const handleShopRecommenderClick = () => {
    navigate('/admin/ml');
  };

  const handleMapClick = () => {
    navigate('/admin/map');
  };

  const handleOrphanageClick = () => {
    navigate('/admin/Orphanage');
  };

  const handleForecastClick = () => {
    navigate('/admin/livestream');
  };

  const handlePurchaseClick = () => {
    navigate('/admin/purchase');
  };

  const [activeComponent, setActiveComponent] = useState('donations');
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case 'donations':
        return <UserDonations />;
      case 'requirements':
        return <InstituteRequirements />;
      case 'map':
        return <MapComponent />;
      case 'purchase':
        return <PurchaseForm />;
      case 'rec':
        return <MlComponent />;
      default:
        return null;
    }
  };

  const handleDropdownChange = (event) => {
    const selectedComponent = event.target.value;
    setActiveComponent(selectedComponent);

    if (selectedComponent === 'Users') {
      navigate('/admin/users');
    } else if (selectedComponent === 'Institutes') {
      navigate('/admin/institutes');
    } else if (selectedComponent === 'donations') {
      navigate('/admin/donations');
    } else {
      navigate('/admin/final');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f7f7' }}>
      <nav style={{
        backgroundColor: '#FF5722',
        padding: '0.5rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        color: '#fff',
        borderRadius: '0 0 10px 10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '75vw',
        margin: '0 auto',
      }}>
        <select 
          value={activeComponent} 
          onChange={handleDropdownChange} 
          style={{
            backgroundColor: '#fff', 
            border: 'none',
            color: '#333', 
            fontSize: '1rem',
            cursor: 'pointer',
            marginRight: '1rem',
            marginLeft: '1rem', 
            padding: '0.5rem', 
            borderRadius: '4px', 
          }}
        >
          <option value="Users">Total Users</option>
          <option value="Institutes">Total Institutes</option>
          <option value="donations">User Donations</option>
          <option value="requirements">Institute Requirements</option>
        </select>

        <button onClick={() => setActiveComponent('rec')} style={{ ...navButtonStyle, marginRight: '2rem' }}>
          Shop Recommendation
        </button>

        <button onClick={() => setActiveComponent('map')} style={{ ...navButtonStyle, marginRight: '2rem' }}>
          Map
        </button>
        <button onClick={handleForecastClick} style={{ ...navButtonStyle, marginRight: '2rem' }}>
          LiveStream
        </button>
        <button onClick={() => setActiveComponent('purchase')} style={{ ...navButtonStyle, marginRight: '2rem' }}>
          Purchase
        </button>
      </nav>

      {/* Visually appealing section below the navbar */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,87,34,0.8), rgba(255,193,7,0.8)), url("https://source.unsplash.com/featured/?technology")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        textAlign: 'center',
        padding: '4rem 2rem',
        borderRadius: '10px',
        marginTop: '1.5rem',
        marginBottom: '2rem',
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Welcome to the Admin Dashboard</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          Manage user donations, view institute requirements, and access various administrative tools to keep everything running smoothly. Explore our recommendations and stay informed with real-time updates.
        </p>
      </div>

      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {renderComponent()}
      </div>
    </div>
  );
};

const navButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#fff',
  fontSize: '1rem',
  cursor: 'pointer',
};

export default AdminPage;
