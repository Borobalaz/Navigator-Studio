import "./ViewCard.css"
import { SvgIconProps } from "@mui/material";
import { ViewCardScreenSelector } from "./ViewCardScreenSelector";
import React from "react";
import { ProgramLabelProps } from "./ProgramLabel";

interface ViewCardProps {
  icon: React.ComponentType<SvgIconProps>;
  programLabelProps: ProgramLabelProps[];
  title?: string;
  active?: boolean;
}

export function ViewCard({ icon, programLabelProps, title, active = false }: ViewCardProps) {

  return (
    <div className="view-card-wrapper">
      <div className={`view-card${active ? ' active' : ''}`} title={title}>
        {icon && React.createElement(icon)}
      </div>
      <ViewCardScreenSelector programLabelProps={programLabelProps}/>
    </div>
  );
}
