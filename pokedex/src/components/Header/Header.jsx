import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaMoon,
  FaSun,
  FaUser,
  FaHome,
  FaThList,
  FaHeart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { HiLanguage } from "react-icons/hi2";
import { GoSearch } from "react-icons/go";
import { useTranslation } from "react-i18next";
import pokedexLogo from "../../assets/pokedex-logo.webp";
import pokemonHero from "../../assets/pokemon-hero.webp";
import logoSvg from "../../assets/icons.svg";
import pokemonHeroNight from "../../assets/pokemon-hero-night.png";

import style from "../Header/Header.module.css";

export default function Header({
  searchQuery,
  setSearchQuery,
  theme,
  toggleTheme,
}) {
  const { t, i18n } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [currentLang, setCurrentLang] = useState(
    i18n.language ? i18n.language.toUpperCase() : "UA"
  );

  const langDropdownRef = useRef(null);

  const languages = [
    { code: "UA", label: "Українська", flag: "🇺🇦", langKey: "ua" },
    { code: "EN", label: "English", flag: "🇬🇧", langKey: "en" },
  ];

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    setIsMobileMenuOpen(false); 
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langDropdownRef]);

  const handleSelectLang = (langCode, langKey) => {
    setCurrentLang(langCode);
    setIsLangOpen(false);
    i18n.changeLanguage(langKey);
  };

  return (
    <>
      <header
        className={`${style.Header} ${
          theme === "night" ? style.HeaderNight : style.HeaderDay
        }`}
      >
        <div className="container">
          <div className={style.header__top}>
            <NavLink to="/" className={style.header__link}>
              <img src={logoSvg} alt="logo" className={style.header__logo} />
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
                {t("home")}
              </NavLink>
              <NavLink
                to="/catalog"
                className={({ isActive }) =>
                  isActive ? `${style.navLink} ${style.active}` : style.navLink
                }
              >
                {t("catalog")}
              </NavLink>
              <NavLink
                to="/favorite"
                className={({ isActive }) =>
                  isActive ? `${style.navLink} ${style.active}` : style.navLink
                }
              >
                {t("favorite")}
              </NavLink>
            </nav>

            <div
              className={style.header__actions}
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <div
                className={`${style.langDropdown} ${style.desktopLang}`}
                ref={langDropdownRef}
              >
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className={style.langButton}
                  aria-expanded={isLangOpen}
                >
                  <HiLanguage className={style.langIcon} />
                  <span className={style.langCode}>{currentLang}</span>
                  <svg
                    className={`${style.langArrow} ${
                      isLangOpen ? style.langArrowOpen : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isLangOpen && (
                  <div className={style.langMenu}>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() =>
                          handleSelectLang(lang.code, lang.langKey)
                        }
                        className={`${style.langOption} ${
                          currentLang === lang.code
                            ? style.langOptionActive
                            : ""
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              
              <button
                className={`${style.header__icon} ${style.desktopThemeBtn}`}
                type="button"
                onClick={toggleTheme}
              >
                {theme === "day" ? <FaMoon /> : <FaSun />}
              </button>

            
              <button
                className={`${
                  username ? style.header__icon : style.authButtonText
                } ${style.desktopAuthBtn}`}
                type="button"
                onClick={toggleModal}
                title={username ? username : t("submitBtn")}
              >
                {username ? <FaUser /> : t("submitBtn")}
              </button>

             
              <button
                className={style.burgerButton}
                type="button"
                onClick={toggleMobileMenu}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

         
          {isMobileMenuOpen && (
            <div className={style.mobileMenu}>
              <div className={style.mobileMenuContent}>
                <button
                  className={
                    username ? style.mobileAuthIcon : style.mobileAuthBtnText
                  }
                  type="button"
                  onClick={toggleModal}
                >
                  {username ? (
                    <>
                      <FaUser /> <span>{username}</span>
                    </>
                  ) : (
                    t("submitBtn")
                  )}
                </button>

                <div className={style.mobileMenuDivider} />

                <div className={style.mobileMenuRow}>
                  <span>Мова:</span>
                  <div className={style.mobileLangSwitch}>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() =>
                          handleSelectLang(lang.code, lang.langKey)
                        }
                        className={`${style.mobileLangBtn} ${
                          currentLang === lang.code
                            ? style.mobileLangBtnActive
                            : ""
                        }`}
                      >
                        {lang.flag} {lang.code}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={style.mobileMenuRow}>
                  <span>Тема:</span>
                  <button
                    className={style.mobileThemeToggle}
                    type="button"
                    onClick={toggleTheme}
                  >
                    {theme === "day" ? (
                      <>
                        <FaMoon /> Нічна
                      </>
                    ) : (
                      <>
                        <FaSun /> Денна
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className={style.Hero}>
            <div className={style.hero__content}>
              <div className={style.hero__text}>
                <h1 className={style.hero__title}>{t("heroTitle")}</h1>
                <p className={style.hero__subtitle}>{t("heroSubtitle")}</p>
              </div>
            </div>

            <div className={style.searchBar}>
              <div className={style.searchBar__inputGroup}>
                <span className={style.searchBar__icon}>
                  <GoSearch />
                </span>
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  className={style.searchBar__input}
                  value={searchQuery || ""}
                  onChange={(e) =>
                    setSearchQuery && setSearchQuery(e.target.value)
                  }
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
                src={theme === "day" ? pokemonHero : pokemonHeroNight}
                alt="Pikachu"
                className={style.hero__pikachu}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Нижня мобільна панель навігації (як на макеті) */}
      <nav className={style.mobileBottomNav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? `${style.bottomNavItem} ${style.bottomNavActive}`
              : style.bottomNavItem
          }
        >
          <FaHome className={style.bottomNavIcon} />
          <span>{t("home")}</span>
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive
              ? `${style.bottomNavItem} ${style.bottomNavActive}`
              : style.bottomNavItem
          }
        >
          <FaThList className={style.bottomNavIcon} />
          <span>{t("catalog")}</span>
        </NavLink>
        <NavLink
          to="/favorite"
          className={({ isActive }) =>
            isActive
              ? `${style.bottomNavItem} ${style.bottomNavActive}`
              : style.bottomNavItem
          }
        >
          <FaHeart className={style.bottomNavIcon} />
          <span>{t("favorite")}</span>
        </NavLink>
      </nav>

      {isModalOpen && (
        <ModalLogin onToggle={toggleModal} setUsername={setUsername} />
      )}
    </>
  );
}