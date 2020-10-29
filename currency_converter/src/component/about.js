
import React from "react";
import Card from 'react-bootstrap/Card';
import "./about.css"
const About = () => {
  return (
    <div class="container">
    <div class="row">
        <div class="col-10">
      <Card className="text-center">
      <Card.Header className='title'>About the webSite</Card.Header>
     <Card.Body >
    <Card.Title>Developped by: Reem MATHBOUT and Pierre EPRON </Card.Title>
    <Card.Text>
      The goal of this website is to discover the basics of web delopping techniques.
    </Card.Text>
  </Card.Body>
  <Card.Footer className="text-muted">Ecole IA Simplone 2020-2021</Card.Footer>
</Card>
    </div>
    </div>
    </div>
  );
}
export default About;