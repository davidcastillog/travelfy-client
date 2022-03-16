import "./MyPlaces.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneTrip, getAllPlacesFromTrip } from "../../services/tripsWs";

function MyPlaces({ user, ...props }) {
  const { id } = useParams();

  const [places, setPlaces] = useState([]);
  const [trip, setTrip] = useState({});
  const [isloading, setIsLoading] = useState(true);

  console.log("TRIP", trip);
  console.log("PLACES", places);

  const getTripAndPlaces = async () => {
    const trip = await getOneTrip(id);
    const placesInTrip = await getAllPlacesFromTrip(id);
    if (placesInTrip) {
      setPlaces(placesInTrip.data.places);
      setIsLoading(false);
    }
    if (trip) {
      setTrip(trip.data.trip);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTripAndPlaces();
  }, []);

  return (
    <div className="MyPlaces">
      <h1>{trip.title}</h1>
      <p>{trip.description}</p>
      <div className="places-container">
        {!isloading && places.length > 0 ? (
          places.map((place, i) => (
            <div key={i}>
              <h2>{place.name}</h2>
              <p>{place.rating}</p>
              <div className="place-img-container">
                {/* Map images */}
                {place.placeImages.map((image, i) => (
                  <img key={i} src={image} alt="place" />
                ))}
              </div>
            </div>
          ))
        ) : (
          <>
            <p>No places added yet</p>
          </>
        )}
      </div>
    </div>
  );
}

export default MyPlaces;
