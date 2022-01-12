const email_existence = require('email-existence');


function IsDefined (value, name) {
    if (value === undefined) {
        throw new Error(`${name} is undefined`);
    }
}

function IsNotEmpty (value, name) {
    if (typeof value != 'string' || (typeof value == 'string' && value.length <= 0)) {
        throw new Error(`${name} is empty or not a string`);
    }
}

function IsString (value, name) {
    if (typeof value != 'string') {
        throw new Error(`${name} is not a string`);
    }
}

function IsNumber (value, name) {
    if (typeof value != 'number') {
        throw new Error(`${name} is not a number`);
    }
}

function IsBoolean (value, name) {
    if (typeof value != 'boolean') {
        throw new Error(`${name} is not a boolean`);
    }
}

function IsNotNull (value, name) {
    if (value == null) {
        throw new Error(`${name} is null`);
    }
}

function IsOnlyNumeric (value, name) {
    if (/^[0-9]+$/.test(value) == false) {
        throw new Error(`${name} is not only numeric`);
    }
}

function IsNotOnlyNumeric (value, name) {
    if (/^[0-9]+$/.test(value) == true) {
        throw new Error(`${name} is only numeric`);
    }
}

function IsAlphanumeric (value, name) {
    if (/^[a-zA-Z0-9.\-_]+$/.test(value) == false) {
        throw new Error(`${name} is not alphanumeric`);
    }
}

function HasGoodPseudoSize (value, name) {
    if (value.length >= 17) {
        throw new Error(`${name} is too long ( > 16 characters)`);
    } else if (value.length <= 3) {
        throw new Error(`${name} is too short ( < 4 characters)`);
    }
}

function HasGoodPasswordSize (value, name) {
    if (value.length < 8) {
        throw new Error(`${name} is too short ( < 8 characters)`);
    }
}

function IsOnlyAlpha (value, name) {
    if (/^[a-zA-Z]+$/.test(value) == false) {
        throw new Error(`${name} is not only alpha`);
    }
}







function IsAValidEmail(value, name) {       //takes too much time, need to find a way to wait the function to finish
    try {
        email_existence.check(value, (error, res) => {
            if (error) throw error;
            if (res == false) {
                throw new Error(`${name} is not a valid email`);
            }
        });
    }
    catch (err) {
        console.error(err);
    }
}

module.exports = {
    IsDefined,
    IsNotEmpty,
    IsString,
    IsNumber,
    IsBoolean,
    IsNotNull,
    IsOnlyNumeric,
    IsAlphanumeric,
    IsNotOnlyNumeric,
    IsAValidEmail,
    HasGoodPseudoSize,
    HasGoodPasswordSize,
    IsOnlyAlpha
}