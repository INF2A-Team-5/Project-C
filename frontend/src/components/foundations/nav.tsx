import React from 'react';
import Button from "./button";

export function Navbar() {
  return (
    <header>
      <nav>
        <NavItem name='Home' href='/' />
        <NavItem name='Tickets' href='/tickets' />
        <NavItem name='Contact' href='/contact' />
      </nav>
      <Button>Save Ticket</Button>
    </header>
  );
}

type NavItemProps = {
  name: string;
  href: string;
};

export function NavItem({ name, href }: NavItemProps) {
  return <a href={href}>{name}</a>;
}

export default Navbar;