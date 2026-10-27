
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";


const resources = {
  ua: {
    translation: {
      home: "Головна",
      catalog: "Каталог",
      favorite: "Обране",
      heroTitle: "Досліджуй світ покемонів",
      heroSubtitle:
        "Знайомся з улюбленими покемонами, шукай, фільтруй, зберігай улюблених!",
      searchPlaceholder: "Пошук покемона за ім'ям...",
      modalTitle: "Зареєструватися",
      usernameLabel: "Ім’я користувача",
      emailLabel: "Електронна пошта",
      passwordLabel: "Пароль",
      submitBtn: "Зареєструватись",
      alreadyHaveAccount: "Вже маєте обліковий запис?",
      logInLink: "Увійти",
    },
  },
  en: {
    translation: {
      home: "Home",
      catalog: "Catalog",
      favorite: "Favorite",
      heroTitle: "Explore the world of Pokémon",
      heroSubtitle:
        "Meet your favorite Pokémon, search, filter, and save your favorites!",
      searchPlaceholder: "Search Pokémon by name...",
      modalTitle: "Sign up",
      usernameLabel: "Username",
      emailLabel: "E-Mail",
      passwordLabel: "Password",
      submitBtn: "Sign up",
      alreadyHaveAccount: "Already have an account?",
      logInLink: "Log In",
    },
  },
};

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ua", 
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
