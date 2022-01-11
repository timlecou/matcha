var Constraints = require('../constraints/constraints');

class   Validator
{
    object;
    constraints = [];

    setObject(object) {
        this.object = object;
    }

    setConstraints(name, ...constraints) {
        this.constraints[name] = constraints;
    }

    validate() {
        for (let key in this.object) {
            if (this.constraints[key] == undefined)
                continue ;
            for (let constraint of this.constraints[key]) {
                constraint(this.object[key], key);
            }
        }
    }
}

module.exports = {
    Validator
}