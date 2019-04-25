import React from 'react';

const ColorSwatch = props => {
	// console.log(props)

	const style = {
		background: props.color,
		height: "20px",
		width: "20px"
	}
	return (
		<li style={style}></li>
	)
}


export default ColorSwatch;
