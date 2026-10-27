import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import style from "./ModalLogin.module.css";

const rootModal = document.querySelector("#root-modal");

export default function ModalLogin({ onToggle, setUsername }) {
  const { t } = useTranslation(); // 
  const [userNameInput, setUserNameInput] = useState("");

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onToggle();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onToggle]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onToggle();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userNameInput.trim() !== "") {
      setUsername(userNameInput);
      onToggle();
    }
  };

  return createPortal(
    <div className={style.backdrop} onClick={handleBackdropClick}>
      <div className={style.modal}>
      
        <h2 className={style.modalTitle}>{t("modalTitle")}</h2>

        <form onSubmit={handleSubmit}>
         
          <label className={style.modalLabel}>
            {t("usernameLabel")}
            <input
              type="text"
              placeholder={t("usernameLabel")}
              className={style.modalInput}
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
              required
            />
          </label>

          <label className={style.modalLabel}>
            {t("emailLabel")}
            <input
              type="email"
              placeholder={t("emailLabel")}
              className={style.modalInput}
              required
            />
          </label>

          <label className={style.modalLabel}>
            {t("passwordLabel")}
            <input
              type="password"
              placeholder={t("passwordLabel")}
              className={style.modalInput}
              required
            />
          </label>

        
          <button type="submit" className={style.modalBtn}>
            {t("submitBtn")}
          </button>
        </form>

        <p className={style.modalText}>
          {t("alreadyHaveAccount")} <a href="#">{t("logInLink")}</a>
        </p>
      </div>
    </div>,
    rootModal
  );
}
