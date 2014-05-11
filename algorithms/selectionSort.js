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
        for (var i = 0; i < num; i++) {
            var max = arr[i];
            for (var j = i + 1; j < num - i; j++) {
                if (arr[j] > max) {
                    max = arr[j];
                }
            }
        }
    } else {
        return;
    }
}
