# dev tinder

- Create a Vite + React application
- Remove unnecessary code and create a hello world app
- Install Tailwind css
- INstall Daisy Ui
- Add NavNar component to App.js
- Create a NavBar.jsx separate Component file
- Install react router dom
- Create BrowserRouter > Routes > Route =/ Body > RouteChildren
- Create Footer Component
- install axios
- CORS - install cors in backend => add middleware to with configurations: origin, credentials: true
- whenever you make api calls from external origin make sure to use axios: {withCredentials: true}
- Install Redux Toolki - https://redux-toolkit.js.org/introduction/getting-started
- Install react-redux + @reduxjs/toolkit => configureStore => Provider => createSlice => addReducer to store
- Add redux devtools in chrome
- login and find if data is coming prperly from the store
- Navbar should update as soon as user logs in
- User react router dom (useNavigate) library for routing
- Refactor our code to add CONSTANTS file + create a camponent folder
- CORS - install cors in backend => add middleware to with configurations with{ credentials : true }

- if token is not present or user not login redirect ot /login page
- you should not access other route without login
- logout feature
- Get the feed and add the feed in the store
- build the user card on feed
- Edit profile feature
- Show toast message on save of profile
- New page - Sell all my connections
- New page - See all my Connections requests
- Feature - Accept/Reject Connection Request


Remaining: 
    - send/ignore the user card in feed
    - Signup user
    - E2ETesting

## project tree structure

Header

body
Navbar
Route=/ feed api
Route=/profile => profile api
Route=/connections => connections api
Route=/login => login
Route=/logout => logout

footer
# dev-tinder-frontend

## GDL Namaste Node JS S03

#  S03E01 Launching a AWS Instance and deploying frontend

# Deployment

1. First create a aws accound and redirect console
2. go to Ec2
3. instances
4. Launch a instances
5. Name -> quickstart (ubuntu) -> Amazon Machine Image (AMI) -> instance type (auto) (free) -> create a key pair (and download .pem file) -> launch a instance --> instance id -> connect -> SSH client -> open terminal -> change permission .pem file ->  
5. terminal -> install -> nvm v18.20.5 -> 