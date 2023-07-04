import { PropsWithChildren } from 'react';
import BaseDropdown from './BaseDropdown';
import './TokenDropdown.scss';

export interface TokenDropdownOption {
  icon: React.ReactNode;
  label: string;
}

interface TokenDropdownProps {
  items: TokenDropdownOption[];
  selectItem: (item: TokenDropdownOption) => void;
  selectedItem?: TokenDropdownOption;
}

const TokenDropdown = ({
  items,
  selectItem,
  selectedItem,
}: PropsWithChildren<TokenDropdownProps>) => {
  return (
    <BaseDropdown
      classNames="token-dropdown"
      items={items}
      placeholder="항목을 선택하세요."
      selectedItemLabel={selectedItem?.label}
      renderItem={(item) => (
        <div className="token-dropdown__item">
          <div className="token-dropdown__icon">{item.icon}</div>
          <div className="token-dropdown__label">{item.label}</div>
        </div>
      )}
      selectItem={selectItem}
    />
  );
};

export default TokenDropdown;
