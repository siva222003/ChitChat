import { useEffect, useState } from "react";
import { conversations, groups } from "../utils/constants";
import { Dashboard, DashboardEnum } from "../types/chat.types";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import Conversations from "../components/dashboard/Conversations";
import Groups from "../components/dashboard/Groups";
import Contacts from "../components/dashboard/Contacts";

type SideNavLGProps = {
  currentTab: Dashboard;
  setCurrentTab: React.Dispatch<React.SetStateAction<Dashboard>>;
};

const SideNavLG = ({ currentTab ,setCurrentTab}: SideNavLGProps) => {
  return (
    <nav className="bg-[#F8FAFF] px-6 py-6  max-h-screen overflow-auto">
      <DashboardHeader setCurrentTab={setCurrentTab} currentTab={currentTab} />

      {currentTab === DashboardEnum.Conversations && <Conversations />}
      {currentTab === DashboardEnum.Groups && <Groups />}
      {currentTab === DashboardEnum.Contacts && <Contacts />}
      {currentTab === DashboardEnum.Archived && <Conversations archived={currentTab === DashboardEnum.Archived} conversations={conversations} />}
    </nav>
  );
};

export default SideNavLG;
