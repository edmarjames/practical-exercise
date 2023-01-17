import { Container }  from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Tree from '../components/Tree';

export default function Dashboard() {

    const [territoryData, setTerritoryData] = useState([]);

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
        <Container>
            <div className="d-flex flex-column justify-content-center align-items-center my-5 gap-2">
                <h1>Territories</h1>
                <h4>Here are the list of territories</h4>
                <Tree data={territoryData} />
            </div>
        </Container>
    )
}