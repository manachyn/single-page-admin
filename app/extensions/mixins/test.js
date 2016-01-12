// Test mixin
//view.mixedInFunction();
var samefunc = function() {
    console.log('samefunc');
}
var obj = {
    test1: 'test',
    testobj: {prop1: 'prop1', prop2: 'prop2'},
    constructor: function(){},
    testarr: [1,3,5],
    testfunc: function() {
        console.log('func');
        return 1;
    },
    samefunc: samefunc
};
var mixed = IM.mixin(
    obj,
    {
        test1: 'test',
        testobj: {prop1: 'prop11', prop2: 'prop22', prop3: 'prop33'},
        testarr: [6],
        testfunc: function() {
            console.log('func2');
            return 2;
        }
    },
    {
        test2: 'test2',
        constructor: function(){},
        testarr: [2,4],
        samefunc: samefunc
    }
);

//RESULT OBJECT

/*
    test1
    "test"

    test2
    "test2"

    testarr
        [2, 4, 6, 1, 3, 5]

    testobj
    Object { prop1="prop1", prop2="prop2", prop3="prop33"}

    constructor
    function()

    samefunc
    function()

    testfunc
    function()
*/

// OUTPUT

//func
//func2
//2
console.log(mixed.testfunc());

//samefunc
//undefined
console.log(mixed.samefunc());
