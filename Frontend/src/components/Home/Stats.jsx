export default function Stats() {
  return (
    <section className="stats_box py-10 grid place-items-center lg:grid-cols-4 grid-cols-2 gap-4 sm:w-9/12 w-11/12 mx-auto -mt-8 px-4">
      <div>
        <h1 className="md:text-[40px] text-[25px] font-bold">3M+</h1>
        <p>Meals Saved from Waste</p>
      </div>
      <div>
        <h1 className="md:text-[40px] text-[25px] font-bold">1500+</h1> 
        <p>Food Recovery Partners</p>
      </div>
      <div>
        <h1 className="md:text-[40px] text-[25px] font-bold">₹100M</h1> 
        <p>Funding for Waste Reduction</p>
      </div>
      <div>
        <h1 className="md:text-[40px] text-[25px] font-bold">75+</h1>
        <p>Composting Initiatives</p>
      </div>
    </section>
  );
}
