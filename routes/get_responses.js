const express = require('express');
const router = express.Router();
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

// Express route
router.get('/', async (req, res) => {
    try {
        const data = await getAllResponses();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching google form data: " + err.message });
    }
});

module.exports = router;