import moment from "jalali-moment";
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from "react"
import styled from 'styled-components'
import Calendar from "./Calendar";


const DatePickerStyle = styled.div`
	position: relative;
	width: max-content;
	overflow: hidden;
	.dpicker {
		&__container {
			padding-top: 3px;
			padding-bottom: 3px;
		}
		&__input {
			background: #fff;
			padding: 8px 12px;
			display: block;
			width: 100%;
			font-size: 14px;
			border: 1px solid #babacc;
			color: #000;
			border-radius: 4px;
			/* margin-top: 13px;
			margin-bottom:3px; */
			transition: border-color .2s, color .2s;
			box-sizing: border-box;

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
			/* transform: translate(0, -10px); */
			transition: opacity .2s, transform .2s;
			opacity: 0;
			pointer-events: none;
			z-index: 10;
			box-shadow: 0px 4px 10px rgba(0, 0, 0, .08);
			${({calendarPosition}) => {
				switch (calendarPosition) {
					case 'top-right':
						return `
							bottom: 100%;
							right: 0;
						`
						break;
					case 'top-left':
						return `
							bottom: 100%;
							left: 0;
						`
						break;
					case 'top':
					case 'top-center':
						return `
							bottom: 100%;
							left: 50%;
							transform: translateX(-50%);
						`
						break;
					case 'bottom-left':
						return `
							top: 100%;
							left: 0;
						`
						break;
					case 'bottom':
					case 'bottom-center':
						return `
							top: 100%;
							left: 50%;
							transform: translateX(-50%);
						`
						break;
					case 'bottom-right':
					default:
						return `
							top: 100%;
							right: 0;
						`
						break;
				}
			}}
			@media only screen and (max-width: 600px) {
				left: none;
				right: 50%;
				transform: translateX(50%);
			}
		}
	}
	${({isCalendarOpen}) => isCalendarOpen ? `
		overflow: visible;
		.dpicker {
			&__calendar {
				opacity: 1;
				pointer-events: all;
				// transform: translate(0);
				@media only screen and (max-width: 600px) {
					// transform: translate(50%, 0);
				}
			}
		}
	` : ''}
`
export const DatePicker = ({className, defaultValue, onChange, format, inputClassName, calendarPosition, ...otherProps}) => {

	const [value, setValue] = useState();
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
			if (Array.isArray(defaultValue) && defaultValue?.every(d => moment(d, format).isValid() )) {
				setValue(defaultValue);				
			} else if (moment(defaultValue, format).isValid()) {
				setValue(defaultValue);
			}
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
		<DatePickerStyle ref={containerRef} isCalendarOpen={isCalendarOpen} className={className} calendarPosition={calendarPosition}>
			<div className="dpicker__container">
				<input readOnly={true} className={`${inputClassName} dpicker__input`} value={value} onClick={handleInputFocus} onFocus={handleInputFocus} />
				<Calendar className="dpicker__calendar" defaultValue={defaultValue} onChange={handleChange} {...otherProps} />
			</div>
		</DatePickerStyle>
	)
}

DatePicker.propTypes = {
	className: PropTypes.string,
	defaultValue: PropTypes.string,
	onChange: PropTypes.func,
	format: PropTypes.string.isRequired,
	inputClassName: PropTypes.string,
	calendarPosition: PropTypes.oneOf([
		"top-right",
		"top-center",
		"top-left",
		"top",
		"bottom-right",
		"bottom-left",
		"bottom-center",
		"bottom"
	])
}

DatePicker.defaultProps = {
	format: "YYYY-M-D",
	calendarPosition: "bottom-right"
}

export default DatePicker;