import React, { useEffect, useState } from "react";
import { Card, Popover, Row } from "antd";
import "../Components/Card.css";
const { Meta } = Card;


const Cards = () => {
  const [cards, setCards] = useState([]);
 
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

      setCards(charactersWithImages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderPopoverContent = (card) => (
    <div>
      <h1>Name: {card.name}</h1>
      <p>Species: {card.species}</p>
      <p>Birth Year: {card.birth_year}</p>
      <p>Height: {card.height}</p>
      <p>Mass: {card.mass}</p>
    
    </div>
  );

  return (
    <>
      <Row gutter={16}>
        {cards.map((card, index) => (
          <Popover content={renderPopoverContent(card)} title={card.name} key={index}>
            <Card
          
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
          </Popover>
        ))}
      </Row>
    </>
  );
};

export default Cards;