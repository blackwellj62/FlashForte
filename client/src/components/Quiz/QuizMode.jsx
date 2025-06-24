import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDeckById } from "../../managers/deckManager.js";
import { getDeckFlashCards } from "../../managers/deckFlashCardManager.js";
import { getFlashCards } from "../../managers/cardManager.js";


export const QuizMode = ({ loggedInUser }) => {
  const [deck, setDeck] = useState({});
  const [currentDeckFlashCard, setCurrentDeckFlashCard] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [cardsInDeck, setCardsInDeck] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const currentCard = cardsInDeck[currentCardIndex];
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const { deckId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDeckById(deckId).then((data) => {
      const deckObj = data;
      setDeck(deckObj);
    });
  }, [deckId]);

  useEffect(() => {
    getDeckFlashCards().then((deckFCArray) => {
      const foundDeckFC = deckFCArray.filter((dfc) => dfc.deckId === deck.id);
      setCurrentDeckFlashCard(foundDeckFC);

      getFlashCards().then((cardArray) => {
        const deckCardIds = foundDeckFC.map((dfc) => dfc.flashCardId);
        const matchingCards = cardArray.filter(
          (card) =>
            deckCardIds.includes(card.id) && card.userId === loggedInUser.id
        );
        setCardsInDeck(matchingCards);
      });
    });
  }, [deck, loggedInUser]);

  useEffect(() => {
    getFlashCards().then((cardArray) => {
      const foundCards = cardArray.filter(
        (card) => card.userId === loggedInUser.id
      );
      setUserCards(foundCards);
    });
  }, [loggedInUser]);

  const handleFlip = (cardId) => {
    setFlippedCards((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));
  };

  return (
    <div className="details-container">
      <div className="card text-center">
        <div className="card-header">{deck.name}</div>
        <div className="card-body">
          <div className="flashcard-container">
            {currentCard ? (
              <div key={currentCard.id} className="flip-card">
                <div
                  className={`flip-card-inner ${
                    flippedCards[currentCard.id] ? "flipped" : ""
                  }`}
                >
                  <div className="flip-card-front">
                    <div className="card-body">
                      <h3> {currentCard.question}</h3>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="card-body">
                      <h3>{currentCard.answer}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ) : (<div>
                    {!currentCard && (
        <div className="quiz-complete">
            <h1>Quiz Complete!🎉</h1>
            <h3>Results</h3>
            <h5>Correct: {correctCount}</h5>
            <h5>Incorrect: {incorrectCount}</h5>
        <div className="new-btn">
            <button
            className="btn-log"
            onClick={() => {navigate("/decks")}}
            >
            Exit
            </button>
        </div>
        </div>
        )}
            </div>)}
          </div>
        </div>
        {currentCard && (
        <div className="card-footer">
          <div className="new-btn">
            <button
              className="btn-flip"
              onClick={() => {
                handleFlip(currentCard.id);
              }}
            >
              Show Answer
            </button>
          </div>
          <div className="new-btn">
        <button className="btn-log" onClick={() => {
          setCorrectCount(prev => prev + 1);
          setFlippedCards({});
          setCurrentCardIndex(prev => prev + 1);
        }}>✔️</button>
      
        <button className="btn-log" onClick={() => {
          setIncorrectCount(prev => prev + 1);
          setFlippedCards({});
          setCurrentCardIndex(prev => prev + 1);
        }}>✖️</button>
      </div>
        </div>)}
      </div> 
    </div>
  );
};
