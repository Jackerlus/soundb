import '../styles/App.css';
import React from 'react';
import { useReducer } from 'react';
import Release from './Release';
import Search from './Search';

//Sets initial values regarding state of API calling and processing
const initialState = {
  loading: false,
  releases: [],
  errorMessage: null
};

//Receives result of search and allocates values to loading, releases, and errorMessage values.
const reducer = (state, action) => {
  switch (action.type) {

    case "SEARCH_RELEASES_REQUEST":
      return {
        ...state,
        //Sets loading boolean
        loading: true,

        //Ensures error message value is clear to prevent premature error display
        errorMessage: null
      };

    case "SEARCH_RELEASES_SUCCESS":
      return {
        ...state,
        loading: false,

        //Updates releases array to include release objects returned by API call
        releases: action.payload
      };

    case "SEARCH_RELEASES_FAILURE":
      return {
        ...state,
        loading: false,

        //Sets error message to whatever error is returned when a problem arises with the API call
        errorMessage: action.error
      }

    default:
      return state;
  }
}

function App() {

  //Utilises the previously defined reducer.
  const [state, dispatch] = useReducer(reducer, initialState);

  //Executes the API call with the search value and uses reducer to update the state of the search
  const search = async searchValue => {
    console.log("Acquiring API search results...");
    dispatch({type: "SEARCH_RELEASES_REQUEST"});
    if (searchValue !== "") {
      try {
        const response = await fetch(`http://musicbrainz.org/ws/2/release/?query=release:${searchValue}`, {
          headers: {
            "User-Agent": "SounDB/<v0.1.0> (jack.lewis159@gmail.com)",
            "Accept": "application/json"
          }
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        dispatch({
          type: "SEARCH_RELEASES_SUCCESS",
          payload: jsonResponse["releases"]
        });
      } catch (error) {
        dispatch({
          type: "SEARCH_RELEASES_FAILURE",
          error: error.message
        });
      }
    } else {
      dispatch({
        type: "SEARCH_RELEASES_FAILURE",
        error: "Search empty - please enter a release title."
      });
    }
  };
  
  //Updates state variables
  const {releases, errorMessage, loading} = state;

  return (
    <div className="App">
      <h1>Search for music releases with SounDB.</h1>
      <Search search={search} />
      <p className="tagline">Search for a music release.</p>
      <div className="releases">
        {/*Checks if the search is still loading or has produced an error already.
          If not, maps JSON object values returned by API call to JSX to pass to
          the Release component as a prop.*/}
        {loading && !errorMessage ? (
          <span>Loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          releases.map((release, index) => (
            <Release key={`${index}-${release.title}`} release={release} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
