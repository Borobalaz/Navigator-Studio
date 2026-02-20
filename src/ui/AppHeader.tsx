import './AppHeader.css';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { MouseEvent, ReactNode } from 'react';
import Logo from './../assets/balazslogo.svg';

export function AppHeader() {

  return (
    <div className="app-header">
      <div className="app-header-logo-container">
        <img src={Logo} alt="Logo" className="app-header-logo" />
      </div>
      <p className="app-header-title">Navigator Studio</p>
      <div className="app-header-buttons">
        <TitlebarButton onClick={() => window.api.minimize()}>
          <MinimizeIcon />
        </TitlebarButton>
        <TitlebarButton onClick={() => window.api.maximize()}>
          <CropFreeIcon />
        </TitlebarButton>
        <TitlebarButton id="close-button" onClick={() => window.api.close()}>
          <CloseIcon />
        </TitlebarButton>
      </div>
    </div>
  );
}

type TitlebarButtonProps = {
  children: ReactNode;
  onClick: () => void;
  id?: string;
  className?: string;
};

export function TitlebarButton({
  children,
  onClick,
  id,
  className = "",
}: TitlebarButtonProps) {
  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <button
      id={id}
      className={`titlebar-button ${className}`}
      tabIndex={-1}
      onMouseDown={handleMouseDown}
      onClick={onClick}
    >
      {children}
    </button>
  );
}