# react-fa-datepicker

> Persian Calendar and DatePicker for React

[Online Demo](https://alirezahs1.github.io/react-fa-datepicker/)

[![NPM](https://img.shields.io/npm/v/react-fa-datepicker.svg)](https://www.npmjs.com/package/react-fa-datepicker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-fa-datepicker
```

## Demo
[Online Demo](https://alirezahs1.github.io/react-fa-datepicker/)

![React Farsi Calendar and Date Picker](https://github.com/alirezahs1/react-fa-datepicker/blob/master/example/public/demo.gif?raw=true)


## Usage

```jsx
import { useState } from 'react';
import { Calendar, DatePicker } from 'react-fa-datepicker';

const MyComponent = () => {

	const [selectedDate, setSelectedDate] = useState("1400/12/27");

	return (
		<DatePicker 
			defaultValue={selectedDate}
			format="YYYY/M/D" 
			onChange={(selectedDate, dateObject) => setSelectedDate(selectedDate)} 
			prevYears={10} 
			nextYears={0}
			calendarPosition='bottom-right'
		/>
	)
}

```

## License

MIT © [alirezahs1](https://github.com/alirezahs1)
