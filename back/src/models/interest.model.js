const { builtinModules } = require('module');
const { Pool, Client } = require('pg')

const pool = new Pool()

class   Interest
{
    id;
    name;

    constructor (param) {
        Object.assign(this, param)
    }

    insert () {
        try {
            pool.query('INSERT INTO "Interest" (name) VALUES ($1)',
            [this.name],
            (error) => {
                if (error) throw error
            })
        }
        catch (err) {
            console.error(err)
        }
    }
};

module.exports = {
    Interest
} 