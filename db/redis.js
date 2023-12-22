var redis = require("redis");
var process = require('process')
const { exec } = require('node:child_process');

let client;

async function _run() {
    console.log('Running Redis datasets...');
    exec('cat /db/data.txt | redis-cli --pipe', (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log('Redis completed...');
    });
}

async function _initDB() {
    client = redis.createClient();
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    _run();
}

async function _cleanup() {
    await client.flushAll();
    console.log('\ncleanup completed...')
}

async function setNX(key = '', value = '') {
    await client.setNX(key, value);
}

async function qString(key = '') {
    return await client.get(key);
}

async function qHashAll(key = '', field = '') {
    return await client.hGetAll(key);
}

async function clean() {
    console.log('\nEXIT SIGNAL RECEIVED. \nPerforming redis cleanup...');
    await _cleanup();
    console.log('\nExisting express...');
    process.exit(0);
}

function redisConnect() {
    _initDB();
    setNX('title', 'zro');

    process.on('SIGTERM', () => {
        clean();
    });

    process.on('SIGINT', () => {
        clean();
    });
}

module.exports = { redisConnect, qString, qHashAll };