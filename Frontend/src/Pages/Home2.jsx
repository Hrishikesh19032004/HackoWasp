import Discover from "../components/Home/Discover";
import Front from "../components/Home/Front";
import HowItWorks from "../components/Home/HowItWorks";
import Quiz from "../components/Home/Quiz";
import Stats from "../components/Home/Stats";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";



export default function Home2() {
  return (
    <main>
      <Navbar2/>
      <Front />
      <Stats />
      <Quiz />
      <Discover />
      <HowItWorks />
      
      
    </main>
  );
}
