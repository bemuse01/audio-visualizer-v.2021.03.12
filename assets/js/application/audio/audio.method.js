AUDIO.method = {
    median(arr){
        const temp = [...arr].sort()
        const mid = Math.ceil(temp.length / 2)
        const median = temp.length % 2 === 0 ? (temp[mid] + temp[mid - 1]) / 2 : temp[mid - 1]
        return median
    }
}