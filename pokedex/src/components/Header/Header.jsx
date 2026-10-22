import { NavLink } from "react-router-dom"
import style from "../Header/Header.module.css"

export default Header = () => {
    

    return (
      <header className={style.Header}>
        <div className={style.header__container}>
          <NavLink to="/" className={style.header__nav}>
            <img src="/logo.svg" alt="logo" className={style.header__logo} />
            <img
              src="/pokedex-logo.svg"
              alt="logo"
              className={style.header__logo__text}
            />
                </NavLink>
                
                
        </div>
      </header>
    );
}