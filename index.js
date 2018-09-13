var args = require('node-args');
var mqtt = require('mqtt')
var express = require('express')
app = express()
p  = args.p
if(!p){
    console.log('mmkv -p [port]')
    return
}
var client  = mqtt.connect('mqtt://am.appxc.com')
var topic = 'mmkv'


client.on('connect', function () {
    client.subscribe(topic, function (err) {

    })
})

client.on('message', function (topic, message) {
    var msg = JSON.parse(message)
    if(msg.key){
        storage [msg.key] = msg.value
    }
})


storage = {}

app.use('/set',function (req, res) {
    var key = req.query.key
    var value = req.query.value
    if(key){
        storage[key] = value
        client.publish(topic, JSON.stringify({key:key,value:value}))
        res.end('ok')
    }
    res.end('!!!err')
})

app.use('/get',function (req, res) {
    var key = req.query.key
    if(key){
        res.end(storage[key])
    }
    res.end('!!!err')
})


app.listen(p)

console.log('[nodekv] listen localhost:'+p)