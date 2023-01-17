import { Container }  from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function Dashboard() {

    const [treeData, setTreeData] = useState([]);

    function fetchData() {

        fetch('https://corsanywhere.herokuapp.com/https://netzwelt-devtest.azurewebsites.net/Territories/All')
        .then(res => res.json())
        .then(data => {
            let fetchedData = data.data.map(newData => {
                let region = [];
                let city = [];
                if(newData.id.length === 1 && newData.parent === null) {
                    region.push({
                        id: newData.id,
                        name: newData.name
                    });
                } else if ((newData.id.length > 1 && newData.id.length <=3) && newData.parent !== null) {
                    for (let r of region) {
                        if (newData.parent === r.id) {
                            city.push({
                                id: newData.id,
                                name: newData.name
                            });
                        }
                    }
                }

                // let city = [];
                // for (let r of region) {
                    
                //     if (newData.parent === r.id) {
                //         // city.push(newData.name);
                //     }
                // }

                return (
                    <li key={newData.id}>
                        {region.map(region => (
                            <>
                            <span className="caret" key={region.id}>{region.name}</span>
                                <ul className="nested">
                                    <li key={city.id}>
                                        {city.map(city => (
                                            <span className="caret" key={city.id}>city.name</span>
                                        ))}
                                    </li>
                                </ul>
                            </>
                        ))}
                        
                    </li>
                )
            });
            setTreeData(fetchedData);
        });
    }

    useEffect(() => {
        fetchData();
    });

    return (
        <Container>
            <div className="d-flex flex-column justify-content-center align-items-center my-5 gap-2">
                <h1>Territories</h1>
                <h4>Here are the list of territories</h4>
                <ul id="myUL">
                    {treeData}
                </ul>
            </div>
        </Container>
    )
}