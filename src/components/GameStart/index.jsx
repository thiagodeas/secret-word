import { useState, useRef } from 'react';
import { StyledGameH1, StyledLetterContainerForm, StyledLetterContainerInput, StyledLetterContainerP, StyledLetters, StyledPointsSpan, StyledTipSpan, StyledWordContainer } from './GameStart.style';

const GameStart = ({
    verifyLetter,
    pickedWord,
    pickedCategory,
    letters, guessedLetters,
    wrongLetters,
    guesses,
    score,
}) => {

    const [letter, setLetter] = useState("");
    const letterInputRef = useRef(null) 

    const handleSubmit = (e) => {
        e.preventDefault()

        verifyLetter(letter);
        setLetter("");
        letterInputRef.current.focus()
    }

    return (
        <div>
            <p>
                <StyledPointsSpan>
                    Pontuação: {score}
                </StyledPointsSpan>
            </p>
            <StyledGameH1>Adivinhe a palavra:</StyledGameH1>
            <h3>Dica sobre a palavra:
                <StyledTipSpan> {pickedCategory}</StyledTipSpan>
            </h3>
            <p>Você ainda tem {guesses} tentativa(s)</p>
            <StyledWordContainer>
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <StyledLetters key={i}>{letter}</StyledLetters>
                    ) : (
                        <StyledLetters key={i}></StyledLetters>
                    )
                ))}
            </StyledWordContainer>
            <div>
                <StyledLetterContainerP>Tente adivinhar uma letra da palavra:</StyledLetterContainerP>
                <StyledLetterContainerForm onSubmit={handleSubmit}>
                    <StyledLetterContainerInput
                        type="text"
                        name="letter"
                        maxLength="1"
                        required
                        onChange={(e) => setLetter(e.target.value)}
                        value={letter}
                        ref={letterInputRef}
                    />
                    <button>Jogar!</button>
                </StyledLetterContainerForm>
            </div>
            <div>
                <p>Letras já utilizadas:</p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter}, </span>
                ))}
            </div>
        </div>
    )
}

export default GameStart;
