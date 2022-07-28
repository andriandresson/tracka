# Tracka Application _(Internship project)_

[![Tracka Application logo](https://user-images.githubusercontent.com/80709364/180757095-9c9406fc-d516-4ccf-ae05-24eeae993b39.png)](https://interns-tracka.vercel.app/)

_Web application tool with admin dashboard displaying selected data from ClickUp._

## Project description ✍️

Our solution is based on the company's requirements and needs. We created **a custom web-only application** which serves as a tool for project managers to see statistics of specific data. It consists of **an onboarding process with six steps**, where the user (project manager) selects a specific data set.

  <img src="https://user-images.githubusercontent.com/80709364/180759178-ff0fa777-51d0-4bd2-8409-0b0df90bc7a8.png" width="220"/>

After those steps the user (project manager) is redirected to **a dashboard** where all the selected data are displayed in a visual form of charts, bars, graphs, etc.

  <img src="https://user-images.githubusercontent.com/80709364/180759543-074e0a54-46b4-41b5-b8b0-cda886faa218.png" width="500"/>

The user (project manager) can **choose a time period** and filter the data only for the selected time frame.

  <img src="https://user-images.githubusercontent.com/80709364/180760083-11b3de4d-429f-41d7-ae14-0a15de4e4175.png" width="300"/>

Data are saved in [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).

☝️ This description refers to the whole solution for the company. [This link](https://www.figma.com/proto/jNmRzfmcnzquefrjJ3FIUk/Tracka-Design---Internship?node-id=481%3A16247&scaling=scale-down&page-id=160%3A52415&starting-point-node-id=481%3A16247)
or the image below redirects you to the prototype demonstrating it.

[![Tracka prototype](https://user-images.githubusercontent.com/80709364/180849242-35deec77-f096-49ef-aa36-c339f7f88e42.png)](https://www.figma.com/proto/jNmRzfmcnzquefrjJ3FIUk/Tracka-Design---Internship?node-id=481%3A16247&scaling=scale-down&page-id=160%3A52415&starting-point-node-id=481%3A16247)

## Tech Stack ️⚙️

Development

- Organization

  - [Nx Workspace](https://nx.dev/) - monorepo
  - [VS code](https://code.visualstudio.com/) - code editor
  - [Github](https://github.com/) - rule of at least one reviewer of the code
  - [Github Desktop](https://github.com/) - easy to use in development workflow, convenient, preventing mistakes
  - [Vercel](https://vercel.com/) - continuos deployment

- Code

  - [React](https://reactjs.org/)
  - [NextJS](https://nextjs.org/)
  - [NextAuth](https://next-auth.js.org/)
  - [Typescript](https://www.typescriptlang.org/)
  - [Click Up API](https://clickup.com/api)

- Libraries

  - [MUI library](https://mui.com/) - open source, well documented, easy to customize
  - [React Material UI Carousel](https://www.npmjs.com/package/react-material-ui-carousel)
  - [Styled Components](https://styled-components.com/)
  - [React-charts-js2](https://react-chartjs-2.js.org/)

- Other
  - [Dillinger](https://dillinger.io/) - open source, markdown online editor

Design

- [Figma](https://www.figma.com/)
- [Fig Jam](https://www.figma.com/figjam/)

Most of the tech stack we used is the same that the company works with. They use Nx Workspace, React, NextJS, Typescript, Vercel, Styled Components, VS Code and GitHub Desktop, GitHub and Figma.

It was more convenient for us to use the same technology as the company, since they could help us right away if there was any issue. Also the project is something the company would like to use in the future so it made sense to use the same tech stack to keep it easier to maintain, modify and more coherent in the code.

We decided to go with MUI library for the dark theme option purpose, open source availability, customizable options, great and easy documentation and positive “client's” feedback. The visualization of the data on the dashboard is created with React-charts-js2 for easy documentation, set up and recommendation from the company we worked with.

### Challenges

- understanding data organization of the company in ClicUp
- finding solution and matching customers needs
- clickUp API, endpoints
- accordion (creating complex components)
- authentication

### Features to implement in the future

- Make onboarding process more smooth.
- Add a review component as a 6th step in the onboarding process.
- Onboarding only done at once when you first log in (save selected options for the user and also when refreshing page).
- Add more different widgets and options and views on dashboard.
- Storing data (in database)
- Be able to export file(s) in CSV and PDF
- Be able to modify data
- Improve performance
- Different levels of access (employees)
- Github log in (developer time tracking)
- Gamification idea (collect sprint points for example and create game out of it)

## Project Management 📂

- [Click Up](https://clickup.com/)
- [Slack](https://slack.com/)
- [Google Meet](https://meet.google.com/)
- [Notion](https://www.notion.so)
- Scrum (sprints: one-week and two week, daily meetings, demo meetings)

## How to install and run the project 🏃

_You should create a [Click Up](https://clickup.com/) account and you need to get clickUp API token (Your Account > Settings > App)._

  <img src="https://user-images.githubusercontent.com/80709364/180786205-a712445c-a478-4fa9-af09-cb04d64179ed.png" width="400"/>

After cloning the project, you need to instal Nx Worskpace if you do not have it.
Global install of Nx Workspace:

```sh
npm install -g nx
```

Install all dependencies:

```sh
npm install
```

Run the project:

```sh
nx serve
```

| Dependencies (the most used) | Documentation                                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Nx Workspace                 | [https://nx.dev/getting-started/nx-and-react](https://nx.dev/getting-started/nx-and-react)                             |
| MUI Library                  | [https://mui.com/material-ui/getting-started/installation/](https://mui.com/material-ui/getting-started/installation/) |
| MUI Icons                    | [https://mui.com/material-ui/material-icons/](https://mui.com/material-ui/material-icons/)                             |
| React Material UI Carousel   | [https://github.com/Learus/react-material-ui-carousel](https://github.com/Learus/react-material-ui-carousel)           |
| React Charts JS-2            | [https://react-chartjs-2.js.org/](https://react-chartjs-2.js.org/)                                                     |
| Styled Components            | [https://styled-components.com/docs](https://styled-components.com/docs)                                               |
| Axios                        | [https://axios-http.com/docs/intro](https://axios-http.com/docs/intro)                                                 |

## How to use our application 🖥

👉 **You need to have a [Click Up](https://clickup.com/) account.**
👉 **You need to get clickUp API token (Your Account > Settings > App).**

  <img src="https://user-images.githubusercontent.com/80709364/180786205-a712445c-a478-4fa9-af09-cb04d64179ed.png" width="400"/>

👉 **Sign in using your Click Up credentials.**

  <img src="https://user-images.githubusercontent.com/80709364/180787138-e5e9d2ca-082d-4f7c-aacd-653a25f6aa8a.png" width="350"/>

(https://interns-tracka.vercel.app/)

👉 **Read the instructions.**

> You are now starting your **onboarding process**. The process has six steps, where the last step is a review of your selections. All the selections made will be displayed on your Dashboard after you complete the onboarding process.
> **Please note** that the onboarding process is done only at the first time you are logging to the application. You can view and specify different time periods of all the selections later on your Dashboard.
> Use **BACK** and **CONTINUE** buttons for moving in between steps.

👉 **Onboarding process**

- The onboarding process is based on the data structure of the company and Click Up. It has five steps in the development.

- Select Team (mostly it will be the company you work in; on the picture below - selected team Internship - Sendiráðið)

  <img src="https://user-images.githubusercontent.com/80709364/180844388-33be7890-b799-46a9-b28e-b22ba93142c4.png" width="350"/>

- Select spaces for customers (on the image below - selected space Shiny Waffle)

  <img src="https://user-images.githubusercontent.com/80709364/181033274-ff197ca8-6ed5-48cd-a3be-2b45993b89fd.png" width="350"/>

- Select customers (billable tasks)

  <img src="https://user-images.githubusercontent.com/80709364/181033995-c5c070ae-942e-4a45-8a4a-98f90706f7ce.png" width="350"/>

- Select spaces for internal tasks (on the image below - selected space Internship-Tracka and Shiny Waffle)

  <img src="https://user-images.githubusercontent.com/80709364/181034473-a00fe623-0dc4-49ae-9d92-08eb7b9ba421.png" width="350"/>

- Select internal tasks (non-billable tasks). After that you when you click CONTINUE you will be redirected to the Dashboard.

  <img src="https://user-images.githubusercontent.com/80709364/181034741-6e98634d-620a-4648-baf0-be4da154c997.png" width="350"/>

👉 **Dashboard**

- There are displayed two widgets (Goal widget and Time tracked per employee widget)

  <img src="https://user-images.githubusercontent.com/80709364/181030243-2d9c90aa-78ed-4a5d-8689-e1e22beaea7e.png" width="500"/>

👉 **Log out**

- Click on the avatar icon on the upper right corner and the pop up window with logout option will appear.

  <img src="https://user-images.githubusercontent.com/80709364/181035175-c65d08c8-d44b-448c-89a5-822ed4b7ee1e.png" width="200"/>

    <img src="https://user-images.githubusercontent.com/80709364/181035274-d6897796-08af-485f-85a4-a56e495398af.png" width="200"/>

## License

The product is owned by [Sendiraðið](https://sendiradid.is/). They have all the rights to modify the project for further developments.

## All relevant links

| File                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Figma prototype](https://www.figma.com/proto/jNmRzfmcnzquefrjJ3FIUk/Tracka-Design---Internship?node-id=481%3A16247&scaling=scale-down&page-id=160%3A52415&starting-point-node-id=481%3A16247) |
| [Figma design](https://www.figma.com/file/jNmRzfmcnzquefrjJ3FIUk/Tracka-Design---Internship?node-id=160%3A52415)                                                                               |
| [Figma research](https://www.figma.com/file/2x7Ksf0ipkAaEKoOj3fePZ/Internship---Tracka-Research?node-id=0%3A1)                                                                                 |
| [Figma presentation]()                                                                                                                                                                         |
| [Live site](https://interns-tracka.vercel.app/)                                                                                                                                                |
| [Github repository](https://github.com/andriandresson/tracka)                                                                                                                                  |
| [Click Up example of sprint](https://sharing.clickup.com/37453513/l/h/6-193303718-1/645bfaefd7a1568)                                                                                           |
| [Notion site for project managment](https://tracka.notion.site/TRACKA-ce6c12225f39405bb1f71a71c8323c38)                                                                                        |
