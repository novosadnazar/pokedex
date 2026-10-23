import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa"; 
import { GoSearch } from "react-icons/go";
import pokedexLogo from "../../assets/pokedex-logo.webp";
import pokemonHero from "../../assets/pokemon-hero.webp";
import style from "../Header/Header.module.css";

export default function Header() {
  const [theme, setTheme] = useState("day");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "day" ? "night" : "day"));
  };

  return (
    <header
      className={`${style.Header} ${
        theme === "night" ? style.HeaderNight : style.HeaderDay
      }`}
    >
      <div className="container">
        <div className={style.header__top}>
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
              onClick={toggleTheme}
              aria-label="Налаштування теми"
            >
              {theme === "day" ? <FaMoon /> : <FaSun />}
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
              <span className={style.searchBar__icon}>
                <GoSearch />
              </span>
              <input
                type="text"
                placeholder="Пошук покемона за ім'ям..."
                className={style.searchBar__input}
              />
            </div>

            <button
              type="button"
              className={style.searchBar__button}
              aria-label="Пошук"
            >
              <GoSearch />
            </button>

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