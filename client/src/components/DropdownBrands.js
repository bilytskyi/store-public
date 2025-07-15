import { useContext, useState } from 'react';
import styles from '../styles/DropdownMenu.module.css';
import { HashLink } from 'react-router-hash-link';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const DropdownBrands = observer(({ handleClose }) => {
  const { device } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div
      className={styles.dropdown}
      onClick={toggleDropdown}
      onMouseLeave={closeDropdown}
    >
      <button className={styles.dropdownButton}>
        <span className={!device.selectedBrand.id ? styles.menu : styles.menu2}>
          Brands
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdownContent} onMouseLeave={closeDropdown}>
          {device.brands.map(brand => (
            <HashLink
              onClick={() => {
                device.setSelectedBrand(brand);
                if (handleClose) {
                  handleClose();
                }
              }}
              key={brand.id}
              className={
                brand.id === device.selectedBrand.id
                  ? `${styles.dropdownItem} ${styles.active}`
                  : styles.dropdownItem
              }
              smooth
              to="/#device-list"
            >
              {brand.name}
            </HashLink>
          ))}
          <HashLink
            onClick={() => {
              device.setSelectedBrand({});
              if (handleClose) {
                handleClose();
              }
            }}
            className={styles.dropdownItem}
            smooth
            to="/#device-list"
          >
            All
          </HashLink>
        </div>
      )}
    </div>
  );
});

export default DropdownBrands;
