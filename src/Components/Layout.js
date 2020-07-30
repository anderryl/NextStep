import React from "react";
import { Container } from "react-bootstrap";

export const Layout = (props) => (
  <Container>
    <hr width = {0}></hr>
      {props.children}
    <hr width = {0}></hr>
  </Container>
)
