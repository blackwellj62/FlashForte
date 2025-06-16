import ForteFullLogo from  "/src/assets/ForteFullLogo.png"
import "./Home.css"

export const Home = () => {
    return(
        <div className="home-container">
            <h1 className="h1">Welcome To</h1>
            <img src={ForteFullLogo} alt="Flash Forte Logo" className="home-logo"/>
        </div>
    )
}