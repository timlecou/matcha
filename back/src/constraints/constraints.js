
function IsDefined(value, name) {
    if (value === undefined) {
        throw new Error(`${name} is undefined`);
    }
}

function IsNotEmpty(value, name) {
    if (typeof value != 'string' || (typeof value == 'string' && value.length <= 0)) {
        throw new Error(`${name} is empty or not a string`);
    }
}

function IsString(value, name) {
    if (typeof value != 'string') {
        throw new Error(`${name} is not a string`);
    }
}

function IsNumber(value, name) {
    if (typeof value != 'number') {
        throw new Error(`${name} is not a number`);
    }
}

function IsBoolean(value, name) {
    if (typeof value != 'boolean') {
        throw new Error(`${name} is not a boolean`);
    }
}

function IsNotNull(value, name) {
    if (value == null) {
        throw new Error(`${name} is null`);
    }
}

module.exports = {
    IsDefined,
    IsNotEmpty,
    IsString,
    IsNumber,
    IsBoolean,
    IsNotNull
}