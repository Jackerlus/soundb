import React from "react";
import { useState } from "react";

//Contains the details of an individual release
function Release({release}) {
    const [image, setImage] = useState("");
    const imgSearch = async () => {
        console.log("Retrieving release artwork...");
        try {
        const response = await fetch(`http://coverartarchive.org/release/${release.id}`, {
            // mode: "no-cors",
            headers: {
                "User-Agent": "SounDB/<v0.1.0> (jack.lewis159@gmail.com)",
                "Host": "coverartarchive.org",
                "Accept": "application/json"
            }
        });

        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setImage(jsonResponse.images[0].image);
        console.log("Retrieved image: ", image)
    } catch (error) {
        setImage("https://via.placeholder.com/350");
    }
    }
    imgSearch()

    return(
        <div className="release">
            <img src={image} className="image"/>
            <h2>{release.title}</h2>
            <h3>{release["artist-credit"][0].name}</h3>
            <h3>{release.date}</h3>
        </div>
    );
}

export default Release;