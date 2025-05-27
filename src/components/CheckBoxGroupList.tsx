import React, { useState, useCallback, JSX, useEffect } from 'react';

interface DirectoryItem {
  name: string;
  isFolder: boolean;
  isActive: boolean;
  children?: DirectoryItem[];
}

interface DirectoryMappingProps {
  directory: DirectoryItem[];
}

const CheckBoxGroupList: React.FC<DirectoryMappingProps[]> = ({
  directory,
}) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = useCallback(
    (item: DirectoryItem, isActive: boolean) => {
      const newCheckedItems = { ...checkedItems };

      // Function to check/uncheck all descendants
      const updateDescendants = (node, check) => {
        newCheckedItems[node.name] = check;
        if (node.children) {
          node.children.forEach((child) => updateDescendants(child, check));
        }
      };

      // Function to update ancestor's state based on children
      const updateAncestor = (nodes, itemName) => {
        if (!nodes) return;
        nodes.forEach((node) => {
          if (
            node.children &&
            node.children.some((child) => child.name === itemName)
          ) {
            const allChildrenChecked = node.children.every(
              (child) => newCheckedItems[child.name]
            );
            const someChildrenChecked = node.children.some(
              (child) => newCheckedItems[child.name]
            );

            if (allChildrenChecked) {
              newCheckedItems[node.name] = true;
            } else if (someChildrenChecked) {
              delete newCheckedItems[node.name]; // Or handle indeterminate state visually
            } else {
              delete newCheckedItems[node.name];
            }
            // Continue updating ancestors
            const parentNode = findParent(directory, node.name);
            if (parentNode) {
              updateAncestor([parentNode], node.name);
            }
          } else if (node.children) {
            updateAncestor(node.children, itemName);
          }
        });
      };

      // Helper function to find the parent of a node in the array structure
      const findParent = (items, itemName) => {
        for (const item of items) {
          if (item.children) {
            if (item.children.some((child) => child.name === itemName)) {
              return item;
            }
            const found = findParent(item.children, itemName);
            if (found) {
              return found;
            }
          }
        }
        return null;
      };

      newCheckedItems[item.name] = isActive;

      // If the current item is a folder and checked, check all its children
      if (item.isFolder && isActive) {
        updateDescendants(item, true);
      } else if (item.isFolder && !isActive) {
        updateDescendants(item, false);
      }

      // Update the state of parent folders based on their children
      const parent = findParent(directory, item.name);
      if (parent) {
        updateAncestor([parent], item.name);
      } else {
        // Check if all top-level items are checked (if the changed item was top-level)
        const topLevelParent = directory.find((topLevel) =>
          topLevel.children?.some((child) => child.name === item.name)
        );
        if (!parent && topLevelParent) {
          const allSiblingsChecked = topLevelParent.children?.every(
            (sibling) => newCheckedItems[sibling.name]
          );
          if (allSiblingsChecked) {
            newCheckedItems[topLevelParent.name] = true;
          } else {
            delete newCheckedItems[topLevelParent.name];
          }
        } else if (
          !parent &&
          directory.some((topLevel) => topLevel.name === item.name)
        ) {
          // Handle top-level item's parent update (which is none in this structure)
          // We might need to check if all other top-level siblings are checked if you want a "grand-parent" checkbox.
          // For now, we'll just manage the state of the top-level item itself.
        }
      }

      setCheckedItems(newCheckedItems);
    },
    [checkedItems, directory]
  );

  useEffect(() => {
    setCheckedItems(directory);
  }, [directory]);

  const renderDirectory = (directory: DirectoryItem, checkedItems: any): JSX.Element => {
    const  isActive  = checkedItems?.[directory.name] || false
    if (directory.isFolder) {
      return (
        <li key={directory.name}>
          <input
            id={directory.name}
            type="checkbox"
            checked={isActive}
            onChange={(e) => handleCheckboxChange(directory, e.target.checked)}
          />
          <span>{directory.name}</span>
          <ul>
            {directory.children?.map((child: any) => renderDirectory(child, checkedItems))}
          </ul>
        </li>
      );
    }

    
    return (
      <li key={directory.name}>
        <input
          id={directory.name}
          type="checkbox"
          checked={isActive}
          onChange={(e) => handleCheckboxChange(directory, e.target.checked)}
        />
        <span>{directory.name}</span>
      </li>
    );
  };

  return (
    <>
      <p>
        {' '}
        --------------------------- CheckBoxGroupList --------------------------
      </p>
      <ul>{directory.map((data: DirectoryItem) => renderDirectory(data, checkedItems))}</ul>
    </>
  );
};

export default CheckBoxGroupList;
