# Brandon's Notes for Puppy Image Generator

**Foreward:** This technical test may have actually taken a bit longer to complete than I have originally anticipated because not having used class-based React Components and state constructor props since the start of Concordia Bootcamps (React Hooks was taught instead) had me spending half my time researching Hooks to class-based component equivalents and re-acquainting myself on using them again.

In addition, I am also probably going to be repeating some things I already added as comments in the codes I have changed in the required files. This readme just makes "readers" like myself feel more "neatly" prepared and organized compared to inserting comments in between codes and sometimes reading them over codes so I hope this Readme feels more pleasurable to reading.

---
## server.js

I have created three distinct endpoints and a "error catcher" endpoint as my first task to serve as specific purposes for the two front end files.

|ENDPOINT|METHOD|DESCRIPTION|
|---|---|---|
|`/random`|GET|Fetches a single string URL that is used as the image src attribute to render a randomized image of a puppy|
|`/breeds`|GET|Fetches an array of strings that defines the list of dog breeds (Object keys) and is also used for the next endpoint as a query definition|
|`/breed?breed=`|GET|Same as `/random` endpoint, except a query string match based on `breed` is selected by the dropdown menu created by the `/breeds` endpoint to filter out images that do not match the dog breed.|

Using axios and async/await, all API endpoints is fetched with axios in a try block and if an error occurs, the catch block would console the error (hence the redundancy for a `.catch` after chaining `.then`).

Await is specifically used for external fetching that will take time (asynchronous Promise pending and resolve/reject).

`/random` endpoint is designed to get a random image regardless of breed, so all it required was posting message from res.data which contained a URL string for the frontend to process the image.

`/breeds` endpoint is unusual in a way that it returns an array of all registered dog breeds in the API. Moreso, it wasn't a simple value fetching, but rather the dog species were listed as keys, which was processed using JavaScript's `Object.keys` method, hence returning an array of strings to the frontend dropdown menu for breeds to use.

`/breed` endpoint is where `/breeds` count the most as it is used for string query search to specify a breed to generate a random image, filtered by selected breed. Like random, it also returns a string URL image to the front end, except filtered by the query `breed` to return a more narrow set of images.

---
## generateImage.js

This is where the `/random` endpoint is used, to generate a random image file of a puppy. React components would require on every click that state must change as it is updated, so using class based Components, constructor and super props is needed to simulate what I would normally use for "useState", and establishing `image` as the primary point of setState change every time user clicks on a button to generate a random image.

On click, image is then retrieved, changes the state, and changes the img tag accordingly.

---
## generateImageByBreed.js

This is where both `/breed` and `/breeds` endpoints are used. Upon switching to this component, a fetch to `breeds` is triggered with axios to get the list of dog breeds which then generates the list of dropdown menu for selection. A map was therefore necessary to render when the ComponentDidMount.

By activating the dropdown, a `/breed` endpoint is also launched upon selection of a dog breed other than "Select an option" default value, which would send and return an empty string and the image tag would remain hidden until another choice is made.

Once chosen, the `/breeds` list  act as query conduits for each selection in the `/breed` endpoint, generating a random puppy image based on the `breed` query entered (e.g. `/breed?breed=Akita` for a random Akita Inu Dog picture). It only returns to a default state on refresh, or if the default "select an option" is selected, hence the image is hidden via a css classname attribute `.hidden`.

---
### END OF NOTES