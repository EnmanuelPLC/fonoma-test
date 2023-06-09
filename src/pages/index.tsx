import Head from 'next/head'
import {Autocomplete, Box, Button, Card, TextField, Typography} from "@mui/material";
import {styled} from "@mui/system";
import {useState} from "react";
import {GetServerSideProps} from "next";
import {getConversion, getCurrencies} from "../utils/fetch";

const CustomBox = styled(Box)({
	padding: '15rem 10rem 15rem 10rem',
});

const CustomCard = styled(Card)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '2rem',
});

const FieldGroup = styled("div")({
	display: 'flex',
	justifyContent: 'space-between',
	padding: '1.5rem',
	width: '100%'
})

const ResultArea = styled("div")({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '2rem',
	width: '100%',
	fontSize: 'x-large'
});

interface ICurrency {
	code: string
	label: string
}
interface IResult {
	result: string
	rate: string
}

interface IHomeProps {
	currencies: ICurrency[]
}

export default function Home({ currencies }: IHomeProps) {
	const [from, setFrom] = useState<ICurrency>(currencies[0]);
	const [to, setTo] = useState<ICurrency>(currencies[1]);
	const [amount, setAmount] = useState<string>('0');
	const [result, setResult] = useState<IResult>();
	
	const convert = () => {
		getConversion({ to: to?.code ?? '', from: from?.code ?? '', amount: amount ?? '0' }).then(async (res) => {
			let result = await res.json();
			setResult({
				rate: result.info.rate,
				result: result.result
			});
		})
	}
	
	return (
    <>
      <Head>
        <title>Currency Conversion Tool</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
	    <main>
		    <CustomBox>
			    <CustomCard>
				    <Typography sx={{fontSize: 'xx-large'}}>Currency Conversion Tool</Typography>
				    
				    <FieldGroup>
					    <Autocomplete
						    options={currencies}
						    renderInput={(params) => <TextField {...params} label={'From currency'} />}
						    sx={{ flex: '1' }}
						    onChange={(e, n) => {
									setFrom(n!)
						    }}
						    value={from}
					    />
					    <TextField
						    placeholder={'Enter amount'}
						    onChange={(e) => {
									setAmount(e.target.value);
						    }}
						    value={amount}
						    sx={{ margin: '0 1rem' }}
					    />
					    <Autocomplete
						    options={currencies}
						    renderInput={(params) => <TextField {...params} label={'To currency'} />}
						    sx={{ flex: '1' }}
						    onChange={(e, n) => {
							    setTo(n!)
						    }}
						    value={to}
					    />
				    </FieldGroup>
				    <Button variant="outlined" onClick={convert}>Convert</Button>
				    {result && <ResultArea>
					    <strong>Result: {result.result}</strong>
					    <strong>Rate: {result.rate}</strong>
						</ResultArea>}
					</CustomCard>
		    </CustomBox>
	    </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const data = await (await getCurrencies()).json();
	let arr = [];
	for (const [key, value] of Object.entries(data.symbols)) {
		arr.push({ code: key, label: value})
	}
	for (let i = 0; i < arr.length - 1; i++) {
		if (arr[i].label === arr[i+1].label) {
			arr.splice(i, 1);
		}
	}
	return {
		props: {
			currencies: arr
		},
	};
};
