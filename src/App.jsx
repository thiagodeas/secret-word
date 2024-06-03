// CSS
import StyledApp from './App.style'
import GlobalStyles from './GlobalStyles'

// React
import { useCallback, useEffect, useState } from 'react';

// Data
import { wordsList } from './data/words';

// Components
import StartScreen from './components/StartScreen';
import GameStart from './components/GameStart';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
]

const guessesNumber = 3

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesNumber);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words)
    const randomCategory = categories[Math.floor(Math.random() * (categories).length)];
    const randomWord = words[randomCategory][Math.floor(Math.random() * words[randomCategory].length)];
    return { randomWord, randomCategory };
  }, [words]);

  const startGame = useCallback(() => {
    clearLetterStates();

    const { randomWord, randomCategory } = pickWordAndCategory();

    let wordLetters = randomWord.split("").map((l) => l.toLowerCase())

    setPickedWord(randomWord);
    setPickedCategory(randomCategory);
    setLetters(wordLetters);

    setGameStage(stages[1].name)
  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase()
    if (guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)) {
      return;
    }
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ])
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(()=> {
    if(guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name)
    }
  }, [guesses])

  useEffect(() => {

    const uniqueLetters = [... new Set(letters)]

    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore += 100)

      startGame();
    }
    
  }, [guessedLetters, startGame, letters])

  const retry = () => {
    setScore(0)
    setGuesses(guessesNumber)
    setGameStage(stages[0].name)
  }

  return (
    <>
      <GlobalStyles />
      <StyledApp>
        {gameStage === 'start' && <StartScreen startGame={startGame} />}
        {gameStage === 'game' &&
          <GameStart
            verifyLetter={verifyLetter}
            pickedWord={pickedWord}
            pickedCategory={pickedCategory}
            letters={letters}
            guessedLetters={guessedLetters}
            wrongLetters={wrongLetters}
            guesses={guesses}
            score={score}
          />}
        {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
      </StyledApp>
    </>
  )
}

export default App;
