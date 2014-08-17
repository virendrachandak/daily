/**
 *@description: 测试类
 */
function CArray(numElements) {
    var dataStore     = [];
    var pos = 0;

    for (var i = 0; i < numElements; ++i) {
        dataStore[i] = i;
    }
    return {
        pos : pos,
        dataStore: dataStore,
        numElements: numElements,
        setData: function() {
            for (var i = 0; i < this.numElements; ++i) {
                this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
            }
        },
        clear: function () {
            for (var i = 0; i < this.dataStore.length; i++) {
                this.dataStore[i] = 0;
            }
        },
        insert: function(element) {
            this.dataStore[this.pos++] = element;
        },
        swap: function(arr, index1, index2) {
            var temp = arr[index1];
            arr[index1] = arr[index2];
            arr[index2] = temp;
        },
        /**
        *@description: bubbleSort
        */
        bubbleSort: function(verbose) {
            var numElements = this.dataStore.length;
            var temp;
            for (var outer = numElements; outer >= 2; --outer) {
                for (var inner = 0; inner <= outer - 1; ++inner) {
                    if (this.dataStore[inner] > this.dataStore[inner + 1]) {
                        this.swap(this.dataStore, inner, inner + 1);
                    }
                }
                if (verbose)
                console.log(this.dataStore);
            }
        },
        selectionSort: function(verbose) {
            var min, temp;
            for (var outer = 0; outer <= this.dataStore.length - 2; ++outer) {
                min = outer;
                for (var inner = outer + 1; inner <= this.dataStore.length - 1; ++inner) {
                    if (this.dataStore[inner] < this.dataStore[min]) {
                        min = inner;
                    }
                }
                this.swap(this.dataStore, outer, min);
                if (verbose)
                console.log(this.dataStore);
            }
        },
        insertionSort: function(verbose) {
            var temp, inner;
            for (var outer = 1; outer <= this.dataStore.length - 1; ++outer) {
                temp = this.dataStore[outer];
                inner = outer;
                while (inner > 0 && (this.dataStore[inner - 1] >= temp)) {
                    this.dataStore[inner] = this.dataStore[inner - 1];
                    --inner;
                }
                this.dataStore[inner] = temp;
                if (verbose)
                console.log(this.dataStore);
            }
        }
    };
}

/**
 *@description: demo of using CArray
 */
console.log('CArray usage demo');
var numElements = 10;
var mynums = new CArray(numElements);
mynums.setData();
console.log(mynums.dataStore);

/**
 *@description: demo of using bubbleSort
 */
console.log('demo of using bubbleSort');
mynums.setData();
console.log(mynums.dataStore);
mynums.bubbleSort(true);
console.log(mynums.dataStore);

/**
 *@description: demo of using selectionSort
 */
console.log('demo of using selectionSort');
mynums.setData();
console.log(mynums.dataStore);
mynums.selectionSort(true);
console.log(mynums.dataStore);


/**
 *@description: demo of using insertionSort
 */
console.log('demo of using insertionSort');
mynums.setData();
console.log(mynums.dataStore);
mynums.insertionSort(true);
console.log(mynums.dataStore);
