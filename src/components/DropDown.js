import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { createRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const Style = styled.div`
	position: relative;
	.dd {
		&__select {
			display: none;
		}
		&__valtext {
			font-size: 14px;
			font-weight: 400;
			color: #0033B6;
			cursor: pointer;
			position: relative;
			padding: 10px 12px 10px 15px;
			user-select: none;
			&::before {
				position: absolute;
				content: '';
				left: 0;
				top: 50%;
				transform: translateY(calc(-50% - 2px)) rotate(-45deg);
				width: 6px;
				height: 6px;
				border: 2px solid #0033B6;
				border-top: none;
				border-right: none;
			}
		}
		&__popup {
			position: absolute;
			width: max-content;
			max-height: 300px;
			overflow: auto;
			top: 100%;
			z-index: 2;
			box-shadow: 0 4px 10px rgba(0, 0, 0, .1);
			border-radius: 4px;
			/* padding: 10px 0; */
			background-color: #fff;
			text-align: center;
			opacity: 0;
			pointer-events: none;
			transition: opacity .1s, transform .1s;
			transform: translateY(10px);
			::-webkit-scrollbar {
				width: 3px;
			}
			::-webkit-scrollbar-track {
				background: #f1f1f1;
			}
			::-webkit-scrollbar-thumb {
				background: #888;
			}
			::-webkit-scrollbar-thumb:hover {
				background: #555;
			}
			&__item {
				padding: 8px 25px;
				font-size: 14px;
				cursor: pointer;
				transition: color .2s, background-color .2s;
				font-weight: 400;
				&:not(:last-child) {
					border-bottom: 1px solid #eee;
				}
				&:hover, &--active {
					color: #0033B6;
					background-color: rgba(0, 0, 0, .04);
				}
			}
			${({popup}) => popup ? `
				opacity: 1;
				pointer-events: all;
				transform: translateY(0);
			` : ''}
		}
	}
`
const DropDown = ({className, iref, defaultValue, onChange, options, disabled, placeholder, labelRenderer, ...otherProps}) => {

	const [value, setValue] = useState();
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const selectRef = useRef();
	const wrapperRef = useRef();

	useEffect(() => {

		if (wrapperRef?.current) {
			window.addEventListener('click', function(e){   
				if (!wrapperRef.current?.contains(e.target)){
					setIsPopupOpen(false);
				}
			});
		} 

	}, [wrapperRef?.current]);

	useEffect(() => {
        
		if (defaultValue === undefined) return;

		setValue(defaultValue);
		selectRef.current.value = defaultValue;

    }, [defaultValue]);

	const toggleIsPopupOpen = (newVal) => {
		setIsPopupOpen(x => newVal || !x);
	}
	
    const handleChange = val => {

        if (disabled) return;

        setValue(val);
		setIsPopupOpen(false);

        selectRef.current.value = val;
        
		if (onChange) {
            onChange(val);
        }
    }

	return (
		<Style className={className} popup={isPopupOpen} ref={wrapperRef}>
			<select className="dd__select" ref={el => {selectRef.current=el; if (iref) iref.current=el}}  {...otherProps}>
				<option selected hidden value="">{placeholder ? placeholder : "انتخاب کنید"}</option>
				{options?.map((opt, i)=>(
					<option key={i} value={opt.value} selected={opt.value == defaultValue}>{opt.label}</option>
				))}
			</select>
			<div className="dd__valtext" onClick={() => toggleIsPopupOpen()}>
				{labelRenderer ? (labelRenderer(options?.find(opt => opt?.value===value))) : (options?.find(opt => opt?.value===value)?.label || placeholder || 'انتخاب کنید')}
			</div>
			<div className="dd__popup">
				{options?.map(opt =>
						<div key={opt?.value} className={`dd__popup__item ${opt.value===value ? 'dd__popup__item--active' : ''}`} onClick={() => handleChange(opt.value)}>
							{opt?.label}
						</div>
					)}
			</div>
		</Style>
	)
}

DropDown.propTypes = {
	className: PropTypes.string,
	defaultValue: PropTypes.any,
	onChange: PropTypes.func,
	options: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.bool
		])
	})).isRequired,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	labelRenderer: PropTypes.func
}

export default DropDown;