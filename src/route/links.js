const { request } = require('express');
const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../lib/auth');

const pool = require('../database');

router.get('/add', isLoggedIn, (req, res) =>{
    res.render("links/add");
})

router.post('/add', isLoggedIn, async (req, res) => {
    const { titulo, enlace, description} = req.body;
    const newLink = {
        titulo,
        enlace,
        description,
        user_id: req.user.id
    };

    console.log(newLink);
    await pool.query('insert into links set ?', [newLink])
    req.flash('success', 'Link guardado correctamente')
    res.redirect('/links');
})

router.get('/', isLoggedIn, async(req, res) => {
    const links = await pool.query('select * from links where user_id = ?', [req.user.id]);
    console.log(links);
    res.render('links/list', {links})
})

router.get('/delete/:id', isLoggedIn, async(req, res) => {
    const {id} = req.params;
    await pool.query('delete from links where id=?', [id])
    req.flash('success', 'Enlace removido satisfactoriamente')
    res.redirect('/links')
})

router.get('/edit/:id', isLoggedIn, async(req,res) => {
    const {id} = req.params;
    const link = await pool.query('select * from links where id = ?', [id]);
    console.log(link[0]);
    res.render('links/edit',{link: link[0]});
})

router.post('/edit/:id', isLoggedIn, async(req, res) =>{
    const {id} = req.params;
    const {titulo, enlace, description} = req.body;
    const newLink = {
        titulo,
        enlace,
        description
    }
    console.log(newLink);
    await pool.query('update links set ? where id = ?', [newLink, id]);
    req.flash('success','Link Editado satisfactoriamente')
    res.redirect('/links')
})


module.exports = router;