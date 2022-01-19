# react-fa-datepicker

> Persian Calendar and DatePicker for React

[Online Demo](https://alirezahs1.github.io/react-fa-datepicker/)

[![NPM](https://img.shields.io/npm/v/react-fa-datepicker.svg)](https://www.npmjs.com/package/react-fa-datepicker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-fa-datepicker
```

## Usage

```jsx
import { useState } from 'react';
import { Calendar, DatePicker } from 'react-fa-datepicker';

const MyComponent = () => {

	const [selectedDate, setSelectedDate] = useState("1377-12-08");

	return (
		<DatePicker
			format="YYYY-M-D"
			defaultValue={selectedDate}
			onChange={(d) => setSelectedDate(d)}
			/>
	)
}

```

## License

MIT © [alirezahs1](https://github.com/alirezahs1)
