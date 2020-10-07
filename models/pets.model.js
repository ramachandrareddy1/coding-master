let methods = {};
methods.petsModel = {
    name: { type: "string", required: true },
    age: { type: "number", required: true },
    colour: { type: "string", required: true }
}

module.exports = methods;