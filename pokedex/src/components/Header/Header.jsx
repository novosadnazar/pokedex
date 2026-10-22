import { NavLink } from "react-router-dom";
import { FaMoon } from "react-icons/fa";
import style from "../Header/Header.module.css";

export default function Header() {
  return (
    <header className={style.Header}>
      <div className={style.header__container}>
        <NavLink to="/" className={style.header__link}>
          <img src="/logo.svg" alt="logo" className={style.header__logo} />
          <img
            src="/pokedex-logo.svg"
            alt="logo"
            className={style.header__logo__text}
          />
        </NavLink>
        <nav className={style.header__nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${style.navLink} ${style.active}` : style.navLink
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/Catalog"
            className={({ isActive }) =>
              isActive ? `${style.navLink} ${style.active}` : style.navLink
            }
          >
            Catalog
          </NavLink>

          <NavLink
            to="/Favorite"
            className={({ isActive }) =>
              isActive ? `${style.navLink} ${style.active}` : style.navLink
            }
          >
            Favorite
          </NavLink>
        </nav>
        <div className={style.header__actions}>
          <button
            className={style.header__icon}
            type="button"
            aria-label="Налаштування теми"
          >
            <FaMoon />{" "}
          </button>
        </div>
      </div>
    </header>
  );
}
