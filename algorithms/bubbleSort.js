function TestArray(length) {
    if (length >= 0) {
        var result = [];
        for (var i = 0; i < length; i++) {
            result.push(Math.floor(Math.random() * length));
        }
        return result;
    }
}

function BubbleSort(arr, verbose) {
    if (Object.prototype.toString.call(arr).indexOf('Array') > 0 && arr.length > 0) {
        var num = arr.length;
        var temp;
        console.log('Bubble Sort Started:');
        var start = new Date().getTime();
        for (var i = 0; i < num; i++) {
            for (var j = i + 1; j < num; j++) {
                if (arr[i] > arr[j]) {
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
            if (verbose)
            console.log(arr + '\n');
        }
        var end = new Date().getTime();
        console.log('Bubble Sort Ends. Time spent:' + (end - start));
        console.log(arr);
        return arr;
    } else {
        return;
    }
}
