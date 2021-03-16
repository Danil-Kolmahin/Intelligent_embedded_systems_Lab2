const end = document.getElementById('target')

const writeDescription = (text) => {
    end.before(document.createElement('br'))
    end.before(document.createElement('h1').title = text)
    end.before(document.createElement('br'))
}

writeDescription('discreteFourierTransformation')
end.before(new Lab1Graph(document.createElement('canvas')).drawFunction({
    f: DFTFunc, dotty: false,
    startX: 1,
    finishX: 89,
}).getCanvas())

writeDescription('quickDiscreteFourierTransformation')
end.before(new Lab1Graph(document.createElement('canvas')).drawFunction({
    f: quickDFTFunc, dotty: false,
    startX: 1,
    finishX: 89,
}).getCanvas())