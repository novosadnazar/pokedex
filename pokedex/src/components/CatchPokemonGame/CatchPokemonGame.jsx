import React, { useState, useEffect, useRef } from "react";
import { FiPlay, FiRotateCcw, FiAward, FiClock, FiStar } from "react-icons/fi";
import styles from "./CatchPokemonGame.module.css";


const DIGLETT_IMG =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/50.png";
const DUGTRIO_IMG =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/51.png";

export const CatchPokemonGame = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeHoles, setActiveHoles] = useState(Array(9).fill(null));

  const timerRef = useRef(null);
  const moleTimerRef = useRef(null);

 
  useEffect(() => {
    const savedHighScore = localStorage.getItem("pokemon_mole_highscore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

 
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, timeLeft]);

  
  useEffect(() => {
    if (!isPlaying) return;

    let intervalTime = 1000;
    if (timeLeft <= 20 && timeLeft > 10) {
      intervalTime = 750;
    } else if (timeLeft <= 10) {
      intervalTime = 500;
    }

    moleTimerRef.current = setInterval(() => {
      spawnPokemon();
    }, intervalTime);

    return () => clearInterval(moleTimerRef.current);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    setActiveHoles(Array(9).fill(null));
  };

  const endGame = () => {
    setIsPlaying(false);
    clearInterval(timerRef.current);
    clearInterval(moleTimerRef.current);
    setActiveHoles(Array(9).fill(null));

    setHighScore((prevHigh) => {
      if (score > prevHigh) {
        localStorage.setItem("pokemon_mole_highscore", score.toString());
        return score;
      }
      return prevHigh;
    });
  };

  const spawnPokemon = () => {
    setActiveHoles(() => {
      const newHoles = Array(9).fill(null);
      const isLateGame = timeLeft <= 20;

      const countToSpawn = isLateGame && Math.random() > 0.5 ? 2 : 1;
      const chosenIndexes = new Set();

      while (chosenIndexes.size < countToSpawn) {
        const randomIndex = Math.floor(Math.random() * 9);
        chosenIndexes.add(randomIndex);
      }

      chosenIndexes.forEach((idx) => {
        const isDugtrio = Math.random() < 0.2;
        newHoles[idx] = isDugtrio ? "dugtrio" : "diglett";
      });

      return newHoles;
    });
  };

  const handleHoleClick = (index) => {
    if (!isPlaying || !activeHoles[index]) return;

    const pokemonType = activeHoles[index];
    const points = pokemonType === "dugtrio" ? 2 : 1;

    setScore((prev) => prev + points);

    setActiveHoles((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  return (
    <div className={styles.gameContainer}>
      <h2 className={styles.title}>Спіймай Діглета! 🐹⚡</h2>


      <div className={styles.statsBar}>
        <div className={styles.statBox}>
          <FiStar className={styles.iconScore} />
          <span>
            Рахунок: <strong>{score}</strong>
          </span>
        </div>
        <div className={styles.statBox}>
          <FiClock className={styles.iconTime} />
          <span>
            Час: <strong>{timeLeft}с</strong>
          </span>
        </div>
        <div className={styles.statBox}>
          <FiAward className={styles.iconTrophy} /> 
          <span>
            Рекорд: <strong>{highScore}</strong>
          </span>
        </div>
      </div>

      
      <div className={styles.grid}>
        {activeHoles.map((pokeType, index) => (
          <div
            key={index}
            className={styles.hole}
            onClick={() => handleHoleClick(index)}
          >
            <div className={styles.dirt} />
            {pokeType && (
              <img
                src={pokeType === "dugtrio" ? DUGTRIO_IMG : DIGLETT_IMG}
                alt="Pokemon"
                className={`${styles.pokemon} ${
                  pokeType === "dugtrio" ? styles.dugtrio : styles.diglett
                }`}
              />
            )}
          </div>
        ))}
      </div>

 
      <div className={styles.controls}>
        {!isPlaying ? (
          <button className={styles.startBtn} onClick={startGame}>
            <FiPlay /> {timeLeft === 0 ? "Зіграти знову" : "Почати гру"}
          </button>
        ) : (
          <button className={styles.resetBtn} onClick={endGame}>
            <FiRotateCcw /> Завершити
          </button>
        )}
      </div>
    </div>
  );
};

export default CatchPokemonGame;
