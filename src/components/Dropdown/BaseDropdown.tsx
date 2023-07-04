import { PropsWithChildren, useRef, useState } from 'react';
import clsx from 'clsx';
import useOnClickOutside from 'src/hooks/useOnClickOutside';
import Button from '../Button';

import './BaseDropdown.scss';

const DROPDOWN_ITEM_KEY_PREFIX = `$dropdown`;

interface DropdownProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  selectItem: (item: T) => void;
  classNames?: string;
  placeholder?: string;
  selectedItemLabel?: string;
}

const Dropdown = <T,>({
  items,
  renderItem,
  selectItem,
  classNames,
  placeholder,
  selectedItemLabel,
}: PropsWithChildren<DropdownProps<T>>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showList, setShowList] = useState(false);

  useOnClickOutside(containerRef, (event) => setShowList(false));

  const handleSelectItem = (item: T) => {
    selectItem(item);
    setShowList(false);
  };

  return (
    <div className={clsx('dropdown', classNames)} ref={containerRef}>
      <Button classNames="dropdown__btn" onClick={() => setShowList((prev) => !prev)}>
        {selectedItemLabel ? selectedItemLabel : placeholder}
      </Button>
      {showList && (
        <ul className="dropdown__list">
          {items.map((item, idx) => (
            <li onClick={() => handleSelectItem(item)} key={`${DROPDOWN_ITEM_KEY_PREFIX}-${idx}`}>
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
