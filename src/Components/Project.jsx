import React from 'react';

import '@css/Components/Project.css';

import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';

// If nofooter / header property, hide it with css

export default function Project(props) {
    return <Col>
        <Card className="project mx-auto mb-4" title={props.title}>
            <Link to={props.href}>
            <Card.Img variant="top" src={props.thumbnail} />
            <Card.Title className="title py-2">{props.title}</Card.Title>
            <Card.Text>{props.children}</Card.Text>
            </Link>
        </Card>
    </Col>
}