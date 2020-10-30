
import React from "react";
import Card from 'react-bootstrap/Card';
import "./about.css"
const About = () => {
  return (
<div class="container">
  <div class="row justify-content-center">
      <div class="card">
        <div class="card-header">
          <h3 className="text-center">About Currency Converter</h3>
        </div>
        <div class="card-body">
            <h5 class="card-title">This website developped by: Reem MATHBOUT and Pierre EPRON</h5>
            <p class="card-text">The goal of this website is to discover the basics of web development techniques.</p>
            <p class="card-text">Like HTML, CSS, JavaScript (JS), JQuery, Bootstrap and React.</p>
            <div class="card-footer">
              <h6 className="text-center"> &copy;Ecole IA Simplone 2020-2021</h6>
            </div>
          </div>
      </div>
  </div>
</div>
  );
}
export default About;