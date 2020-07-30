import React from "react"

export const HeaderWrapper = (props) => {
  function clicked() {
    props.onClick(props.info)
  }

  return (
    <h2 onClick = {clicked}>{props.children}</h2>
  )
}
