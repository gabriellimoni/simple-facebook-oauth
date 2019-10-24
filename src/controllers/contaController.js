const express = require('express')
const router = express.Router()

const Conta = require('../models/contaModel.js')

const config = require('../../config.json')
const axios = require('axios')

// [BEGIN endpoint01]
router.get('/:conta_id', async (req,res) => {
    const { conta_id } = req.params

    let conta = new Conta(conta_id)
    if (conta.id) return res.send(conta)

    // OAUTH REQUEST
    const CLIENT_ID = config.client_id, 
            REDIRECT_URI = `http://localhost:3000/conta/cadastro/${conta_id}`, 
            STATE = `${Date.now()}`
    return res.redirect(
        `https://www.facebook.com/v3.3/dialog/oauth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`
    )
})
// [END endpoint01]


// [BEGIN endpoint02]
router.get('/cadastro/:cadastro_id', async (req,res) => {
    const { cadastro_id } = req.params,
            { code, state } = req.query
    
    if (!code || !state) {
        return res.status(400).send("Missing query parameters 'code' or 'state'.")
    }

    // [BEGIN fisrt-request]
    const CLIENT_ID = config.client_id,
            REDIRECT_URI = `http://localhost:3000/conta/cadastro/${cadastro_id}`,
            SECRET = config.client_secret
    const first_url = 
        `https://graph.facebook.com/v3.3/oauth/access_token?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}&client_secret=${SECRET}&code=${code}`
    
    const { data: first_response } = await axios.post(first_url)
    // [END fisrt-request]
    
    // [BEGIN second-request]
    const INPUT_TOKEN = first_response.access_token,
            ACCESS_TOKEN = config.accesstoken
    const second_url = 
        `https://graph.facebook.com/debug_token?input_token=${INPUT_TOKEN}&access_token=${ACCESS_TOKEN}`
    
    const { data: second_response } = await axios.get(second_url)
    // [END second-request]
    
    // [BEGIN third-request]
    const ID_USUARIO_FACEBOOK = second_response.data.user_id
    const third_url = 
        `https://graph.facebook.com/${ID_USUARIO_FACEBOOK}/?access_token=${INPUT_TOKEN}`
    const { data: third_response } = await axios.get(third_url)
    // [END third-request]

    const conta = new Conta(cadastro_id, third_response.name, third_response.id)
    await conta.add()

    return res.redirect(`http://localhost:3000/conta/${cadastro_id}`)
})
// [END endpoint02]

module.exports = app => app.use('/conta', router);
