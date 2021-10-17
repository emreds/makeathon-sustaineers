import React from "react";
import { useState } from "react";
import './Recipes.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Recipes(props: any) {

    let recipeDivs: any = [];
    props.recipes.forEach((value: any, index: number) => {
        recipeDivs.push(<Card key={index} className="Recipe-card">
            <Card.Img className="Card-image" variant="top" src={value.image} />
            <Card.Body>
                <Card.Title className="Card-title"><b>{value.title}</b></Card.Title>
                <Card.Text className="Card-text">
                    This is a delicious recipe for anyone. You only ...
                </Card.Text>
            </Card.Body>
        </Card>);
    });
    return (
        <div className="Recipes">
            {recipeDivs}
        </div>
    );
}

export default Recipes;
