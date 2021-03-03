import React, { Component } from "react"

export const CustomLink = (props) => {
  if (Math.floor(Math.random() * 500) === 1) {
    return <a href={"https://www.youtube.com/watch?v=oHg5SJYRHA0"}>{props.link}</a>
  }
  else {
    return <a href={"https://" + props.link}>{props.link}</a>
  }
}
