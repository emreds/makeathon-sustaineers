import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./FoodStorage.css";
import foodkeeperjson from "./resources/foodkeeper.json";

function FoodStorage(props: any) {
    let storageDivs: any = [];
    props.ingredients.forEach((value: any, index: number) => {
        const ingredientArray = foodkeeperjson.sheets[2].data as Array<any>;
        let ingredientData = ingredientArray.find((data: any) => {
            if (data[4] && data[4].Keywords) {
                return data[4].Keywords.includes(value);
            }
            return false;
        }
        );
        let name;
        if (ingredientData[2]) {
            name = ingredientData[2].Name;
        } else {
            name = value;
        }
        let ediblePantryMax;
        if (ingredientData[6] && ingredientData[6].Pantry_Max) {
            ediblePantryMax = ingredientData[6].Pantry_Max;
        }
        let ediblePantryMetric;
        if (ingredientData[7] && ingredientData[7].Pantry_Metric) {
            ediblePantryMetric = ingredientData[7].Pantry_Metric;
        }
        let ediblePantry;
        if (ediblePantryMetric) {
            if (ediblePantryMax) {
                ediblePantry = "Edible for " + ediblePantryMax + " " + ediblePantryMetric + ". ";
            } else {
                ediblePantry = "Edible " + ediblePantryMetric + ". ";
            }
        }
        if (ingredientData[8] && ingredientData[8].Pantry_tips) {
            if (ediblePantry) {
                ediblePantry = ediblePantry + ingredientData[8].Pantry_tips;
            } else {
                ediblePantry = ingredientData[8].Pantry_tips;
            }
        }

        //DOP
        let ediblePantryDOPMax;
        if (ingredientData[10] && ingredientData[10].DOP_Pantry_Max) {
            ediblePantryDOPMax = ingredientData[10].DOP_Pantry_Max;
        }
        let ediblePantryDOPMetric;
        if (ingredientData[11] && ingredientData[11].DOP_Pantry_Metric) {
            ediblePantryDOPMetric = ingredientData[11].DOP_Pantry_Metric;
        }
        let ediblePantryDOP;
        if (ediblePantryDOPMetric) {
            if (ediblePantryDOPMax) {
                ediblePantryDOP = "Edible for " + ediblePantryDOPMax + " " + ediblePantryDOPMetric + ". ";
            } else {
                ediblePantryDOP = "Edible " + ediblePantryDOPMetric + ". ";
            }
        }
        if (ingredientData[12] && ingredientData[12].DOP_Pantry_tips) {
            if (ediblePantryDOP) {
                ediblePantryDOP = ediblePantryDOP + ingredientData[12].DOP_Pantry_tips;
            } else {
                ediblePantryDOP = ingredientData[12].DOP_Pantry_tips;
            }
        }
        //Refrig
        let edibleRefrigMax;
        if (ingredientData[17] && ingredientData[17].Refrigerate_Max) {
            edibleRefrigMax = ingredientData[17].Refrigerate_Max;
        }
        let edibleRefrigMetric;
        if (ingredientData[18] && ingredientData[18].Refrigerate_Metric) {
            edibleRefrigMetric = ingredientData[18].Refrigerate_Metric;
        }
        let edibleRefrig;
        if (edibleRefrigMetric) {
            edibleRefrig = "Edible for " + (edibleRefrigMax ? edibleRefrigMax : "") + " " + edibleRefrigMetric + ". ";
        }
        if (ingredientData[19] && ingredientData[19].Refrigerate_tips) {
            if (edibleRefrig) {
                edibleRefrig = edibleRefrig + ingredientData[19].Refrigerate_tips;
            } else {
                edibleRefrig = ingredientData[19].Refrigerate_tips;
            }
        }
        //Refrig DOP
        let edibleRefrigDOPMax;
        if (ingredientData[21] && ingredientData[21].DOP_Refrigerate_Max) {
            edibleRefrigDOPMax = ingredientData[21].DOP_Refrigerate_Max;
        }
        let edibleRefrigDOPMetric;
        if (ingredientData[22] && ingredientData[22].DOP_Refrigerate_Metric) {
            edibleRefrigDOPMetric = ingredientData[22].DOP_Refrigerate_Metric;
        }
        let edibleRefrigDOP;
        if (edibleRefrigDOPMetric) {
            edibleRefrigDOP = "Edible for " + (edibleRefrigDOPMax ? edibleRefrigDOPMax : "") + " " + edibleRefrigDOPMetric + ". ";
        }
        if (ingredientData[23] && ingredientData[23].DOP_Refrigerate_tips) {
            if (edibleRefrigDOP) {
                edibleRefrigDOP = edibleRefrigDOP + ingredientData[23].DOP_Refrigerate_tips;
            } else {
                edibleRefrigDOP = ingredientData[23].DOP_Refrigerate_tips;
            }
        }
        //frozen
        let edibleFrozenMax;
        if (ingredientData[31] && ingredientData[31].Freeze_Max) {
            edibleFrozenMax = ingredientData[31].Freeze_Max;
        }
        let edibleFrozenMetric;
        if (ingredientData[32] && ingredientData[32].Freeze_Metric) {
            edibleFrozenMetric = ingredientData[32].Freeze_Metric;
        }
        let edibleFrozen;
        if (edibleFrozenMetric) {
            edibleFrozen = "Edible for " + (edibleFrozenMax ? edibleFrozenMax : "") + " " + edibleFrozenMetric + ". ";
        }
        if (ingredientData[33] && ingredientData[33].Freeze_Tips) {
            if (edibleFrozen) {
                edibleFrozen = edibleFrozen + ingredientData[33].Freeze_Tips;
            } else {
                edibleFrozen = ingredientData[33].Freeze_Tips;
            }
        }

        let edibleFrozenDOPMax;
        if (ingredientData[35] && ingredientData[35].DOP_Freeze_Max) {
            edibleFrozenDOPMax = ingredientData[35].DOP_Freeze_Max;
        }
        let edibleFrozenDOPMetric;
        if (ingredientData[36] && ingredientData[36].DOP_Freeze_Metric) {
            edibleFrozenDOPMetric = ingredientData[36].DOP_Freeze_Metric;
        }
        let edibleFrozenDOP;
        if (edibleFrozenDOPMetric) {
            edibleFrozenDOP = "Edible for " + (edibleFrozenDOPMax ? edibleFrozenDOPMax : "") + " " + edibleFrozenDOPMetric + ". ";
        }
        if (ingredientData[37] && ingredientData[37].DOP_Freeze_Tips) {
            if (edibleFrozenDOP) {
                edibleFrozenDOP = edibleFrozenDOP + ingredientData[37].DOP_Freeze_Tips;
            } else {
                edibleFrozenDOP = ingredientData[37].DOP_Freeze_Tips;
            }
        }
        storageDivs.push(<Card key={index} className="FoodStorage-card">
            <Card.Body>
                <Card.Title className="Card-title"><b>{name}</b></Card.Title>
                <Card.Text className="Card-text">
                    {ediblePantry && <>
                        <b>Pantry:</b> {ediblePantry}
                    </>}
                    {ediblePantryDOP && <>
                        <br></br><b>Pantry:</b> {ediblePantryDOP}
                    </>}
                    {edibleRefrig && <>
                        <br></br><b>Refrigerator:</b> {edibleRefrig}
                    </>}
                    {edibleRefrigDOP && <>
                        <br></br><b>Refrigerator:</b> {edibleRefrigDOP}
                    </>}
                    {edibleFrozen && <>
                        <br></br><b>Frozen:</b> {edibleFrozen}
                    </>}
                    {edibleFrozenDOP && <>
                        <br></br><b>Frozen:</b> {edibleFrozenDOP}
                    </>}
                </Card.Text>
            </Card.Body>
        </Card>);
    });
    return (<div>
        <Modal.Header closeButton>
            <Modal.Title>Storage Tips</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className="FoodStorage">
                {storageDivs}
            </div>
        </Modal.Body>
    </div>
    );
}

export default FoodStorage;
