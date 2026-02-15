// FolderItem.tsx
type FolderItemProps = {
  name: string;
  isDirectory: boolean;
};

export function FolderItem({ name, isDirectory }: FolderItemProps) {
  return (
    <div className="folder-item">
      {isDirectory ? "📁" : "📄"} {name}
    </div>
  );
}
