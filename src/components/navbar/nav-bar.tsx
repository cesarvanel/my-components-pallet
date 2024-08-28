import { useState } from "react";

import styles from "./nav-bar.module.scss";
import { classNameModule } from "../../utils/class-name-module/classNameModule";

const className = classNameModule(styles);

interface NavItem {
  title: string;
  submenu?: NavItem[];
}

const navItems: NavItem[] = [
  { title: "Accueil" },
  {
    title: "Services",
    submenu: [
      { title: "Web Development" },
      { title: "Design" },
      { title: "SEO" },
    ],
  },
  { title: "Contact" },
];

const NavBar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleMouseEnter = (title: string) => {
    setOpenMenu(title);
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
  };

  return (
    <nav>
      <ul className={styles["Navbar"]}>
        {navItems.map((item) => (
          <li
            key={item.title}
            className={styles["nav-item"]}
            onMouseEnter={() => handleMouseEnter(item.title)}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#">{item.title}</a>
            {item.submenu && openMenu === item.title && (
              <ul
                {...className("dropdown-menu", {
                  open: openMenu === item.title,
                })}
              >
                {item.submenu.map((subItem) => (
                  <li key={subItem.title}>
                    <a href="#">{subItem.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
