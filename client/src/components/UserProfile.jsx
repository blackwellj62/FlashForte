export const UserProfile = ({loggedInUser}) => {
    return(
      <div className="details-container">
        <div className="deck-constainer">
            <div className="card">
                <div className="card-body">
                     <div className="card-title"><h1>{loggedInUser.userName}</h1></div>
                    <h3 className="card-text">
                        Name: {loggedInUser.firstName} {loggedInUser.lastName}
                    </h3>
                    <h4 className="card-text">Email: {loggedInUser.email}</h4>
                    <div className="card-buttons">
                </div>
                </div>
            </div>
        </div>
      </div>
    )
}