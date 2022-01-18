import React, { useEffect, useRef, useState } from "react"
import moment from "jalali-moment";
import styled from 'styled-components'

const CalendarStyle = styled.div`
	border: 1px solid #eee;
	padding: 35px;
	text-align: center;
	width: max-content;
	border-radius: 4px;
	.cal {
		&__header {
			display: flex;
			font-size: 1rem;
			margin-bottom: 25px;
			justify-content: space-between;
			&__month {
				color: #0033B6;
				cursor: pointer;
				user-select: none;
			}
			&__current {
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
			&__cell {
				position: relative;
				width: calc(100% / 7);
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 14px;
				user-select: none;
				&::before {
					position: absolute;
					content: '';
					left: 8px;
					right: 8px;
					top: 6px;
					bottom: 10px;
					border-radius: 50%;
					background-color: rgba(0, 0, 0, 0);
					transition: border .2s, background-color .2s;
				}
				&--head {
					font-size: 11px;
					/* border: 1px solid; */
				}
				&:not(.cal__table__cell--head, .cal__table__cell--empty) {
					cursor: pointer;
				}
				&:not(.cal__table__cell--empty, .cal__table__cell--selected, .cal__table__cell--head):hover {
					&::before {
						background-color: rgba(0, 0, 0, .04);
					}
				}
				&--selected {
					color: #0033B6;
					&::before {
						border: 1px solid #0033B6;
					}
				}
			}
		}
	}
`
const Calendar = ({className, defaultValue, onChange, format="YYYY-M-D"}) => {
	
	moment.locale('fa');
	const m = moment();
	
	const [now, setNow] = useState(m);
	const [selectedDay, setSelectedDay] = useState();


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
			setNow(moment(defaultValue, format));
			setSelectedDay(moment(defaultValue, format));
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
		return Array.from(Array( (now.startOf('month').day() + 1) % 7));
	}

	const getCurrentDays = (now) => {
		return Array.from({
			length: now.daysInMonth()
		}, (_, i) => i + 1);
	}

	const renderCell = (dayNumber) => {
		
		let cls = "cal__table__cell";

		const today = now.clone().set('date', dayNumber);
		if (today.isSame(selectedDay)) {
			cls += ' cal__table__cell--selected';
		}

		return (
			<div key={dayNumber} onClick={() => handleClickCell(today)} className={cls}>{dayNumber}</div>
		)
	}

	const handleClickCell = (day) => {
		setSelectedDay(day)
		if (onChange) {
			onChange(day.format(format), day);
		}
	}

	return (
		<CalendarStyle className={className}>
			<div className="cal__header">
				<div className="cal__header__month" onClick={() => handlePrevMonth()}>ماه قبل</div>
				<div className="cal__header__current">{now.format("MMMM YYYY")}</div>
				<div className="cal__header__month" onClick={() => handleNextMonth()}>ماه بعد</div>
			</div>
			<div className="cal__body">
				<div className="cal__table">
					{weekDaysNames.map(d => 
							<div key={d} className="cal__table__cell cal__table__cell--head">{d}</div>
						)}
					{getCurrentEmptyDays(now).map(day => 
							<div key={day} className="cal__table__cell cal__table__cell--empty"></div>
						)}
					{getCurrentDays(now).map(renderCell)}
				</div>
			</div>
			<div className="cal__footer">

			</div>
		</CalendarStyle>
	)
}

export default Calendar;