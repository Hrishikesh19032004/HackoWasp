import D1 from '../Images/D1.jpg'
import D2 from '../Images/D2.jpg'
import D3 from '../Images/D3.jpg'
import Container from "../Container";
import SectionTitle from "./SectionTitle";

const cards = [
  {
    id: 1,
    image: D1,
    title: "Food Donations",
  },
  {
    id: 2,
    image: D2,
    title: "Waste Reduction",
  },
  {
    id: 3,
    image: D3,
    title: "Composting Partners",
  },
];


const DiscoverCard = ({ card }) => {
  return (
    <div className="relative rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform flex flex-col h-full w-full">
      <img
        src={card.image}
        alt="discover_image"
        className="object-cover w-full h-60" // Set a fixed height for images
      />
      <div className="absolute bottom-10 capitalize left-10 text-white font-bold md:text-[50px] text-[40px]">
        {card.title}
      </div>
    </div>
  );
};


export default function Discover() {
  return (
    <section className="my-14">
      <Container>
        <div>
          <SectionTitle title="discover" />
          <div className="grid lg:grid-cols-3 mt-8 sm:grid-cols-2 grid-cols-1 place-items-center lg:gap-14 gap-4">
            {cards.map((card) => (
              <DiscoverCard card={card} key={card.id} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
