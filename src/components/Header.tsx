"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo-remove-bg.png";
import AnchorLink from "react-anchor-link-smooth-scroll";

function Header() {
  const [selectedLink, setSelectedLink] = useState("home");

  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
  };

  return (
    <header className='flex justify-between p-6 items-center text-[#FFFFFF] mx-auto bg-sub-bg h-16 flex-shrink-0 max-w-[1640px] rounded-[16px] top-9 relative'>
      <div className='logo-header'>
        <Link href='/'>
          <Image src={Logo} alt='Logo' width={40} height={40} />
        </Link>
      </div>
      <div className='flex gap-5 text-lg font-medium'>
        <AnchorLink
          href='#home'
          offset='100'
          className={`item-menu-header ${
            selectedLink === "home" ? "selected" : ""
          }`}
          onClick={() => handleLinkClick("home")}
        >
          Home
        </AnchorLink>
        <AnchorLink
          href='#about-me'
          offset='100'
          className={`item-menu-header ${
            selectedLink === "about" ? "selected" : ""
          }`}
          onClick={() => handleLinkClick("about")}
        >
          About me
        </AnchorLink>
        <AnchorLink
          href='#skills'
          offset='100'
          className={`item-menu-header ${
            selectedLink === "skills" ? "selected" : ""
          }`}
          onClick={() => handleLinkClick("skills")}
        >
          Skills
        </AnchorLink>
        <AnchorLink
          href='#projects'
          offset='100'
          className={`item-menu-header ${
            selectedLink === "projects" ? "selected" : ""
          }`}
          onClick={() => handleLinkClick("projects")}
        >
          Projects
        </AnchorLink>
        <AnchorLink
          href='#contact'
          offset='100'
          className={`item-menu-header ${
            selectedLink === "contact" ? "selected" : ""
          }`}
          onClick={() => handleLinkClick("contact")}
        >
          Contact
        </AnchorLink>
      </div>
    </header>
  );
}

export default Header;
