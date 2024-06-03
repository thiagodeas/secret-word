import { StyledScore } from "./GameOver.style";

const GameOver = ({ retry, score}) => {
    return (
        <div>
            <h1>Fim do Jogo!</h1>
            <h2>A sua pontuação foi: <StyledScore>{score}</StyledScore></h2>
            <button onClick={retry}>Reiniciar o jogo</button>
        </div>
    )
}

export default GameOver;