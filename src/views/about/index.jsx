import React from "react";
import TypingCard from "@/components/TypingCard";

const About = () => {
  const cardContent = `
  <p> Hola a todos, este es nuestro proyecto final para el curso de Java Avanzada. </p>
  <p> Integrantes: </p>
  <p> Jorge Eduardo Navas -- 092-20-9499</p>
  <p> Jenner Eduardo Galindo -- 092-09-1064</p>
  <p> Edison Adán González -- 092-11-5719</p>`;
  return (
    <div className="app-container">
      <TypingCard title="Sobre el Autor" source={cardContent} />
    </div>
  );
};

export default About;
