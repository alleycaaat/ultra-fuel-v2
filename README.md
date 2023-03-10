<a name='top'></a>
<div align='center'>

[![Netlify][netlify-status]][netlify-url]
![last commit][last-commit]
![issues open][issues-open]
![github stars][stars]

<h1><strong>Ultra Fuel</strong></h1>
</div>

Ultra Fuel is a Jamstack web-app developed using [React](react-url) and [SCSS](sass-url) to create a responsive, optimized interface. It allows users to easily add water, Tailwind and food consumed during an ultra marathon, and displays the total calories and nutrients for each hour to quickly/easily see how the runner is fueling.

It uses [Netlify Functions](https://docs.netlify.com/functions/overview/) for API calls and [Fauna](https://fauna.com/) for the database.

Deployed application: <a href='https://achulslander-ultra-fuel-v2.netlify.app/'>https://achulslander-ultra-fuel-v2.netlify.app</a>

Repo: <a href='https://github.com/alleycaaat/ultra-fuel-v2'>https://github.com/alleycaaat/ultra-fuel-v2</a>

<br>

<details>
  <summary>Table of Contents</summary>
  <ul>
    <li>
        <a href='#about-the-project'>About The Project</a></li>
    <ul>
        <li><a href='#current-features'>Current Features</a></li>
        <li><a href='#updates-from-v1'>Updates from V1</a></li>
        <li><a href='#future-features'>Future Features</a></li>
        <li><a href='#built-with'>Built With</a></li>
        <li><a href='#tested-on'>Tested On</a></li>
    </ul>
    <li><a href='#running-the-project'>Running the Project</a></li>
    <ul>
        <li><a href='#accounts-needed'>Accounts Needed</a></li>
    <ul>
        <li><a href='#netlify'>Netlify</a></li>
    </ul>
    <li><a href='#dependencies'>Dependencies</a></li>
    </ul>
    </li>
    <li><a href='#feedback'>Feedback</a></li>
    <li><a href='#contact'>Contact</a></li>
    <li><a href='#acknowledgements'>Acknowledgements</a></li>
  </ul>
</details>

<br>

## <strong>About The Project</strong>
***
![An app titled Ultra Fuel with buttons for fifteen hours of the day to click on and a menu to add fuel to 07:00-08:00
](./src/img/screenshot.png)

<br>

<div align='center'>

![repo size][repo-size]
![language count][language-count]
![main language][main-language]

</div>

### <strong>Current Features</strong>
- Ability to add or remove food, water or Tailwind to each hour
- Ability to edit individual hours
- Hourly overview shows total water, Tailwind and foods consumed
    - Shows calories and important nutrients consumed each hour
- Notes feature displays race specific information

### <strong>Updates from V1</strong>
- useContext and useReducer Hooks
- Reformatted how data is handled
- Added utilities and constants
- Added more components for much cleaner code

### <strong>Future Features</strong>
- Ability to create a user account
- Authenticate log-in information
- Allow for adding custom foods
- Search for food nutri info via API
- Add option for custom notes
- Allow user to set custom start time

<br>

### <strong>Built With</strong>

[![React][react.js]][react-url]
[![Sass][sass]][sass-url]

<br>


### <strong>Tested On</strong>

[![Chrome][chrome]][chrome-url]
[![Opera][opera]][opera-url]
[![Firefox][firefox]][firefox-url]
<p align='right'>(<a href='#top'>back to top</a>)</p>


## <strong>Running the Project</strong>
***
1 - Clone the repo
   ```sh
   git clone https://github.com/alleycaaat/ultra-fuel-v2.git
   ```
2 - Install the dependencies
  ```sh
  npm install
  ```
3 - Start the development server
```sh
netlify dev
   ```

### <strong>Accounts Needed</strong>

You'll need a [Netlify](https://netlify.com) account for hosting and to utilize Netlify Functions as API endpoints, and a [Fauna](https://fauna.com/) account for the server.

<br>

#### <strong>Netlify</strong>

To keep your Fauna key secure, use a `.env` file to store it locally (double check `.env` files are in `.gitignore`).

After installing [netlify-cli](https://www.npmjs.com/package/netlify-cli), in the command line:

1 - log in to Netlify account
```sh
netlify login
```
2 - connect repo with a site on Netlify
```sh
netlify link
```
3 - set the environment key obtained from Fauna
```sh
netlify env:set API_KEY_NAME valueFromFauna
```
<em>alternative step three</em>

3 - import environment variables from `.env` file
```sh
netlify env:import .env
```
<br>

### <strong>Dependencies</strong>
***
- [react](https://www.npmjs.com/package/react)
- [react-dom](https://www.npmjs.com/package/react-dom)
- [react-scripts](https://www.npmjs.com/package/react-scripts)
- [netlify-cli](https://www.npmjs.com/package/netlify-cli)
- [faunadb](https://www.npmjs.com/package/faunadb)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [sass](https://www.npmjs.com/package/sass)


<p align='right'>(<a href='#top'>back to top</a>)</p>

## <strong>Feedback</strong>
***

As my cats and dog aren't too keen on providing input on my projects, feel free to [send me a message](https://www.achulslander.com/#contact) if you have some constructive comments, or [file an issue](https://github.com/alleycaaat/ultra-fuel-v2/issues/new) if I really buggered something up.

This app was developed specifically for me to use during a race, so things are a bit static at the moment.  I have big plans for this project though, and look forward to it growing in leaps in bounds as I further my abilities.

<p align='right'>(<a href='#top'>back to top</a>)</p>

## <strong>Contact</strong>
***
<div align='center'>

AC Hulslander - [Send me a message](https://www.achulslander.com/#contact)

[![GitHub][github]](https://github.com/alleycaaat/)
[![hashnode][hashnode]][hashnode-url]
[![linkedin][linkedin]][linkedin-url]
[![codepen][codepen]][codepen-url]
[![twitter][twitter]][twitter-url]
</div>
<p align='right'>(<a href='#top'>back to top</a>)</p>

## <strong>Acknowledgements</strong>
***
- [Img Shields](https://shields.io/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [ReadMe Format Inspiration I](https://github.com/othneildrew/Best-README-Template)
- [ReadMe Format Inspiration II](https://github.com/catherineisonline/expenseless)
- [ReadMe Format Inspiration III](https://github.com/gitpoint/git-point#readme)
- [Netlify Doc](https://docs.netlify.com/cli/get-started/#manage-environment-variables)
- [Fauna Docs](https://docs.fauna.com/fauna/current/)

<p align='right'>(<a href='#top'>back to top</a>)</p>

[netlify-status]: https://api.netlify.com/api/v1/badges/bc346d71-fed7-40a8-baa3-1abe8eadc032/deploy-status
[netlify-url]: https://app.netlify.com/sites/achulslander-ultra-fuel-v2/deploys

[issues-open]: https://img.shields.io/github/issues/alleycaaat/ultra-fuel-v2?color=blue&logo=github

[repo-size]: https://img.shields.io/github/repo-size/alleycaaat/ultra-fuel-v2?color=red&logo=github

[language-count]: https://img.shields.io/github/languages/count/alleycaaat/ultra-fuel-v2?color=orange&logo=github

[main-language]: https://img.shields.io/github/languages/top/alleycaaat/ultra-fuel-v2?color=yellow&logo=github

[last-commit]: https://img.shields.io/github/last-commit/alleycaaat/ultra-fuel-v2?logo=github

[stars]: https://img.shields.io/github/stars/alleycaaat/ultra-fuel-v2?color=purple&logo=github

[linkedin]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/achulslander

[product-screenshot]: images/screenshot.png

[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/

[netlify]: https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white
[netlify-url]: https://netlify.com

[sass]: https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white
[sass-url]: https://sass-lang.com/

[chrome]: https://img.shields.io/badge/Google_chrome-4285F4?style=for-the-badge&logo=Google-chrome&logoColor=white
[chrome-url]: https://www.google.com/chrome/

[opera]: 	https://img.shields.io/badge/Opera-FF1B2D?style=for-the-badge&logo=Opera&logoColor=white
[opera-url]: https://www.opera.com/download

[firefox]: https://img.shields.io/badge/Firefox_Browser-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white
[firefox-url]: https://www.mozilla.org/en-US/firefox/

[github]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white

[codepen]: https://img.shields.io/badge/Codepen-000000?style=for-the-badge&logo=codepen&logoColor=white
[codepen-url]: https://codepen.io/alleycaaat

[twitter]: https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white
[twitter-url]: https://twitter.com/achulslander


[hashnode]: https://img.shields.io/badge/Hashnode-2962FF?style=for-the-badge&logo=hashnode&logoColor=white
[hashnode-url]: https://blog.achulslander.com/