import React, { useEffect, useRef, useState } from "react"
import styled from 'styled-components'
import Calendar from "./Calendar";


const DatePickerStyle = styled.div`
	position: relative;
	width: max-content;
	/* display: inline-block; */
	.dpicker {
		&__input {
			background: #fff;
			padding: 8px 12px;
			display: block;
			width: 100%;
			font-size: 14px;
			border: 1px solid #babacc;
			color: #000;
			border-radius: 4px;
			box-sizing: border-box;
			margin-top: 3px;
			margin-bottom:3px;
			transition: border-color .2s, color .2s;

			&[type="number"] {
				-moz-appearance: textfield;
				&::-webkit-outer-spin-button,
				&::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
			}

			&:focus ~ ._icon{
				color: #0033B6;
			}
			&:focus{
				outline: none;
				border-color: #0033B6;
				
			}
			&:disabled{
				opacity: 1;
				background-color: rgba(230, 230, 230, .4);
			}
			::placeholder{
				color:#999;
			}
		}
		&__calendar {
			background-color: #fff;
			position: absolute;
			top: 100%;
			/* left: 50%; */
			transform: translate(0, -10px);
			transition: opacity .2s, transform .2s;
			right: 0;
			opacity: 0;
			pointer-events: none;
			z-index: 10;
			box-shadow: 0px 4px 10px rgba(0, 0, 0, .08);
			@media only screen and (max-width: 600px) {
				right: 50%;
				transform: translate(50%, -10px);
			}
		}
	}
	${({isCalendarOpen}) => isCalendarOpen ? `
		.dpicker {
			&__calendar {
				opacity: 1;
				pointer-events: all;
				transform: translate(0);
				@media only screen and (max-width: 600px) {
					transform: translate(50%, 0);
				}
			}
		}
	` : ''}
`
export const DatePicker = ({className, defaultValue, onChange, format, inputClassName, ...otherProps}) => {

	const [value, setValue] = useState(defaultValue);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	
	const containerRef = useRef();

	useEffect(() => {

		if (containerRef?.current) {
			window.addEventListener('click', function(e){   
				if (!containerRef.current?.contains(e.target)){
					setIsCalendarOpen(false);
				}
			});
		} 

	}, [containerRef?.current])

	useEffect(() => {
		if (defaultValue !== undefined) {
			setValue(defaultValue);
		}
	}, [defaultValue])


	const handleChange = (date, dateObject) => {
		// console.log(date);
		setValue(date);
		if (onChange) {
			onChange(date, dateObject);
		}
		setIsCalendarOpen(false);
	}

	const handleInputFocus = () => {
		setIsCalendarOpen(true);
	}

	return (
		<DatePickerStyle ref={containerRef} isCalendarOpen={isCalendarOpen} className={className}>
			<input className={`${inputClassName} dpicker__input`} value={value} onClick={handleInputFocus} onFocus={handleInputFocus} />
			<Calendar className="dpicker__calendar" format={format} defaultValue={defaultValue} onChange={handleChange} />
		</DatePickerStyle>
	)
}

export default DatePicker;