# Set Up Google Forms API

## Developing in Google Workspace

[https://developers.google.com/workspace/guides/get-started](https://developers.google.com/workspace/guides/get-started)

1. Create a Google Cloud Project. [info](https://developers.google.com/workspace/guides/create-project)
   - Go to Google Cloud console
     - Menu > IAM & Admin > Create a Project

2. Enable Google Workspace APIs [info](https://developers.google.com/workspace/guides/enable-apis)
   - In the Google Cloud console, go to Menu > APIs & Services > Library > Google Workspace.

   - Search Google Forms API, and click enable

3. Configure OAuth consent to inform what data is accessed. [info](https://developers.google.com/workspace/guides/configure-oauth-consent)
   - Fill out for external

4. Set up a Service Account under IAM & Admin > Service Accounts
5. Make a key for the Service Account under the keys tab in the new Service Account.
    - Insert the key inside the routes folder of the database
6. Create the Google Form you want to share with the service. Copy and paste the email created under the service account and give it editing rights.
7. Get the Form Id on the Google Form by copying the string before the '/viewform' in the address bar after publishing the form.
   - Insert the Form Id into your program

- npm install @googleapis/forms
- npm install @google-cloud/local-auth
- npm install google-apis