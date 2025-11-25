import React, { useState } from "react";
import "./ScreenContainer.css"
import { TabCard } from "../components/TabCard";

export type Tab = {
  label: string;
  component: React.ComponentType<any>;
  props?: any;
};

interface ScreenContainerProps {
  tabs: Tab[]
}

export function ScreenContainer({ tabs }: ScreenContainerProps) {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);

  return (
    <div className="screen-container">
      <div className="screen-tab-list">
        {tabs.map((tab) => (
          <TabCard
            key={tab.label}
            label={tab.label}
            active={activeTab?.label === tab.label}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>      
      <div className="screen-container-screen">
        {activeTab?.component && React.createElement(activeTab.component, activeTab.props)}
      </div>
    </div>
  );
}