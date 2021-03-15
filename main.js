const end = document.getElementById('target')

const writeDescription = (text) => {
    end.before(document.createElement('br'))
    end.before(document.createElement('h1').title = text)
    end.before(document.createElement('br'))
}

writeDescription('someFunc')
end.before(new Lab1Graph(document.createElement('canvas')).drawFunction({
    f: func1, dotty: false,
    finishX: 31,
}).getCanvas())