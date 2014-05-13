function TestArray(length) {
    if (length >= 0) {
        var result = [];
        for (var i = 0; i < length; i++) {
            result.push(Math.floor(Math.random() * length));
        }
        return result;
    }
}

function selectionSort(arr, verbose) {
    if (Object.prototype.toString.call(arr).indexOf('Array') > 0 && arr.length > 0) {
        var num = arr.length;
        var temp;
        var result = [];
        for (var i = 0; i < num - 1; i++) {
            var min = arr[i];
            for (var j = 0; j < num - 1; j++) {
                if (arr[j] < min) {
                    min = arr[j];
                }
            }

            if (verbose)
            console.log(arr);
        }
    } else {
        return;
    }
}
