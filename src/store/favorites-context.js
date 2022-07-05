import { createContext, useState, useEffect } from 'react';
 
const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
});
 
export const FavoritesContextProvider = (props) => {
  const [userFavorites, setUserFavorites] = useState(
    localStorage.getItem('favorites') === null
      ? []
      : JSON.parse(localStorage.getItem('favorites'))
  );
 
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(userFavorites));
  }, [userFavorites]);
 
  function addFavoriteHandler(favoriteMeetup) {
    setUserFavorites((prevState) => {
      return prevState.concat(favoriteMeetup);
    });
  }
 
  function removefavoriteHandler(meetupId) {
    setUserFavorites((prevState) => {
      return prevState.filter((meetup) => meetup.id !== meetupId);
    });
  }
 
  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  }
 
  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removefavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };
 
  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
};
 
export default FavoritesContext;