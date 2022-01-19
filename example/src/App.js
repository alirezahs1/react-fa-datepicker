import React from 'react'
import { Calendar, DatePicker } from 'react-fa-datepicker'
import styled from 'styled-components'
import './style.css';

const Title = styled.h1`
	text-align: center;
	@media only screen and (max-width: 600px) {
		font-size: 1.4rem;
	}
`

const Code = styled.pre`
	background: #f4f4f4;
    border: 1px solid #ddd;
    border-left: 3px solid #f36d33;
    color: #444;
    page-break-inside: avoid;
    font-family: monospace;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 1.6em;
    /* max-width: 100%; */
    overflow: auto;
    padding: 1em 1.5em;
    display: block;
    word-wrap: break-word;
	text-align: left;
	direction: ltr;
`

const Copyright = styled.div`
	text-align: center;
	color: #333;
	padding: 25px;
	/* max-width: 100%; */
	a {
		text-decoration: none;
		color: #0033B6;
	}
`

const Style = styled.div`
	.container {
		max-width: 1080px;
		/* width: 100%; */
		margin: 15px auto;
		padding: 15px;
		border-radius: 4px;
		background: #fff;
	}
	.mx-auto {
		margin-left: auto;
		margin-right: auto;
	}
	.me-auto {
		margin-left: auto;
		margin-right: auto;
	}
`

const App = () => {
  return (
		<Style>
			<div className="container">
				<Title>تقویم و انتخاب کننده تاریخ فارسی برای ری‌اکت</Title>

				<h2>نصب</h2>
				<Code>
					npm i --save react-fa-datepicker
				</Code>

				<h2>تقویم</h2>
				<Calendar className="mx-auto" defaultValue="1400-12-27" format="YYYY-M-D" onChange={(selectedDate, dateObject) => console.log(selectedDate, dateObject)} />
				<Code>
					{
`import { Calendar } from 'react-fa-datepicker'

<Calendar
	defaultValue="1400-12-27"
	format="YYYY-M-D"
	onChange={(selectedDate, dateObject) => console.log(selectedDate, dateObject)} //check browser console
	/>
`}
				</Code>

				<h2>انتخاب کننده تاریخ</h2>
				<DatePicker className="me-auto" defaultValue="1400/12/27" format="YYYY/M/D" onChange={(selectedDate, dateObject) => console.log(selectedDate, dateObject)}  />
				<Code>
					{
`import { DatePicker } from 'react-fa-datepicker'

<DatePicker
	defaultValue="1400/12/27"
	format="YYYY/M/D"
	onChange={(selectedDate, dateObject) => console.log(selectedDate, dateObject)}
	/>
`}
				</Code>

			</div>
			<Copyright>
				توسعه داده شده با عشق. توسط <a href="https://github.com/alirezahs1">علیرضا</a>
			</Copyright>
		</Style>
	)
}

export default App
