    
const prompts = require('prompts')


let wallet
let example = 'hi'
const theOdds = 50

function randomNumber() {
	return (Math.random() * 100).toFixed(0)
}

function welcomeAndPlay() {
	prompts({
		type: 'text',
		name: 'value',
		message: 'Are you here to play Roulette?',
		validate: (answer) => (answer === 'no' ? `Sorry, that is the only game at this Casino.` : true)
	})
		.then((response) => {
			if (response.value === 'yes') {
				getBalanceBeforeYouPlay()
			}
		})
}

function play() {
	prompts({
		type: 'text',
		name: 'value',
		message: 'What color would you like to bet on? Red or Black',
		validate: (answer) => (answer === 'Red' ? 'Okay lets play' : true)
	}).then(() => {
		const number = randomNumber()
		if (number > theOdds) {
			wallet = wallet * 2
			console.log('Congrats, you doubled your money', `now you have $ ${wallet} dollars`)
			playAgain()
		} else {
			wallet = wallet - wallet
			console.log('Sorry, you lost', `now you have $ ${wallet} dollars`)
			addMoreFunds()
		}
	})
}

function addMoreFunds() {
	prompts({
		type: 'text',
		name: 'value',
		message: 'Would you like to add more money to your wallet to bet?',
		validate: (answer) => (answer === 'no' ? 'Okay sorry to see you go' : true)
	})		.then((response) => {
			if (response.value === 'yes') {
				getBalanceBeforeYouPlay()
			}
		})
}

function playAgain() {
	prompts({
		type: 'text',
		name: 'value',
		message: 'Would you like play again?'
	}).then((answer) => {
		if (answer.value === 'yes') {
			getBalanceBeforeYouPlay();
		} else {
			console.log('Sorry, come again')
		}
	})
}

function getBalanceBeforeYouPlay() {
	prompts({
		type: 'number',
		name: 'value',
		message: 'How much money would you like to add to your wallet?',
		validate: (number) => (number < 10 ? 'Stop being cheap, $ 10.00 minumum' : true)
	}).then((result) => {
		wallet = result.value
		console.log(`Your wallet now has $${wallet} dollars`)
		play()
	})
}

welcomeAndPlay()