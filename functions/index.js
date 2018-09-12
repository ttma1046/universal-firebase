"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-node");
const functions = require("firebase-functions");
const express = require("express");
const path = require("path");
const fs = require("fs");
// import { enableProdMode } from '@angular/core';
const platform_server_1 = require("@angular/platform-server");
// enableProdMode();
const document = fs.readFileSync(path.resolve(__dirname + '/dist/browser/index.html'), 'utf8');
const { AppServerModuleNgFactory } = require(__dirname + '/dist/server/main');
const app = express();
app.get('**', (req, res) => {
    const url = req.path;
    platform_server_1.renderModuleFactory(AppServerModuleNgFactory, {
        url, document
    }).then(html => {
        res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
        res.status(200).send(html);
    });
});
exports.ssrapp = functions.https.onRequest(app);
