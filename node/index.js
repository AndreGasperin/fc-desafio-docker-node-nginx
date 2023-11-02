const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

app.get('/', (req, res) => {
    try {
        
        const mysql = require('mysql')
        const connection = mysql.createConnection(config)
        let sql = `create table if not exists people (name varchar(200) not null)`
        connection.query(sql)
        sql = `INSERT INTO people(name) values('Andre')`
        connection.query(sql)
        
        sql = 'select name from people'
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            res.send(`<h1>Full Cycle</h1>
            <ul>
                ${results.map(item => `<li>${item.name}</li>`).join("")}
            </ul>`)
        })
        connection.end()
    } catch (error) {
        throw new Error(error)
    }
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})