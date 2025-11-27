import "./ViewCard.css"
import { SvgIconProps } from "@mui/material";
import { ViewCardScreenSelector } from "./ViewCardScreenSelector";
import React from "react";
import { ProgramLabelProps } from "./ProgramLabel";

interface ViewCardProps {
  icon: React.ComponentType<SvgIconProps>;
  programLabelProps: ProgramLabelProps[];
}

export function ViewCard({ icon, programLabelProps }: ViewCardProps) {

  return (
    <div className="view-card-wrapper">
      <div className="view-card">
        {icon && React.createElement(icon)}      
      </div>
      <ViewCardScreenSelector programLabelProps={programLabelProps}/>
    </div>
  );
}
