import React from "react";

const TOYS_URL = "http://localhost:3001/toys";

function ToyCard({ toy, onUpdateToy, onDeleteToy }) {
  const { id, name, image, likes } = toy;

  function handleLikeClick() {
    const updatedLikes = likes + 1;

    fetch(`${TOYS_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        if (onUpdateToy) onUpdateToy(updatedToy);
      })
      .catch((error) => console.error("Error updating likes:", error));
  }

  function handleDeleteClick() {
    fetch(`${TOYS_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        if (onDeleteToy) onDeleteToy(id);
      })
      .catch((error) => console.error("Error deleting toy:", error));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDeleteClick}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
