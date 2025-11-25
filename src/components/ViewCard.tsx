import "./ViewCard.css"
import { SvgIconProps } from "@mui/material";
import { ViewCardScreenSelector } from "./ViewCardScreenSelector";
import React from "react";

interface ViewCardProps {
  icon: React.ComponentType<SvgIconProps>;
}

export function ViewCard({ icon }: ViewCardProps) {

  return (
    <div className="view-card-wrapper">
      <div className="view-card">
        {icon && React.createElement(icon)}      
      </div>
      <ViewCardScreenSelector />
    </div>
  );
}
