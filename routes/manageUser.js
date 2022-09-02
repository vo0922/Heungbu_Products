const express = require('express');
const router = express.Router();
const authUtil = require('../middlewares/auth').checkToken;
const member = require('../models/member')

/* GET manageUser page. */
router.get('/', async function(req, res, next) {
    const data = await member.find().exec();
    res.render('manageUser', { stateUrl: 'manageUser', data: data });
});

// 권한 회수 및 부여
router.patch('/', async function(req, res) {
    try {
        console.log(req.body);
        const update = await member.update({ emp_no: req.body.emp_no },
            {
                edit_auth : req.body.edit_auth,
                rent_auth : req.body.rent_auth,
                open_auth : req.body.open_auth
            });
        const data = await member.findOne({ emp_no: req.body.emp_no }).exec()
        res.status(201).json(data);
    } catch {
        res.status(400).json({ message: err.message });
    }
})

module.exports = router;