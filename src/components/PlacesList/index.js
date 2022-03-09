import "./PlacesList.css";

const PlacesList = ({ places }) => {

  return (
    <div className="places-list">
      <ul>
        {places.map((place) => (
          <li key={place.id}>
            <div>
              <h2>{place.documentID}</h2>
              <p>{place.names.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlacesList;
