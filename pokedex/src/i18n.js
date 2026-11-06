
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
      type: "Типи",
      conect: "Зв'язатися",
      navigate: "Навігація",
      favoritePoke: "Обрані покемони",
      seeBtn: "Дізнатися більше",
      backBtn: "Назад до Каталогу",
      loadBtn: "Завантажити ще",
      load: "Завантаження...",
      notPoke: "Покемона не знайдено",
      addFav: "Додати в обране",
      height: "Зріст",
      weight: "Вага",
      baseX: "Базові характеристики",
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
      type: "Type",
      contact: "Contact",
      navigate: "Navigation",
      favoritePoke: "Favorite Pokemons",
      seeBtn: "see more",
      backBtn: "Back to Catalog",
      loadBtn: "Load More",
      load: "Download...",
      notPoke: "Pokémon not found",
      addFav: "Add to favorites",
      height: "Height",
      weight: "weight",
      baseX: "Basic characteristics",
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
