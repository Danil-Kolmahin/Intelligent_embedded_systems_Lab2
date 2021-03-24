import csv from './Lab1.csv'

const defaultArray = csv.map(el => el[1]).slice(1, csv.length - 1)

const discreteFourierTransformation = arrayX => {
	if (arrayX.length % 2 !== 0) arrayX.pop()
	const N = arrayX.length
	const result = []

	arrayX.forEach((_, p) => {
		let realF = 0, imageF = 0
		for (let k = 0; k < N; k++) {
			const arg = -2 * Math.PI * (p * k % N) / N
			realF += arrayX[k] * Math.cos(arg)
			imageF += arrayX[k] * Math.sin(arg)
		}
		result[p] = Math.sqrt(realF ** 2 + imageF ** 2)
	})

	return result
}

const quickDiscreteFourierTransformation = arrayX => {
	if (arrayX.length % 2 !== 0) arrayX.pop()
	const N = arrayX.length
	const result = []

	for (let p = 0; p <= N / 2; p++) {
		let realF = 0, imageF = 0
		for (let k = 0; k < N / 2; k++) {
			let arg = -2 * Math.PI * (p * k % N) / N
			realF += arrayX[k] * Math.cos(arg)
			imageF += arrayX[k] * Math.sin(arg)
			arg = -2 * Math.PI * (p * (N / 2 + k) % N) / N
			realF += arrayX[N / 2 + k] * Math.cos(arg)
			imageF += arrayX[N / 2 + k] * Math.sin(arg)
		}
		if (p === N / 2) {
			result[p] = Math.sqrt(realF ** 2 + imageF ** 2)
		} else {
			result[p] = Math.sqrt(realF ** 2 + imageF ** 2)
			result[N - p] = Math.sqrt(realF ** 2 + imageF ** 2)
		}
	}

	return result
}


const findDifference = (func1, func2, startX = 0, finishX = 100) => {
	const result = []
	const func1Res = func1(defaultArray)
	const func2Res = func2(defaultArray)
	for (let i = startX; i < finishX; i++) {
		result[i] = func1Res[i] - func2Res[i]
	}
	return x => result[x]
}

const getFuncFromArray = (array) => (x) => array[x]

export const DFTFunc = getFuncFromArray(discreteFourierTransformation(defaultArray).map(x => x / 100))

export const quickDFTFunc = getFuncFromArray(quickDiscreteFourierTransformation(defaultArray).map(x => x / 100))

export const diffFunc = findDifference(discreteFourierTransformation, quickDiscreteFourierTransformation)