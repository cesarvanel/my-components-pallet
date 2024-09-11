import { useState } from "react";

import styles from "./nav-bar.module.scss";
import { classNameModule } from "../../utils/class-name-module/classNameModule";
import { Link } from "react-router-dom";

const className = classNameModule(styles);

interface NavItem {
  title: string;
  path:string,
  submenu?: NavItem[];
}

const navItems: NavItem[] = [
  { title: "Accueil", path:"/" },

  { title: "Form", path:"/form" },
  {
    title: "Services", path:"/service",
    submenu: [
      { title: "Web Development", path:"/dev"  },
      { title: "Design", path:"/des" },
      {
        title: "SEO",
        path: "seo",
      },
    ],
  },
  { title: "Contact", path:"/contact" },
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
            <Link to={item.path}>{item.title}</Link>
            {item.submenu && openMenu === item.title && (
              <ul
                {...className("dropdown-menu", {
                  open: openMenu === item.title,
                })}
              >
                {item.submenu.map((subItem) => (
                  <Link to={subItem.path}>
                    <li key={subItem.title}>
                      <a href="#">{subItem.title}</a>
                    </li>
                  </Link>
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
