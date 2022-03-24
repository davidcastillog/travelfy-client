<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/davidcastillog/travelfy-client">
    <img src="/travelfy-client/src/assets/images/travelfy-logo-blue.jpg" alt="travelfy Logo" width="250" height="75" alt="Travelfy">
  </a>
  <h3 align="center">Travel planner</h3>
     MERN stack app
    <br />
   <a href="https://travelfy.netlify.app/">View Demo</a>
</div>

<!-- TABLE OF CONTENTS -->
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#api">API required</a></li>
    <li><a href="#scripts">Scripts</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>


<!-- ABOUT THE PROJECT -->
## About The Project

![Travelfy Screenshot][product-screenshot]

This is a travel planner MERN stack app.

You will find:
* Attractions, hotels and restaurants from anywhere in the world. Map and Place list. :earth_americas:
* Save the places you love in a trip list. (MongoDB = Reduce API calls) :world_map:
* Around me section. (This will get the user's IP, find the lat&lng with it and show the map and places around)
* 7-day weather forecast for any city. :umbrella:	
* User Profile (Profile image, username, name, change password)
* Google Maps and Google Autocomplete.

<p align="right"><a href="#top">back to top ^</a></p>


### Built With

* [React.js](https://reactjs.org/)
* [Material-UI](https://mui.com/)
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)

<p align="right"><a href="#top">back to top ^</a></p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Verify if you already have Node.js and npm installed:
  ```sh
  node -v
  npm -v
  ```

 To download the latest version of npm, on the command line, run the following command:
  ```sh
  npm install -g npm
  ```

### Installation

_Follow this simple steps:_

1. Clone the repo
   ```sh
   git clone https://github.com/davidcastillog/travelfy-client.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter all your API keys in `.env` file
   ```js
   REACT_APP_NAME_API = 'ENTER YOUR API';
   ```

**Note:**
* This is the Front-end (client) repository.
* You **must** clone the [Back-end (server) repository.](https://github.com/davidcastillog/travelfy-server)

<p align="right"><a href="#top">back to top ^</a></p>

<!-- API LIST -->
## API

**Client**:
* [Google Maps](https://developers.google.com/maps)
* [Open Weather](https://openweathermap.org/api)
* [Rapid API Travel](https://rapidapi.com/apidojo/api/travel-advisor)
* [FreeGeoIp](https://freegeoip.app/)

**Server**:
* [Cloudinary](https://cloudinary.com/)

<p align="right"><a href="#top">back to top ^</a></p>

<!-- SCRIPTS -->
## Scripts

In the project directory:

 ```sh
  npm start
 ```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

 ```sh
  npm run build
 ```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

<!-- USAGE EXAMPLES -->
## Usage

 <div align="center">
 <h3 >Place list</h3>
  <p>Includes Google Autocomplete & place filters</p>

![Travelfy Screenshot][product-screenshot2]

 <h3 >My Trips</h3>
  <p>Save places for each trip </p>
  <br />
  <p>(Map with trip markers)</p>

![Travelfy Screenshot][product-screenshot3]

  <h3>Weather</h3>
  <p>7-day forecast for any city in the world</p>

![Travelfy Screenshot][product-screenshot4]

 </div>

<p align="right"><a href="#top">back to top ^</a></p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right"><a href="#top">back to top ^</a></p>


<!-- CONTACT -->
## Contact

Linkedin: [https://linkedin.com/in/davidcastillog](https://linkedin.com/in/davidcastillog) 

[![LinkedIn][linkedin-shield]][linkedin-url]

David Castillo - [@davidcastillog](https://twitter.com/davidcastillog)

<p align="right"><a href="#top">back to top ^</a></p>

<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/davidcastillog
[product-screenshot]: /travelfy-client/src/assets/images/home.jpg
[product-screenshot2]: /travelfy-client/src/assets/images/explore.jpg
[product-screenshot3]: /travelfy-client/src/assets/images/mytrips.jpg
[product-screenshot4]: /travelfy-client/src/assets/images/weather.jpg
