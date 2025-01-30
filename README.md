# Codeforces Friends Submissions Viewer

This project is a web application that allows you to access the Codeforces API with an API token and secret key to fetch friends' submissions. It provides an easy way to find your friends' submissions on a particular coding question.

## Features

- Fetch friends' submissions from the Codeforces API
- View friends' submissions on a specific coding question
- API key and secret key authorization
- Utilizes hashing algorithms like SHA for secure authentication
- Individuals' API keys are not stored anywhere except within their own browser. 

## Getting Started
To get started with the Codeforces Friends Submissions Viewer, follow the instructions below:

## Prerequisites
- Node.js 
- NPM
- Codeforces API key and secret key (generated on https://codeforces.com/settings/api)

# Installation

## Clone the repository
```shell
git clone https://github.com/your-username/codeforces-friends-submissions-viewer.git
```

## Install dependencies
```shell
cd codeforces-friends-submissions-viewer
cd client -> npm install
cd ..
cd server -> npm install
```

## Configuration
Create a .env file in the project root directory and add the following variables:
```.env
API_KEY=your-codeforces-api-key
SECRET_KEY=your-codeforces-secret-key
PORT=anything like 4000 will work
HANDLE=your-codeforces-handle
```

## Usage
### Start the development server
```shell
cd client -> npm start
cd server -> node server.js
```

Open your web browser and navigate to http://localhost:3000 to access the Codeforces Friends Submissions Viewer.

## Roadmap
- **Adding Local Storage:** Currently, the application only supports a single API/secret key. To make it accessible to everyone, we plan to add local storage functionality to store individual API keys.

- **Convert into Chrome Extension:** We aim to convert this web application into a Chrome extension to provide a more seamless and integrated experience for users.

## Contributing
Contributions to the Codeforces Friends Submissions Viewer are welcome! If you encounter any issues or have ideas for improvements, feel free to open an issue or submit a pull request.

Please ensure that your contributions align with the project's coding style and conventions.

## Collaboration

This repository is intended for collaborative work on the Codeforces Friends Submissions Viewer. Contributions from individuals interested in collaborating on this project are welcome. However, copying or distributing the contents of this repository without permission is strictly prohibited. If you would like to contribute or have any questions, please feel free to reach out and discuss the project further.
