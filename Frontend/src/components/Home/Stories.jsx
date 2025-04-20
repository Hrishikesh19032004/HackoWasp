import React from "react";
import Container from "../Container";
import SectionTitle from "./SectionTitle";
import random from "../../assets/random.png";

const successStories = [
  "Thanks to your donations, we provided food to over 500 families in need this month!",
  "Our health care program helped 30 elderly citizens receive necessary medical attention.",
  "With your support, we opened a new educational center for underprivileged children.",
  "Over 200 children received school supplies and uniforms thanks to generous donors!",
  "Your contributions allowed us to feed the homeless every day for a week.",
  "We provided blankets and warm clothes to 150 elderly individuals during winter.",
  "Our medical camp treated 100+ patients with free check-ups and medicines.",
  "Thanks to your help, we started a new literacy program for adults.",
  "Your support helped us host a community health awareness event.",
  "With your donations, we could renovate the orphanage's kitchen facilities.",
  "We distributed over 1,000 books to children in local schools.",
  "Thanks to the community, our elderly care program reached 200 families.",
  "We organized a sports day for underprivileged children, promoting health and fitness.",
  "Your donations helped us provide mental health support for 50 individuals.",
  "We have now established a mobile food bank serving various neighborhoods.",
  "With your help, we launched a gardening program for children to learn and grow.",
  "Thanks to our supporters, we provided scholarships to five deserving students.",
  "Your contributions helped us host a winter festival for needy families.",
  "We facilitated vocational training for 20 individuals, enhancing their job prospects.",
  "Your donations helped us rescue and rehabilitate several abandoned pets.",
  
];

const NewsCard = ({ text }) => (
  <div className="w-[320px] px-4 py-6 bg-white rounded-md news_card_shadow">
    <p className="text-[#5B6469] font-bold text-[15px]">{text} </p>
    <div className="pt-7 text-[13px] flex items-center gap-2">
      <img src={random} alt="person" className="w-10 h-10 rounded-full" />
      <div>
        <h1 className="font-medium">Joy Arnold</h1>
        <p className="text-[#BFBFC8]">@JoyArnold222</p>
      </div>
    </div>
  </div>
);

export default function Stories() {
  return (
    <section className="my-14">
      <Container>
        <div className="pt-14 pb-4 h-[700px] overflow-auto bg-[#F7F7F7] flex items-center lg:flex-nowrap flex-wrap gap-1">
          <article className="lg:w-1/2 w-full lg:pb-0 pb-4 flex flex-col lg:items-start items-center lg:ml-14 lg:mt-52">
            <SectionTitle title="Success Stories" />
            <p className="text-[#5B6469]">Let's see what people say about us</p>
          </article>
          <div className="flex gap-4 sm:flex-nowrap flex-wrap lg:w-1/2 mx-auto">
            <div className="rounded-md w-full flex flex-col gap-3 items-center">
              {successStories.slice(0, 10).map((text, index) => (
                <NewsCard key={index} text={text} />
              ))}
            </div>
            <div className="rounded-md w-full flex flex-col gap-3 items-center">
              {successStories.slice(10).map((text, index) => (
                <NewsCard key={index + 10} text={text} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
