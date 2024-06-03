import StyledStartScreen from "./StartScreen.style";

const StartScreen = ({startGame}) => {
    return (
        <StyledStartScreen>
            <h1>Secret Word</h1>
            <p>Clique no botão abaixo para começar a jogar</p>
            <button onClick={startGame}>Começar o jogo</button>
        </StyledStartScreen>
    )
}

export default StartScreen;
