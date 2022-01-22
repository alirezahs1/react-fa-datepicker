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

const Text = styled.p`
	font-weight: 300;
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
	a {
		text-decoration: none;
		color: #0033B6;
	}
`

const App = () => {
  return (
		<Style>
			<div className="container">
				<Title>تقویم و انتخاب کننده تاریخ فارسی برای ری‌اکت</Title>

				<h2>۱. نصب</h2>
				<Code language="bash" style={darcula}>
					npm i --save react-fa-datepicker
				</Code>
				<br/>

				<h2>۲. اضافه کردن</h2>
				<Code language="jsx" style={darcula}>
					{`import { Calendar, DatePicker } from 'react-fa-datepicker'`}
				</Code>
				<br/>

				<h2>۳. تقویم فارسی</h2>
				<Calendar 
					className="mx-auto" 
					onChange={(d, dateObject) => console.log(d, dateObject)} 
					/>
					<br/>
				<Code language="javascript" style={darcula}>
{`<Calendar
	onChange={(d, dateObject) => console.log(d, dateObject)} // check browser console
/>`}
				</Code>

				<br/>

				<h2>۳.۱. مقدار پیشفرض</h2>
				<Calendar 
					className="mx-auto" 
					defaultValue="1400-6-5"
					onChange={d => console.log(d)} 
					/>
					<br/>
				<Code language="javascript" style={darcula}>
{`<Calendar 
	defaultValue="1400-6-5" // Default Format is: YYYY-M-D
	onChange={d => console.log(d)} 
/>`}
				</Code>

				<br/>

				<h2>۳.۲. فرمت دلخواه</h2>
				<Calendar 
					className="mx-auto" 
					defaultValue="5 6 1400"
					format="D M YYYY "
					onChange={d => console.log(d)} 
					/>
					<br/>
				<Code language="javascript" style={darcula}>
{`<Calendar 
	defaultValue="5 6 1400" 
	format="D M YYYY" 
	onChange={d => console.log(d)} 
/>`}
				</Code>
				<a href="https://momentjs.com/docs/#/parsing/string-format/" target="_blank">تمام فرمت ها را ببینید</a>

				<br/>

				<h2>۳.۳. محدود کردن بازه</h2>
				<Calendar 
					className="mx-auto" 
					defaultValue="1400-11-15"
					min="1400-11-5"
					max="1400-11-25"
					onChange={d => console.log(d)} 
					/>
					<br/>
				<Code language="javascript" style={darcula}>
{`<Calendar 
	defaultValue="1400-11-15"
	min="1400-11-5"
	max="1400-11-25"
	onChange={d => console.log(d)} 
/>`}
				</Code>
				<br/>

				<h2>۳.۴ تغییر سال های تولیدی</h2>
				<Calendar 
					className="mx-auto" 
					nextYears={10}
					prevYears={0}
					onChange={d => console.log(d)} 
					/>
					<br/>
				<Code language="javascript" style={darcula}>
{`<Calendar 
	nextYears={10} // default is 0
	prevYears={0} // default is 10
	onChange={d => console.log(d)} 
/>`}
				</Code>
				<br/>

				<h2>۳.۵ اندازه کوچک</h2>
				<Calendar 
					className="mx-auto" 
					small={true}
					onChange={(d, dateObject) => console.log(d, dateObject)} 
					/>
					<br/>
				<Code language="javascript" style={darcula}>
{`<Calendar
	small={true}
	onChange={(d, dateObject) => console.log(d, dateObject)} // check browser console
/>`}
				</Code>

				<br/>


				<h2>۴. انتخاب بازه</h2>
				<Calendar 
					className="mx-auto" 
					type="range"
					defaultValue={["1400-11-17", "1400-11-20"]}
					onChange={d => console.log(d)} 
					/>
					<br/>
				<Code language="javascript" style={darcula}>
{`<Calendar 
	type="range" // default is \`standard\`
	defaultValue={["1400-11-17", "1400-11-20"]}
	onChange={d => console.log(d)} // check browser console
/>`}
				</Code>
				<br/>


				<br/>
				<h2>۵. انتخاب کننده تاریخ</h2>
				<Text>
					این کامپوننت تمام ویژگی‌های تقویم را هم پشتیبانی می کند.
				</Text>
				<DatePicker 
					className="mx-auto"
					defaultValue="1400-12-27"
					onChange={d => console.log(d)} 
					calendarPosition='top-right'
				/>
				<br/>
				<Code language="javascript" style={darcula}>
					{
`import { DatePicker } from 'react-fa-datepicker'

<DatePicker
	defaultValue="1400-12-27"
	onChange={d => console.log(d)} 
	calendarPosition='top-right' // top-right | top-left | top-center | bottom-right | bottom-center | bottom-left
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
