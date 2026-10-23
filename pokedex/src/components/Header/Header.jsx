import { NavLink } from "react-router-dom";
import { FaMoon } from "react-icons/fa";
import pokedexLogo from "../../assets/pokedex-logo.webp";
import pokemonHero from "../../assets/pokemon-hero.webp";
import style from "../Header/Header.module.css";

export default function Header() {
  return (
    <header className={style.Header}>
      <div className={style.container}>
        <NavLink to="/" className={style.header__link}>
          <img src="./icons.svg" alt="logo" className={style.header__logo} />
          <img
            src={pokedexLogo}
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
            <FaMoon />
          </button>
        </div>
      </div>

      <div className={style.Hero}>
        <div className={style.hero__content}>
          <div className={style.hero__text}>
            <h1 className={style.hero__title}>Досліджуй світ покемонів</h1>
            <p className={style.hero__subtitle}>
              Знайомся з улюбленими покемонами, шукай, фільтруй, зберігай
              улюблених!
            </p>
          </div>
        </div>

        <div className={style.searchBar}>
          <div className={style.searchBar__inputGroup}>
            <span className={style.searchBar__icon}>🔍</span>
            <input
              type="text"
              placeholder="Пошук покемона за ім'ям..."
              className={style.searchBar__input}
            />
          </div>

          <div className={style.searchBar__filterGroup}>
            <span className={style.searchBar__filterIcon}>⚙️</span>
            <select className={style.searchBar__select} defaultValue="all">
              <option value="all">Усі типи</option>
            </select>
            <span className={style.searchBar__arrow}>▼</span>
          </div>

          <button
            type="button"
            className={style.searchBar__button}
            aria-label="Пошук"
          >
            🔍
          </button>

          {/* Пікачу тепер інтегрований у рядок пошуку на десктопі */}
          <div className={style.hero__character}>
            <img
              src={pokemonHero}
              alt="Pikachu"
              className={style.hero__pikachu}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
