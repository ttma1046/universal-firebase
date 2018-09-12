import 'zone.js/dist/zone-node';

import * as functions from 'firebase-functions';
import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
// import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';


// enableProdMode();

const document = fs.readFileSync(path.resolve(__dirname + '/dist/browser/index.html'), 'utf8');
const { AppServerModuleNgFactory } = require(__dirname + '/dist/server/main');

const app = express();

app.get('**', (req, res) => {
    const url = req.path;
    renderModuleFactory(AppServerModuleNgFactory, {
        url, document
    }).then(html => {
        res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
        res.status(200).send(html);
    });
});

export let ssrapp = functions.https.onRequest(app);


