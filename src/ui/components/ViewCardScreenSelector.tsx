import "./ViewCardScreenSelector.css"
import { ProgramLabel, ProgramLabelProps } from "./ProgramLabel";

interface ViewCardScreenSelectorProps {
  programLabelProps: ProgramLabelProps[];
}

export function ViewCardScreenSelector({ programLabelProps }: ViewCardScreenSelectorProps) {


  return (
    <div className="view-card-screen-selector">
      {programLabelProps.map((props, index) => (
        <ProgramLabel key={index} {...props}/>
      ))}
    </div>
  );
}