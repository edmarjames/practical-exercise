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

    const [territoryData, setTerritoryData] = useState([]);
    const { user } = useContext(UserContext);

    function fetchData() {

        fetch('https://corsanywhere.herokuapp.com/https://netzwelt-devtest.azurewebsites.net/Territories/All')
        .then(res => res.json())
        .then(data => {
            let fetchedData = data.data.map(data => data);
            setTerritoryData(fetchedData);
        });
    }

    useEffect(() => {
        fetchData();
    }) 

    return (
        ( user.username === null ) ?
            <Navigate to="/account/login" />
        :
        <>
            <div className="home-background"></div>
            <Container>
                <div className="d-flex flex-column justify-content-center align-items-center my-5 gap-2">
                    <h1>Territories</h1>
                    <h4>Here are the list of territories</h4>
                    <Tree data={territoryData} />
                </div>
            </Container>
        </>
    )
}