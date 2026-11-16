// ==================================
// PROBLEM 1
// ==================================

function deepEqual(objA, objB) {

    if (Object.is(objA, objB)) {
        return true;
    }

    if (
        objA === null ||
        objB === null ||
        typeof objA !== 'object' ||
        typeof objB !== 'object'
    ) {
        return false;
    }

    if (Array.isArray(objA) !== Array.isArray(objB)) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    return keysA.every(key =>
        Object.hasOwn(objB, key) &&
        deepEqual(objA[key], objB[key])
    );
}


// Test cases
console.log(deepEqual(
    { a: 1, b: { c: 2 } },
    { a: 1, b: { c: 2 } }
)); // true

console.log(deepEqual(
    { a: 1, b: { c: 2 } },
    { a: 1, b: { c: 3 } }
)); // false

console.log(deepEqual(
    { a: 1 },
    { a: 1, b: 2 }
)); // false



// ==================================
// PROBLEM 2 - OBJECT DIFF
// ==================================

function diffObjects(oldObj, newObj) {

    const added = {};
    const removed = {};
    const changed = {};

    // Find added properties
    Object.keys(newObj).forEach(key => {
        if (!Object.hasOwn(oldObj, key)) {
            added[key] = newObj[key];
        }
    });

    // Find removed properties
    Object.keys(oldObj).forEach(key => {
        if (!Object.hasOwn(newObj, key)) {
            removed[key] = oldObj[key];
        }
    });

    // Find changed properties
    Object.keys(oldObj).forEach(key => {
        if (
            Object.hasOwn(newObj, key) &&
            oldObj[key] !== newObj[key]
        ) {
            changed[key] = {
                from: oldObj[key],
                to: newObj[key]
            };
        }
    });

    return {
        added,
        removed,
        changed
    };
}


// Example
const oldObj = {
    name: 'Setemi',
    role: 'Engineer',
    country: 'Jamaica'
};

const newObj = {
    name: 'Setemi',
    role: 'Senior Engineer',
    city: 'Kingston'
};

console.log(diffObjects(oldObj, newObj));

}




// ==================================
// PROBLEM 3 - DEEP FREEZE
// ==================================

function deepFreeze(obj) {

    Object.freeze(obj);

    Object.keys(obj).forEach(key => {

        if (
            obj[key] !== null &&
            typeof obj[key] === 'object' &&
            !Object.isFrozen(obj[key])
        ) {
            deepFreeze(obj[key]);
        }

    });

    return obj;
}


// Test case
const person = {
    name: 'Ada',
    details: {
        age: 21,
        address: {
            city: 'Lagos'
        }
    }
};

deepFreeze(person);

console.log(Object.isFrozen(person)); 
// true

console.log(Object.isFrozen(person.details)); 
// true

console.log(Object.isFrozen(person.details.address)); 
// true



// ==================================
// PROBLEM 4
// ==================================

// Solution goes here



// ==================================
// PROBLEM 5 - SCHEMA VALIDATOR
// ==================================

function validateSchema(obj, schema) {

    for (const key in schema) {

        if (!Object.hasOwn(obj, key)) {
            return false;
        }

        if (typeof obj[key] !== schema[key]) {
            return false;
        }

    }

    return true;
}


// Test case
const user = {
    name: 'Monsuroh',
    age: 24,
    isStudent: true
};

const userSchema = {
    name: 'string',
    age: 'number',
    isStudent: 'boolean'
};

console.log(validateSchema(user, userSchema));
// true

