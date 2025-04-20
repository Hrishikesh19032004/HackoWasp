import React from 'react';
import Image from '../Images/About.jpg';
import i1 from '../Images/Aboutpfp.jpg';
import Navbar from '../components/Navbar';

const teamMembers = [
  {
    name: 'Hrishikesh ',
    role: 'Founder & CEO',
    imgUrl: './src/assets/person.png',
  },
  {
    name: 'Aarav Jain',
    role: 'Community Outreach Specialist',
    imgUrl: './src/assets/person.png',
  },
  {
    name: 'Meet Kadam',
    role: 'Lead Data Scientist',
    imgUrl: './src/assets/person.png',
  },
  {
    name: 'Prem ',
    role: 'Marketing & Partnerships Manager',
    imgUrl: './src/assets/person.png',
  },
];

const Aboutus = () => {
  return (
    <>
    {/* <Navbar/> */}
      <section
        style={{
          backgroundColor: '#f9f9f9',
          padding: '60px 0',
          textAlign: 'center',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div
          style={{
            width: '80%',
            margin: '0 auto',
          }}
        >
          <h1
            style={{
              fontSize: '50px', // 25% increased
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '20px',
              lineHeight: '1.3',
            }}
          >
            About Us
          </h1>
          <p
            style={{
              fontSize: '22px', // 25% increased
              color: '#7f8c8d',
              marginBottom: '40px',
              fontWeight: '400',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            Tackling Food Waste Through Community Donations
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ width: '50%', padding: '20px' }}>
            <h2
              style={{
                fontSize: '38px', // 25% increased
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '15px',
              }}
            >
              Welcome to Samuhik Seva
            </h2>
            <p
              style={{
                fontSize: '20px', // 25% increased
                lineHeight: '1.6',
                color: '#7f8c8d',
                marginBottom: '15px',
              }}
            >
              At Samuhik Seva, our mission is to reduce food waste by connecting donors with institutions in need, such as orphanages and elderly homes. Our platform enables individuals and organizations to donate excess food, ensuring it reaches those who need it most.
            </p>
            <p
              style={{
                fontSize: '20px', // 25% increased
                lineHeight: '1.6',
                color: '#7f8c8d',
                marginBottom: '15px',
              }}
            >
              Through our transparent donation process, we aim to prevent food from going to waste while supporting communities in need. Our system ensures that every donation is tracked and delivered efficiently, with no middlemen involved.
            </p>
            <p
              style={{
                fontSize: '20px', // 25% increased
                fontWeight: 'bold',
                color: '#2c3e50',
                lineHeight: '1.6',
              }}
            >
              Join us in our efforts to tackle food waste and make a positive impact on communities across the country.
            </p>
          </div>

          <div style={{ width: '50%', padding: '20px' }}>
            <img
              src={Image}
              alt="Supporting Communities"
              style={{
                width: '100%',
                borderRadius: '10px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              }}
            />
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: '#fff',
          padding: '60px 0',
          textAlign: 'center',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <h2
          style={{
            fontSize: '38px', // 25% increased
            fontWeight: '700',
            color: '#2c3e50',
            marginBottom: '30px',
          }}
        >
          Meet Our Team
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '30px',
          }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              style={{
                width: '250px',
                padding: '25px',
                textAlign: 'center',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
              }}
            >
              <img
                src={i1}
                alt={member.name}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  marginBottom: '15px',
                  objectFit: 'cover',
                  border: '4px solid #2c3e50',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
              />
              <h3
                style={{
                  fontSize: '25px', // 25% increased
                  fontWeight: '700',
                  marginBottom: '10px',
                  color: '#2c3e50',
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontSize: '20px', // 25% increased
                  fontWeight: '500',
                  color: '#7f8c8d',
                }}
              >
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Aboutus;
