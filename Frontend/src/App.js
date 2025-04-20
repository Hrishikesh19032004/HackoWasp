
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React from 'react';
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignUpIn from "./Pages/SignInUp";
import Aboutus from "./Pages/About";
// import VolunteerSignUp from "./Pages/VolunteerSignUp";
// import VolunteerLogin from "./Pages/VolunteerLogin";
import ContactUs from "./Pages/ContactUs";
// import DonationPage from "./Pages/DonationPage";
import AdminLogin from "./Pages/AdminLogin";
import AdminPage from "./Pages/Admin";
import TotalUsers from "./Pages/TotalUsers";
import TotalInsti from "./Pages/TotalInsti";
import TotalDonations from "./Pages/TotalDonations";

import Donations from "./Pages/FinalDonations";

import LiveStream from "./Pages/LiveStream";
import PurchaseForm from "./Pages/PurchaseForm";
import NGOMap from "./Data/NGOMap";
// import FraudDetection from "./Pages/Fraud";
import OrphanageMap from "./Data/Orphanage";

import RecipientLogin from "./Pages/RecipientLogin";
import RecipientSignUp from "./Pages/RecipientSignUp";
import DonorLogin from "./Pages/DonorLogin";
import DonorSignUp from "./Pages/DonorSignUp";

import ImpactPage from "./Pages/ImpactComponent/Impact";
import DonateNowComponent from "./Donor/DonateNow";
import { ParentComponent } from "./newdonor/ParentComponent";
import FoodWasteAnalysis from "./ImpactAnalysisComp/ImpactAnalysis";
import MapComponent from "./Map1/FoodBankComp";
import Home2 from "./Pages/Home2";
import FraudDetection from "./Flask/Fraud";
import { AvailableDonations } from "./rec/availableDonations";
import EcommercePage from "./ecom/ecom";
import { Leaderboard } from "./ecom/leaderboard";
import GoogleTranslate from "./components/GoogleTranslate";
import DonateRouter from "./DonateRouter";
import FormComponent from "./MapFinal/FormComponent";
import PopUpMap from "./MapFinal/PopUpMap";
import RecipeGenerator from "./Recipe/RecipeGenerator";
import { MyPlugin } from "./newdonor/certificate";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <GoogleTranslate/>
    <Routes>
      <Route path="/home" element={<Home />} />
      {/* <Route path="/homer" element={<Home2 />} /> */}

      <Route path="/About" element={<Aboutus />} />
      <Route path="/ContactUs" element={<ContactUs />} />
      {/* <Route path="/Impact" element={<ImpactPage />} /> */}
      <Route path="/donate" element={<DonateRouter/>}/>
      <Route path="/applications" element={<ParentComponent/>}/>
      <Route path="/map" element={<MapComponent/>}/>

      <Route path="/impactful" element={<FoodWasteAnalysis/>}/>
      <Route path="/certificate" element={<MyPlugin/>}/>

      <Route path="/fraud" element={<FraudDetection/>}/>
      <Route path="/ecom" element={<EcommercePage/>}/>
      <Route path="/leaderboard" element={<Leaderboard/>}/>
      <Route path="/urgentDonate" element={<FormComponent/>}/>
      <Route path="/donateNow" element={<DonateNowComponent/>}/>
      <Route path="/popupMap" element={<PopUpMap/>}/>
      <Route path="/recipe" element={<RecipeGenerator/>}/>






      {/* <Route path="/livestream" element={<LiveStream/>}/> */}
      {/* <Route path="/rec" element={<AvailableDonations/>}/> */}






      {/* Volunteer paths */}
      {/* <Route path="/Volunteer/VolunteerSignIn" element={<VolunteerSignUp />} />
      <Route path="/Volunteer/VolunteerLogin" element={<VolunteerLogin />} /> */}
      {/* <Route path="/Volunteer/DonationPage" element={<DonationPage />} /> */}
      {/* Volunteer paths */}
      
      <Route path="Recipient/RecipientLogin" element={<RecipientLogin />}/>
      <Route path="Recipient/RecipientSignUp" element={<RecipientSignUp />}/>

      <Route path="Donor/DonorSignUp" element={<DonorSignUp />}/>
      <Route path="Donor/DonorLogin" element={<DonorLogin />}/>


      {/* Admin Path */}
      <Route path="/" element={<SignUpIn />} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
