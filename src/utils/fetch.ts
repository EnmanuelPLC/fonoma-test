let myHeaders = new Headers();
myHeaders.append("apikey", "40kbeseqeuI6Uv7bQ03YFDcdnhNYnjPJ");

interface IConversion {
	to: string,
	from: string,
	amount: string
}

export const getCurrencies = async () => {
	return await fetch("https://api.apilayer.com/exchangerates_data/symbols", {
		method: 'GET',
		redirect: 'follow',
		headers: myHeaders
	});
};

export const getConversion = async ({to, from, amount}: IConversion) => {
	return await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, {
		method: 'GET',
		redirect: 'follow',
		headers: myHeaders
	});
};
