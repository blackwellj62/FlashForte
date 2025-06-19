import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Home } from "./Home/Home.jsx";
import { FlashCards } from "./Cards/FlashCards.jsx";
import { NewCard } from "./Cards/NewCard.jsx";
import { EditCard } from "./Cards/EditCard.jsx";



export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="flashcards"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <FlashCards loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="new-card"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <NewCard loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="edit-card/:cardId"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <EditCard loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />
        
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
