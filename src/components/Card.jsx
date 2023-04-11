
export function Card({ card, onCardClick }) {

  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleClick}
      />
      <h2 className="element__title">{card.name}</h2>
      <button className="element__favorite" type="button"></button>
      <p className="element__likes"></p>
      <button className="element__delete-button" type="button"></button>
    </div>

  )
}