import React, { useState } from "react";
import "../Components/Header.css";
import { Input, Button, Card, Popover,Row } from "antd";

const { Meta } = Card;

const App = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]); 

  const handleSearch = async () => {
    try {
      let result = await fetch(`https://swapi.dev/api/people/?search=${search}`);
      result = await result.json();
      setSearchResults(result.results); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const renderPopoverContent = (card) => (
    <div>
      <p>Species: {card.species}</p>
      <p>Birth Year: {card.birth_year}</p>
      <p>Height: {card.height}</p>
      <p>Mass: {card.mass}</p>
    
    </div>
  );

  const cardDetails = (card)=>(
    <div>
      <h1>Name:{card.name}</h1>
     
      <p>Height:{card.height}</p>
      <p>Mass:{card.mass}</p>
      <p>Birt-Year:{card.birth_year}</p>
      <p></p>
    </div>
  )
  
  const generateRandomImageUrl = () => {
    const randomId = Math.floor(Math.random() * 1000); 
    return `https://picsum.photos/200/300?random=${randomId}`;
  };

  return (
    <>
    
      <div className="border-box">
      <a href="/" className="header">StarWars</a>
        <Input
          placeholder="Search for a character"
          className="Input-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="search-results">
        <Row gutter={16}>
          {searchResults.map((result, index) => (
             <Popover content={renderPopoverContent(result)} title={result.name} key={index}>
            <Card
              key={index}
              hoverable
              onClick={cardDetails}
              style={{
                width: 280,
                margin: 20,
              }}
              cover={
                <img
                  alt="example"
                  src={generateRandomImageUrl()} 
                />
              }
            >
              <Meta title={result.name} description={`Height: ${result.height}, Mass: ${result.mass}, Birth Year: ${result.birth_year}`} />
            
            </Card>
            </Popover>
          ))}
        </Row>
      </div>
    </>
  );
};

export default App;





