const {Router} = require('express')
const router = Router()

const pool = require('../database')

router.get('/', async (req, res) => {
    const messages = await req.consumeFlash('info')
    res.render('mainPage', {messages})
})

router.get('/allTasks',  async (req, res) => {
    await pool.query('SELECT * FROM tasks', (err, rows) => {
       if(!err) {
           res.render('allTasks', {data:rows})
       }else {
           console.log(err);
       }
   })
})

router.post('/addTask', async (req, res) => {
    const { title, subtitle, description } = req.body
    const data = {
        title,
        subtitle, 
        description
    }
    await pool.query('INSERT INTO tasks set ?', (data), (err) => {
        if (!err) {
            req.flash('send', 'La tasca s`afegit a la teva llista')
            res.redirect('/allTasks')
        }else {
            console.log(err);
        }
    })
    
})

router.get('/addTask', async (req, res) => {
    res.render('formPage')
})

router.get('/editTask/:id', async (req, res) => {
    const {id} = req.params
    await pool.query('SELECT * FROM tasks WHERE id = ?', id, (err, rows) => {
        if (!err) {
            res.render('editPage', {data: rows[0]})
        }else {
            console.log(err)
        }
    })
})

router.post('/updateTask/:id', async (req, res) => {
    const {id} = req.params
    const data = req.body
    await pool.query(`UPDATE tasks set ? where id = ?`,[data, id], (err, rows) => {
        if (!err) {
            res.redirect('/allTasks')
        }else {
            console.log(err)
        }
    })
    
})

router.get('/deleteTask/:id', async (req, res) => {
    const {id} = req.params
    await pool.query('DELETE FROM tasks WHERE id = ?', id, (err) => {
        if(!err) {
            res.redirect('/allTasks')
        }else {
            console.log(err);
        }
    })
})

router.get('/flash', async (req, res) => {
    await req.flash('info', 'Flash is back!')
    res.redirect('/')
})
 
module.exports = router