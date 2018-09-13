var args = require('node-args');
var mqtt = require('mqtt')
var express = require('express')
app = express()
p  = args.p
g = args.g

if(!p){
    console.log('mmkv -p [port] -g [uuid group]')
    return
}

if(!g || g.length<32){
    console.log('mmkv -p [port] -g [uuid group]')
    return
}


var client  = mqtt.connect('mqtt://am.appxc.com')
var topic = 'mmkv'+g


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
        res.send({success:true,key:key,value:value})
    }
    res.send({success:false})
})

app.use('/get',function (req, res) {
    var key = req.query.key
    if(key){
        var value = storage[key]
        res.send({success:true,key:key,value:value})
    }
    res.send({success:false})
})


app.listen(p)

console.log('[mmkv] listening localhost:'+p)