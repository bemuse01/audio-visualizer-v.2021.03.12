const METHOD = {
    normalize(x, a, b, min, max){
        return (b - a) * (x - min) / (max - min) + a 
    }
}