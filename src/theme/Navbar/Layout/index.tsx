import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useHideableNavbar, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar';
import type { Props } from '@theme/Navbar/Layout';
import { UserButton } from '../../../components/UserButton';

export default function NavbarLayout({ children }: Props): JSX.Element {
  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);

  return (
    <nav
      ref={navbarRef}
      aria-label={translate({
        id: 'theme.NavBar.navAriaLabel',
        message: 'Main',
        description: 'The ARIA label for the main navigation',
      })}
      className={`navbar navbar--${style} ${isNavbarVisible ? 'navbar--visible' : 'navbar--hidden'}`}>
      <div className="navbar__inner">
        <div className="navbar__items">
          {children}
        </div>
        <div className="navbar__items navbar__items--right">
          <UserButton />
        </div>
      </div>
      <div role="presentation" className="navbar-sidebar__backdrop" onClick={mobileSidebar.toggle} />
      <NavbarMobileSidebar />
    </nav>
  );
}