


import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaGithub,
  FaTelegram,
  FaDiscord,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import pokedexLogo from "../../assets/pokedex-logo.webp";
import logoSvg from "../../assets/icons.svg";
import style from "./Footer.module.css";

export default function Footer({ theme }) {
  const { t } = useTranslation();

  return (
    <footer
      className={`${style.footer} ${
        theme === "night" ? style.footerNight : style.footerDay
      }`}
    >
      <div className="container">
        <div className={style.footer__content}>
          <div className={style.footer__brand}>
            <NavLink to="/" className={style.footer__logoLink}>
              <img
                src={logoSvg}
                alt="logo"
                className={style.footer__logoIcon}
              />
              <img
                src={pokedexLogo}
                alt="Pokédex"
                className={style.footer__logoText}
              />
            </NavLink>

            <h3 className={style.footer__subtitle}>{t("heroTitle")}</h3>
            <p className={style.footer__description}>{t("heroSubtitle")}</p>

            <div className={style.footer__socials}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
              >
                <FaTelegram />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Discord"
              >
                <FaDiscord />
              </a>
            </div>
          </div>

          <div className={style.footer__section}>
                      <h4 className={style.footer__title}>{t("navigate") }</h4>
            <ul className={style.footer__list}>
              <li>
                <NavLink to="/" className={style.footer__link}>
                  {t("home")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/catalog" className={style.footer__link}>
                  {t("catalog")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/favorite" className={style.footer__link}>
                  {t("favorite")}
                </NavLink>
              </li>
            </ul>
          </div>

          <div className={style.footer__section}>
                      <h4 className={style.footer__title}>{t("type") }</h4>
            <ul className={style.footer__list}>
              <li>
                <NavLink
                  to="/catalog?type=Normal"
                  className={style.footer__link}
                >
                  Normal
                </NavLink>
              </li>
              <li>
                <NavLink to="/catalog?type=Fire" className={style.footer__link}>
                  Fire
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/catalog?type=Water"
                  className={style.footer__link}
                >
                  Water
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/catalog?type=Electric"
                  className={style.footer__link}
                >
                  Electric
                </NavLink>
              </li>
            </ul>
          </div>

          <div className={style.footer__section}>
                      <h4 className={style.footer__title}>{t("contact") }</h4>
            <ul className={style.footer__contacts}>
              <li>
                <FaEnvelope className={style.contactIcon} />
                <a
                  href="mailto:email@pokedex.dev"
                  className={style.contactLink}
                >
                  email@pokedex.dev
                </a>
              </li>
              <li>
                <FaPhone className={style.contactIcon} />
                <a href="tel:+380989999901" className={style.contactLink}>
                  +38 098 999 99 01
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={style.footer__bottom}>
          <p>
            © Pokédex — Ваш особистий каталог покемонів. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}