# Wedding Website API
This database is used with my Wedding Website Project. That project is linked [here](https://github.com/abelje/abel-wedding).

# Endpoints
- GET '/api/locations/' - Gets all locations
- GET '/api/locations/{id}' - Gets location by id
- POST '/api/locations/' - insert new location
    ```json
    {
    "title": "",
    "name": "",
    "address": "",
    "time": "",
    "image": "google maps iframe",
    "description": ""
    }
    ```
- PATCH '/api/locations/{id}' - change description or time for given location
    ```json
    {
    "description": "",
    "time": ""
    }
    ```

- GET '/api/registry/' - Gets all registry websites
- GET '/api/registry/{id}' - Gets registry website by id
- POST '/api/registry/' - insert new registry
    ```json
    {
    "name": "",
    "link": ""
    }
    ```

- GET '/api/rsvp/' - returns a list of emails and amounts of people
    ```json
    [
      {
        "id": 1,
        "email": "example@gmail.com",
        "people": 1
      }
    ]
    ```

- GET '/api/rsvp/formsapi' - returns Google Forms json and updates database with people and email

## Setup
Requirements to get Google Cloud to work for Google Forms API:
    
- Follow documentation on how to create a new Project on Google Cloud ([info](https://developers.google.com/workspace/guides/create-project)) and enable apis. For example, Forms API is [here](https://developers.google.com/workspace/guides/enable-apis)
- Set up a Service Account under IAM & Admin > Service Accounts.
- Insert the json file generated and name it 'service-account.json' and input it into the routes folder.
- Get the Form Id on the Google Form by copying the string before the '/viewform' in the address bar after publishing the form. Insert this into get_responses.js as the variable 'formID'.