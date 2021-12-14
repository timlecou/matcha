const { builtinModules } = require('module');
const { Pool, Client } = require('pg')

const pool = new Pool()

class   Photo
{
    id;
    user_id;
    path;

    constructor (param) {
        Object.assign(this, param)
    }

    insert () {
        try {
            pool.query('INSERT INTO "Photo" (user_id, path) VALUES ($1, $2)',
            [this.user_id, this.path],
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
    Photo
} 