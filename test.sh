#! /usr/bin/env sh

nodekv -p 3001 &
nodekv -p 3002 &
nodekv -p 3003 &
nodekv -p 3004 &

sleep 2
curl 'http://localhost:3003/set?key=1&value=ok1234'

curl 'http://localhost:3001/get?key=1'
curl 'http://localhost:3002/get?key=1'
curl 'http://localhost:3003/get?key=1'
curl 'http://localhost:3004/get?key=1'