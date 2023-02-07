import React from "react";

//Contains the details of an individual release
function Release({release}) {
    return(
        <div className="release">
            <h2>{release.title}</h2>
            <h3>{release["artist-credit"][0].name}</h3>
            <h3>{release.date}</h3>
        </div>
    );
}

export default Release;