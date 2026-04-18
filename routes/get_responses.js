const express = require('express');
const router = express.Router();
const db = require('../db/database');
const path = require('node:path');

const { forms } = require('@googleapis/forms');
const { google } = require('googleapis');

// Google Form ID
const formID = '1WgMACOSRLxKKpJju6RJ9fxVv6mStaXZ5stcm22iGTtg';

// Authenticate once
async function getAuth() {
    const authClient = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, 'service-account.json'),
        scopes: [
            'https://www.googleapis.com/auth/forms.responses.readonly'
        ],
    });

    const client = await authClient.getClient();
    return client;
}

async function getAllResponses() {
    const auth = await getAuth();
    console.log("Successfully authorized!")

    const formsClient = forms({
        version: 'v1',
        auth
    });

    const result = await formsClient.forms.responses.list({
        formId: formID
    });

    return result.data;
}

router.get('/formsapi', async (req, res) => {
    try {
        const data = await getAllResponses();

        const responses = data.responses

        // delete data from table
        db.prepare(`DELETE FROM rsvps`).run();
        db.prepare(`DELETE FROM sqlite_sequence WHERE name='rsvps'`).run();

        for (const response of responses) {

            const email = response["respondentEmail"];
            const people = response["answers"]["5d838dad"]["textAnswers"]["answers"]["0"]["value"];
            // Insert the amount rsvp
            const result = db.prepare(`
            INSERT INTO rsvps (email, people)
            VALUES (?, ?)
        `).run(email, people);
        }

        // return Google Form API Data
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching google form data: " + err.message });
    }
});

// get database rsvps data
router.get('/', (req, res) => {
    try {
        const responses = db.prepare(`
            SELECT id, email, people
            FROM rsvps
            ORDER BY id
`       ).all();

        res.json(responses);
    }
    catch (error) {
        res.status(500).json({error: 'Failed to fetch rsvp: ' + error});
    }
})

module.exports = router;