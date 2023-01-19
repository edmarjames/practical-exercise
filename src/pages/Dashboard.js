// import built-in react modules
import { useState, useEffect, useContext }      from 'react';

// import UserContext
import UserContext                              from '../UserContext';

// import downloaded packages
import { Container }                            from 'react-bootstrap';
import { Navigate }                             from 'react-router-dom';

// import components
import Tree                                     from '../components/Tree';

// importing this for testing purposes
// import MockData from '../MockData';


// export the function so that it can be use anywhere
export default function Dashboard() {

    // set an state array to store the territoryData from fetch
    const [territoryData, setTerritoryData] = useState([]);
    // get the user from UserContext
    const { user } = useContext(UserContext);

    // fetch the territory data from the /Territories/All API endpoint
    function fetchData() {
        fetch('https://corsanywhere.herokuapp.com/https://netzwelt-devtest.azurewebsites.net/Territories/All')
        .then(res => res.json())
        .then(data => {
            let fetchedData = data.data.map(data => data);
            setTerritoryData(fetchedData);
        });
    }

    // to fetch the territoryData on page render
    useEffect(() => {
        fetchData();
    }) 

    // render the page
    return (
        // conditional routing/rendering for authenticated and non authenticated user
        ( user.username === null && user.displayName === null ) ?
            <Navigate to="/account/login" />
        :
        <>
            <div className="home-background"></div>
            <Container>
                <div className="d-flex flex-column justify-content-center align-items-center my-5 gap-2">
                    <h1>Territories</h1>
                    <h4>Here are the list of territories</h4>
                    {/* render the tree component and pass the territoryData as props */}
                    <Tree data={territoryData} />
                </div>
            </Container>
        </>
    )
}