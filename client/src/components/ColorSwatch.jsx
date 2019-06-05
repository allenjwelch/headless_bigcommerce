import React from 'react';

const ColorSwatch = props => {
	// console.log(props)

	const style = {
		background: props.color,
		height: "40px",
		width: "40px",
		padding: "0px"
	}
	return (
		<li style={style}></li>
	)
}


export default ColorSwatch;
