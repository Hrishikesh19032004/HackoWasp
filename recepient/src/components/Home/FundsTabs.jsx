import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FundCards from "./FundCards";
import SectionTitle from "./SectionTitle";

const fundData = {
  all: [
    { title: "General Fund A", description: "Support for various projects.", amount: "₹10M" },
    { title: "General Fund B", description: "Support for various projects.", amount: "₹5M" },
  ],
  biotechnology: [
    { title: "BioTech Fund A", description: "Innovative solutions for health.", amount: "₹20M" },
    { title: "BioTech Fund B", description: "Research funding for biotech.", amount: "₹15M" },
  ],
  agriculture: [
    { title: "AgriFund A", description: "Support sustainable agriculture.", amount: "₹12M" },
    { title: "AgriFund B", description: "Funding for new technologies.", amount: "₹8M" },
  ],
  economy: [
    { title: "EconoFund A", description: "Economic recovery initiatives.", amount: "₹30M" },
    { title: "EconoFund B", description: "Support local businesses.", amount: "₹25M" },
  ],
};

export default function FundsTabs() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Tabs className="sm:mt-0 mt-14" selectedIndex={selectedIndex} onSelect={handleSelect}>
      <div className="flex items-center sm:justify-between justify-center flex-wrap my-8">
        <SectionTitle title="hot funds" />
        <TabList className="flex overflow-auto">
          <Tab className="px-4 py-3 cursor-pointer font-bold sm:text-[16px] text-[14px]">
            All
          </Tab>
          <Tab className="px-4 py-3 cursor-pointer font-bold sm:text-[16px] text-[14px]">
            Construction
          </Tab>
          <Tab className="px-4 py-3 cursor-pointer font-bold sm:text-[16px] text-[14px]">
            Bio Technology
          </Tab>
          <Tab className="px-4 py-3 cursor-pointer font-bold sm:text-[16px] text-[14px]">
            Agriculture
          </Tab>
          <Tab className="px-4 py-3 cursor-pointer font-bold sm:text-[16px] text-[14px]">
            Economy
          </Tab>
        </TabList>
      </div>

      <TabPanel>
        <FundCards funds={fundData.all} />
      </TabPanel>
      <TabPanel>
        <FundCards funds={fundData.biotechnology} />
      </TabPanel>
      <TabPanel>
        <FundCards funds={fundData.agriculture} />
      </TabPanel>
      <TabPanel>
        <FundCards funds={fundData.economy} />
      </TabPanel>
    </Tabs>
  );
}
