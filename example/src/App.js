import React from 'react'
import { Calendar, DatePicker } from 'react-fa-datepicker'
import styled from 'styled-components'
import './style.css';
// import SyntaxHighlighter from 'react-syntax-highlighter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { dark, darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Title = styled.h1`
	text-align: center;
	@media only screen and (max-width: 600px) {
		font-size: 1.4rem;
	}
`

const Code = styled(props => <SyntaxHighlighter {...props} />)`
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
				<Code language="bash" style={darcula}>
					npm i --save react-fa-datepicker
				</Code>

				<br/>

				<h2>تقویم</h2>
				<Calendar 
					className="mx-auto" 
					defaultValue="1400-11-20" 
					format="YYYY-M-D" 
					onChange={(selectedDate, dateObject) => console.log(selectedDate, dateObject)} 
					min="1400-11-10"
					max="1400-12-20"
					prevYears={3} 
					nextYears={3} 
					/>
					<br/><br/>
				<Code language="javascript" style={darcula}>
					{
`import { Calendar } from 'react-fa-datepicker'

<Calendar
	defaultValue="1400-12-27"
	format="YYYY-M-D"
	onChange={(selectedDate, dateObject) => console.log(selectedDate, dateObject)} //check browser console
	min="1400-11-10"
	max="1400-12-20"
	prevYears={10} // generates from 10 years ago, limited by 'min' property (Check next example)
	nextYears={0} // generates to next 0 years, limited by 'min' property (Check next example)
	/>
`}
				</Code>

				<br/><br/>

				<h2>انتخاب کننده تاریخ</h2>
				<DatePicker 
					className="me-auto" 
					defaultValue="1400/12/27" 
					format="YYYY/M/D" 
					onChange={(selectedDate, dateObject) => console.log(selectedDate, dateObject)} 
					prevYears={10} 
					nextYears={0}
					calendarPosition='bottom-right'
				/>
				<br/>
				<Code language="javascript" style={darcula}>
					{
`import { DatePicker } from 'react-fa-datepicker'

<DatePicker
	defaultValue="1400/12/27"
	format="YYYY/M/D"
	onChange={(selectedDate, dateObject) => console.log(selectedDate, dateObject)}
	prevYears={10} // generates from 10 years ago
	nextYears={0} // generates to next 0 years
	calendarPosition='bottom-right' // top-right | top-left | top-center | bottom-right | bottom-center | bottom-left
	// ...
	// and all Calendar props
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
