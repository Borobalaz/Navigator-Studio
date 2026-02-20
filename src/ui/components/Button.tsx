import "./Button.css";

export function Button({ onClick, text }: { onClick: () => void; text: string }) {
  return (
    <button onClick={onClick} className="custom-button">
      {text}
    </button>
  );
}