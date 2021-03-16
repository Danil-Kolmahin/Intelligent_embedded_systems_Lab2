const discreteFourierTransformation = arrayX => {
    if (arrayX.length % 2 !== 0) arrayX.pop()
    const N = arrayX.length
    const tableW = []

    for (let i = 0; i < N / 2; i++) {
        const arg = -2 * Math.PI * i / N
        const sin = Math.sin(arg)
        const cos = Math.cos(arg)
        tableW[i] = [cos, sin]
        tableW[i + N / 2] = [-cos, -sin]
    }

    const result = []
    for (let p = 0; p < N; p++) {
        let realF = 0, imageF = 0
        for (let k = 0; k < N; k++) {
            realF += arrayX[k] * tableW[p * k % N][0]
            imageF += arrayX[k] * tableW[p * k % N][1]
        }
        result[p] = Math.sqrt(realF ** 2 + imageF ** 2)
    }

    return result
}

const quickDiscreteFourierTransformation = arrayX => {
    if (arrayX.length % 2 !== 0) arrayX.pop()
    const N = arrayX.length
    const tableW = []

    for (let i = 0; i < N / 2; i++) {
        const arg = -2 * Math.PI * i / N
        const sin = Math.sin(arg)
        const cos = Math.cos(arg)
        tableW[i] = [cos, sin]
        tableW[i + N / 2] = [-cos, -sin]
    }

    const result = []
    for (let p = 0; p <= N / 2; p++) {
        let realF = 0, imageF = 0
        for (let k = 0; k < N / 2; k++) {
            realF += arrayX[k] * tableW[p * k % N][0]
            realF += arrayX[N / 2 + k] * tableW[p * (N / 2 + k) % N][0]
            imageF += arrayX[k] * tableW[p * k % N][1]
            imageF += arrayX[N / 2 + k] * tableW[p * (N / 2 + k) % N][1]
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

const defaultArray = [
    104, 130, 128, 138, 120, 144, 150, 170, 170, 181, 170,
    185, 206, 204, 222, 211, 229, 245, 252, 261, 267, 289,
    292, 323, 393, 350, 350, 355, 380, 366, 347, 379, 373,
    391, 393, 423, 425, 420, 439, 448, 456, 471, 455, 480,
    482, 494, 498, 508, 529, 563, 542, 589, 591, 568, 563,
    571, 603, 587, 618, 608, 657, 622, 665, 634, 668, 682,
    666, 700, 724, 701, 715, 728, 733, 743, 727, 748, 814,
    775, 777, 802, 805, 830, 851, 821, 876, 848, 849, 904,
    902, 868, 895
]

const getFuncFromArray = (array) => (x) => array[x]

const DFTFunc = getFuncFromArray(discreteFourierTransformation(defaultArray).map(x => x / 100))

const quickDFTFunc = getFuncFromArray(quickDiscreteFourierTransformation(defaultArray).map(x => x / 100))