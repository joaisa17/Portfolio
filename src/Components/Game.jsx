import React from 'react';

import '../css/Components/Game.css';

import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';

export default function Game(props) {
    return <Col>
        <Card className="game mx-auto mb-4">
            <Link to={props.href}>
            <Card.Img variant="top" src={props.thumbnail} />
            <Card.Title className="title py-2">{props.title}</Card.Title>
            <Card.Text>{props.children}</Card.Text>
            </Link>
        </Card>
    </Col>
}
