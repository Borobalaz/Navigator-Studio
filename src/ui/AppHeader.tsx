import './AppHeader.css';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { MouseEvent, ReactNode } from 'react';

export function AppHeader() {
  return (
    <div className="app-header">
      <div className="app-header-title">
      <img src="public/electron-vite.svg" alt="Logo" className="app-header-logo" />
      <p>Navigator Studio</p>
      </div>
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
    // Prevent focus + keep drag behavior stable in Electron
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