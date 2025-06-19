import ForteFullLogo from  "/src/assets/ForteFullLogo.png"
import forteRound from "/src/assets/forteRound.png";
import "./Home.css"

export const Home = () => {
    return(
        <div className="home-container">
            <h1 className="h1">Welcome To</h1>
            <img src={forteRound} alt="Flash Forte Logo" className="home-logo"/>
            <h1 className="h1">Flash Forte</h1>
        </div>
    )
}