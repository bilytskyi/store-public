import { useContext, useState } from 'react';
import styles from '../styles/DropdownMenu.module.css';
import { HashLink } from 'react-router-hash-link';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const DropdownTypes = observer(({ handleClose }) => {
  const { device } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div
      className={styles.dropdown}
      onMouseLeave={closeDropdown}
      onClick={toggleDropdown}
    >
      <button className={styles.dropdownButton}>
        <span className={!device.selectedType.id ? styles.menu : styles.menu2}>
          Types
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdownContent} onMouseLeave={closeDropdown}>
          {device.types.map(type => (
            <HashLink
              onClick={() => {
                device.setSelectedType(type);
                if (handleClose) {
                  handleClose();
                }
              }}
              key={type.id}
              className={
                type.id === device.selectedType.id
                  ? `${styles.dropdownItem} ${styles.active}`
                  : styles.dropdownItem
              }
              smooth
              to="/#device-list"
            >
              {type.name}
            </HashLink>
          ))}
          <HashLink
            onClick={() => {
              device.setSelectedType({});
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

export default DropdownTypes;
