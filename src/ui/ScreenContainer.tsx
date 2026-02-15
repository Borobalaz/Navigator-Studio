import React, { useEffect, useState } from "react";
import "./ScreenContainer.css"
import { TabCard } from "./components/TabCard";
import { Tab, tabManager } from "./TabManager";

interface ScreenContainerProps {
  tabs: Tab[]
}

export function ScreenContainer({ tabs }: ScreenContainerProps) {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);

  useEffect(() => {
    const handleActiveTabChange = () => {
      setActiveTab(tabManager.getTabByLabel(tabManager.getActiveTab()?.label || "") || null);
    };
    tabManager.on("activeTabChange", handleActiveTabChange);
    return () => {
      tabManager.off("activeTabChange", handleActiveTabChange);
    };
  }, []);

  return (
    <div className="screen-container">
      <div className="screen-tab-list">
        {tabs.map((tab, index) => (
          <TabCard
            key={index}
            label={tab.label}
            active={activeTab?.label === tab.label}
            onClick={() => setActiveTab(tab)}
            onClose={() => {tabManager.removeTab(tab.label)}}
          />
        ))}
      </div>
      <div className="screen-container-screen">
        {activeTab?.component && React.createElement(activeTab.component, activeTab.props)}
      </div>
    </div>
  );
}