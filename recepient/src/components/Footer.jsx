import Image from '../Images/globe.png';
import Container from "./Container";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#212121] py-14 text-white">
      <Container>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 place-items-center text-center sm:text-left">
          <div className="flex items-center space-x-4 sm:justify-start justify-center">
            <img src={Image} alt="Logo" className="h-12 w-auto" />
            <span className="text-xl font-bold text-white">AaharSetu
            </span>
          </div>

          <div>
            <h1 className="font-bold capitalize pb-4">Company</h1>
            <ul className="space-y-2">
              <li><Link to="/">About Us</Link></li>
              <li><Link to="/">Contact Us</Link></li>
              <li><Link to="/">Knowledge Base</Link></li>
              <li><Link to="/">Tutorials</Link></li>
              <li><Link to="/">Terms and Conditions</Link></li>
              <li><Link to="/">Cookie Policy</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h1 className="font-bold capitalize pb-4">Browse</h1>
            <ul className="space-y-2">
              <li><Link to="/">Memberships</Link></li>
              <li><Link to="/">Jobs</Link></li>
              <li><Link to="/">Experts</Link></li>
              <li><Link to="/">Organizations</Link></li>
              <li><Link to="/">Funding</Link></li>
              <li><Link to="/">Awards</Link></li>
              <li><Link to="/">Donors</Link></li>
              <li><Link to="/">News</Link></li>
            </ul>
          </div>

          <div>
            <h1 className="font-bold capitalize pb-4">Connect</h1>
            <ul className="space-y-2">
              <li><Link to="/">Twitter</Link></li>
              <li><Link to="/">Facebook</Link></li>
              <li><Link to="/">LinkedIn</Link></li>
              <li><Link to="/">YouTube</Link></li>
              <li><Link to="/">RSS</Link></li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
