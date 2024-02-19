// Home.js

import React from 'react';
import './Home.css';
import Carousel from 'react-bootstrap/Carousel';
import {Button, Card} from "react-bootstrap";


function Home() {
  return (
    <div className="home-page-container">
        <h1 className="home-page-slogan">Propel Your Career into the Future with Job Hub</h1>

        <div className="Home-page-content">
            <Carousel interval={6000}>
                <Carousel.Item>
                    <div className="home-carousel-card-container">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title className="home-card-title">Card Title</Card.Title>
                                <Card.Text className="home-card-text">
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title className="home-card-title">Card Title</Card.Title>
                                <Card.Text className="home-card-text">
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title className="home-card-title">Card Title</Card.Title>
                                <Card.Text className="home-card-text">
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </Carousel.Item>


            </Carousel>

        </div>

        <footer className="Home-Page-Footer"> test</footer>


    </div>
  );
}

export default Home;
