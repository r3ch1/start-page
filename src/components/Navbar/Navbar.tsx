import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import BaseNavbar from 'react-bootstrap/Navbar';
import Glogin from '../Glogin/Glogin';

const Navbar = () => {
  const [theme, setTheme] = useState('');

  const getTheme = () => {
    const themeStr = localStorage.getItem('theme');
    if (!themeStr) return 'light';
    return themeStr;
  };

  useEffect(() => {
    if (!theme) {
      document.getElementsByTagName('html')[0].setAttribute('data-bs-theme', getTheme());
      setTheme(getTheme());
      return;
    }
    localStorage.setItem('theme', theme);
    document.getElementsByTagName('html')[0].setAttribute('data-bs-theme', theme);
  }, [theme]);

  return (
    <BaseNavbar className="bg-body-tertiary">
      <Container fluid>
        <BaseNavbar.Brand>
          <i className="fa-solid fa-home" />
          &nbsp;Start Page
        </BaseNavbar.Brand>
        <BaseNavbar.Collapse id="navbarScroll">
          <div className="actions ml-auto">
            <button
              className="btn"
              style={{ marginRight: '10px' }}
              onClick={() => setTheme(getTheme() === 'light' ? 'dark' : 'light')}
            >
              <i className={`fa-regular ${theme === 'light' ? 'fa-sun' : 'fa-moon'}`} />
            </button>
            <Glogin />
          </div>
        </BaseNavbar.Collapse>
      </Container>
    </BaseNavbar>
  );
};

export default Navbar;
