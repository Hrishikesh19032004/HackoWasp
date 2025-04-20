import Discover from "../components/Home/Discover";
import Front from "../components/Home/Front";
import HowItWorks from "../components/Home/HowItWorks";
import Quiz from "../components/Home/Quiz";
import Stats from "../components/Home/Stats";
import Navbar from "../components/Navbar";



export default function Home() {
  return (
    <main>
      {/* <Navbar/> */}
      <Front />
      <Stats />
      <Quiz />
      <Discover />
      <HowItWorks />
      
      
    </main>
  );
}
