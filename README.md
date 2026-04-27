# Wedding Website API
This database is used with my Wedding Website Project. That project is linked [here](https://github.com/abelje/abel-wedding).

## Locations Endpoint
Holds data required to populate location cards on the locations webpage.

Called using `/locations`.

## RSVP Endpoint
Holds data required to populate the amount of people rsvp'd from a google form.

Requirements to get Google Cloud to work for Google Forms API:
    
- Follow documentation on how to create a new Project on Google Cloud ([info](https://developers.google.com/workspace/guides/create-project)) and enable apis. For example, Forms API is [here](https://developers.google.com/workspace/guides/enable-apis)
- Set up a Service Account under IAM & Admin > Service Accounts.
- Insert the json file generated and name it 'service-account.json' and input it into the routes folder.
- Get the Form Id on the Google Form by copying the string before the '/viewform' in the address bar after publishing the form. Insert this into get_responses.js as the variable 'formID'.

Called using `/rsvp`.
## Registry Endpoint
Holds data stored for registry links for the registry webpage.

Called using `/registry`.