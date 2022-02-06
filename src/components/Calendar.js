import React, { useEffect, useRef, useState } from "react"
import PropTypes from 'prop-types';
import moment, { months } from "jalali-moment";
import styled from 'styled-components'
import { DropDown } from "..";

const CalendarStyle = styled.div`
	border: 1px solid #eee;
	padding: 15px 25px;
	text-align: center;
	width: max-content;
	border-radius: 4px;
	@media only screen and (max-width: 600px) {
		padding: 25px 15px;
	}
	.cal {
		&__header {
			display: flex;
			align-items: center;
			font-size: 1rem;
			margin-bottom: 15px;
			justify-content: space-between;
			@media only screen and (max-width: 600px) {
				margin-bottom: 0;
			}
			&__month {
				color: #0033B6;
				cursor: pointer;
				user-select: none;
				&--disabled {
					color: #999;
					pointer-events: none;
				}
			}
			&__current {
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: bold;
				color: #000;
			}
		}
		&__body {

		}
		&__table {
			display: flex;
			flex-wrap: wrap;
			width: 350px;
			@media only screen and (max-width: 600px) {
				width: 280px;
			}
			&__cell {
				position: relative;
				width: calc(100% / 7);
				height: 50px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 14px;
				user-select: none;
				@media only screen and (max-width: 600px) {
					height: 40px;
				}
				&::before {
					position: absolute;
					content: '';
					left: 8px;
					right: 8px;
					top: 6px;
					bottom: 10px;
					border-radius: 50%;
					background-color: rgba(0, 0, 0, 0);
					border: 1px solid transparent;
					transition: border-color .2s, background-color .2s;
					@media only screen and (max-width: 600px) {
						left: 3px;
						top: 1px;
						right: 3px;
						bottom: 5px;
					}
				}
				&__meta {
					font-size: 10px;
					position: absolute;
					bottom: 3px;
					left: 50%;
					transform: translateX(-50%);
					transition: bottom .2s .3s;
				}
				&--head {
					font-size: 11px;
					/* border: 1px solid; */
					@media only screen and (max-width: 600px) {
						/* visibility: hidden; */
						font-size: 0;
						&::after {
							content: attr(data-shortname);
							font-size: 14px;
						}
					}
				}
				&--active {
					cursor: pointer;
					&:not(.cal__table__cell--selected):hover {
						&::before {
							background-color: rgba(0, 0, 0, .04);
						}
					}
				}
				&--selected {
					color: #0033B6;
					&::before {
						border-color: #0033B6;
					}
					.cal__table__cell__meta {
						bottom: -3px;
						transition: bottom .2s;
					}
				}
				&--disabled {
					color: #999;
					pointer-events: none;
				}
			}
		}
	}
	${({small}) => small ? `
		padding: 10px 15px;
		.cal {
			&__header {
				font-size: 13px;
				&__month {

				}
				&__current {

				}
				&__year {
					.dd__valtext {
						font-size: 13px;
						padding: 5px 8px 5px 12px;
						&::before {
							width: 4px;
							height: 4px;
						}
					}
				}
			}
			&__table {
				width: 210px;
				&__cell {
					height: 30px;
					font-size: 12px;
					&__meta {
						display: none;
					}
					&--head {
						font-size: 0;
						&::after {
							content: attr(data-shortname);
							font-size: 14px;
						}
					}
					&::before {
						left: 2px;
						right: 2px;
						top: 1px;
						bottom: 3px;
					}
				}
			}
		}
	` : ''}
`
const Calendar = ({className, type, defaultValue, onChange, format, prevYears, nextYears, min, max, small}) => {
	
	moment.locale('fa');
	
	let m;
	if (defaultValue && moment(defaultValue, format).isValid()) {
		m = moment(defaultValue, format);
	} else {
		m = moment();
	}
	
	const [now, setNow] = useState(m);
	const [selectedDay, setSelectedDay] = useState();
	const [selectedRange, setSelectedRange] = useState();

	const minDate = min ? moment(min, format) : null;
	const maxDate = max ? moment(max, format) : null;


	const weekDaysNames = [
		'شنبه',
		'یکشنبه',
		'دوشنبه',
		'سه شنبه',
		'چهارشنبه',
		'پنج‌شنبه',
		'جمعه'
	]

	useEffect(() => {
		if (defaultValue !== undefined) {
			
			if (type === "range") {
				if (Array.isArray(defaultValue) && defaultValue?.every(d => moment(d, format).isValid() )) {
					setNow(moment(defaultValue[0], format));
					setSelectedRange(defaultValue.map(rng => moment(rng, format)))
				}
			} else {
				if (moment(defaultValue, format).isValid()) {
					setNow(moment(defaultValue, format));
					setSelectedDay(moment(defaultValue, format));
				}
			}
		}
	}, [defaultValue]);

	// change date functions
	const handlePrevMonth = () => {
		setNow(now.clone().subtract(1, 'months'));
	}
	const handleNextMonth = () => {
		setNow(now.clone().add(1, 'months'));
	}

	const getCurrentEmptyDays = (now) => {
		return Array.from(Array( (now.clone().startOf('month').day() + 1) % 7));
	}

	const getCurrentDays = (now) => {
		return Array.from({
			length: now.daysInMonth()
		}, (_, i) => 
				now.clone().startOf('month').add(i, 'days')
		);
	}
	

	const renderCell = (today) => {
		
		const isToday = moment().isSame(today, 'day');
		
		let cls = "cal__table__cell";

		if (type === "range") {

			if (selectedRange && ( (selectedRange.length===1 && today.isSame(selectedRange[0], 'day')) || (selectedRange.length === 2 && today.isBetween(...selectedRange, undefined, '[]')))) {
				cls += ' cal__table__cell--selected';
			}
		} else {
			if (selectedDay && today.isSame(selectedDay, 'day')) {
				cls += ' cal__table__cell--selected';
			}
		}

		if ((maxDate && today.isAfter(maxDate)) || (minDate && today.isBefore(minDate))) {
			cls += ' cal__table__cell--disabled'
		} else {
			cls += ' cal__table__cell--active'
		}
		
		return (
			<div key={today.date()} onClick={() => handleClickCell(today)} className={cls} title={today.format("D MMMM YYYY")}>
				{today.date()}
				{isToday && <div className="cal__table__cell__meta">امروز</div>}
			</div>
		)
	}

	const handleClickCell = (day) => {

		if (type === "range") {
			setSelectedRange(range => {

				let newRange;

				if (!Array.isArray(range) || [0, 2].includes(range?.length)) {
					newRange = [day];
				} else if (range?.length === 1) {
					newRange = [...range, day];
					if (onChange) {
						onChange(newRange.map(rangeitem => rangeitem.format(format)), newRange);
					}
				}

				return newRange;
			})

		} else {
			setSelectedDay(day);
			if (onChange) {
				onChange(day.format(format), day);
			}
		}
		setNow(day);
	}

	const getYears = (now) => {

		const thisYear = moment().year();

		let startYear = thisYear - prevYears;
		if (minDate && startYear < minDate.year()) {
			startYear = minDate.year();
		}
		if (now.year() < startYear) {
			startYear = now.year()
		}

		let endYear = thisYear + nextYears;
		if (maxDate && endYear > maxDate.year()) {
			endYear = maxDate.year();
		}
		if (now.year() > endYear) {
			endYear = now.year();
		}
		
		const allYears = [];
		
		let y = startYear;
		while (y <= endYear) {
			allYears.push(y);
			y += 1;
		}
		return allYears
			.sort((a,b) => b-a);
	}

	const onChangeYear = (now, year) => {
		setNow(now.clone().year(year));
	}

	const isPrevMonthActive = (now) => {
		return minDate ? now.clone().set('date', 1).subtract(1, 'days').isAfter(minDate) : true;
	}
	const isNextMonthActive = (now) => {
		return maxDate ? now.clone().set('date', now.daysInMonth()).add(1, 'days').isBefore(maxDate) : true;
	}

	return (
		<CalendarStyle className={className} small={small}>
			<div className="cal__header">
				<div className={`cal__header__month ${isPrevMonthActive(now) ? '' : 'cal__header__month--disabled'}`} onClick={() => handlePrevMonth()}>ماه قبل</div>
				<div className="cal__header__current">
					{now.format("MMMM ")}
					<DropDown className="cal__header__year" options={getYears(now)?.map(y => ({
						label: y,
						value: y
					}))} defaultValue={now?.year()} onChange={y => onChangeYear(now, y)} />
				</div>
				<div className={`cal__header__month ${isNextMonthActive(now) ? '' : 'cal__header__month--disabled'}`} onClick={() => handleNextMonth()}>ماه بعد</div>
			</div>
			<div className="cal__body">
				<div className="cal__table">
					{weekDaysNames.map(d => 
							<div key={d} className="cal__table__cell cal__table__cell--head" data-shortname={d.substr(0, 1)}>{d}</div>
						)}
					{getCurrentEmptyDays(now).map(day => 
							<div key={day} className="cal__table__cell cal__table__cell--empty"></div>
						)}
					{getCurrentDays(now).map(d => renderCell(d))}
				</div>
			</div>
			<div className="cal__footer">

			</div>
		</CalendarStyle>
	)
}

Calendar.propTypes = {
	className: PropTypes.string,
	type: PropTypes.oneOf(["standard", "range"]).isRequired,
	defaultValue: PropTypes.oneOfType([
		PropTypes.string, 
		PropTypes.arrayOf(PropTypes.string)
	]),
	onChange: PropTypes.func,
	format: PropTypes.string.isRequired,
	prevYears: PropTypes.number.isRequired,
	nextYears: PropTypes.number.isRequired,
	min: PropTypes.string,
	max: PropTypes.string,
}

Calendar.defaultProps = {
	format: "YYYY-M-D",
	type: "standard",
	prevYears: 10,
	nextYears: 0
}

export default Calendar;