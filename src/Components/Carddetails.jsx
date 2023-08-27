import React from 'react'
import { useState, useEffect } from 'react';
import { Card,  } from 'antd';
const Carddetails = () => {
    const { Meta } = Card;
    const [details, setDetails] = useState([]);
    useEffect(() => {
        getdetails();
      }, []);

      const getdetails = async () => {
        try {
          let result = await fetch("https://swapi.dev/api/people/");
          result = await result.json();
    
          const randomImages = Array.from(
            { length: result.results.length },
            (_, index) => `https://picsum.photos/200/300?random=${index}`
          );
    
          const charactersWithImages = result.results.map((character, index) => ({
            ...character,
            image: randomImages[index],
          }));
    
          setDetails(charactersWithImages);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      const renderCarddetails = (details) => (
        <div>
            <p>Name: {details.name}</p>
          <p>Species: {details.species}</p>
          <p>Birth Year: {details.birth_year}</p>
          <p>Height: {details.height}</p>
          <p>Mass: {details.mass}</p>
        
        </div>
      );
  return (
   <>
 
        {details.map((card, index) => (
          
            <Card content={renderCarddetails(card)} title={card.name} key={index}
            onClick={renderCarddetails}
              className="Cards"
              hoverable
              style={{
                width: 200,
                marginLeft: 20,
                marginTop: 10,
              }}
              cover={<img alt={card.name} src={card.image} />}
            >
              <Meta title={card.name} />
            </Card>
       
        ))}
   
   </>
  )
}

export default Carddetails