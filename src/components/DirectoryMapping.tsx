import React, { JSX } from 'react';

interface DirectoryItem {
  name: string;
  isFolder: boolean;
  isActive?: boolean;
  children?: DirectoryItem [];
}

interface DirectoryMappingProps {
  directory: DirectoryItem [];
}

const DirectoryMapping: React.FC<DirectoryMappingProps> = ({ directory }) => {
  const renderDirectory = (directory: DirectoryItem): JSX.Element => {
    if (directory.isFolder) {
      return (
        <details key={directory.name}>
          <summary>{directory.name}</summary>
          <div style={{ marginLeft: '20px' }}>
            {directory.children?.map((child: any) => renderDirectory(child))}
          </div>
        </details>
      );
    }

    return <p key={directory.name}>{directory.name}</p>;
  };

  return (
    <>
      <p>
        {' '}
        -------------------------------- Render Drectory List
        -------------------------------------
      </p>
      <div className="directory">{directory.map(data=>renderDirectory(data))}</div>
    </>
  );
};

export default DirectoryMapping;
