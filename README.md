### <u> Session-based-Authentication-Using-Passport-in-Node.js </u>

#### Description
<p>  A common requirement when building a web app is to implement a login system, so that users can authenticate themselves before gaining access to protected views or resources. 
</p>

<p> In this project, I have used Passport to implement  local authentication (that is, logging in with a username and password) with a MongoDB back end.
</p>
<br>
<img src="https://github.com/rahil-1407/Session-based-Authentication-Using-Passport-in-Node.js/blob/main/SS/login-2987788.jpg" height=600 width=500></img>

#### View Live
https://backend-assignment-saarthi-ai.herokuapp.com/

#### Explanations using Screenshots
- First page is Register Page. Register yourself with a unique username.<br>
<img src="https://github.com/rahil-1407/Session-based-Authentication-Using-Passport-in-Node.js/blob/main/SS/Register.png"></img> <br>

- If already registered, Login Yourself.<br>
<img src="https://github.com/rahil-1407/Session-based-Authentication-Using-Passport-in-Node.js/blob/main/SS/Login.png"></img> <br>

- After successful authentication, user will land to a success page where a text box is present.<br>
<img src="https://github.com/rahil-1407/Session-based-Authentication-Using-Passport-in-Node.js/blob/main/SS/Success.png"></img> <br>

- Write a valid Url and press Enter. You can fetch the source code of the URL.<br>
<img src="https://github.com/rahil-1407/Session-based-Authentication-Using-Passport-in-Node.js/blob/main/SS/Web%20Scraping.png"></img> <br>

#### Modules Used
- <b>express : </b> A node.js web framework
- <b>mongoose : </b> ODM Libraray for MongoDB
- <b>body-parser : </b>For parsing incoming requests from client
- <b>bcrypt : </b>For hashing passwords
- <b>express-session : </b>For managing sessions
- <b>cookie-parser : </b>For parsing cookie headers
- <b>connect-flash : </b>Allows us to send a message while redirecting to a specified webpage
- <b>request-promise : </b>For web scraping

### Session-Based Authentication Vs JWT Authentication

<p>In the session based authentication, the server will create a session for the user after the user logs in. The session id is then stored on a cookie on the user’s browser. While the user stays logged in, the cookie would be sent along with every subsequent request. The server can then compare the session id stored on the cookie against the session information stored in the memory to verify user’s identity and sends response with the corresponding state!
</p>

<img src="https://github.com/rahil-1407/Session-based-Authentication-Using-Passport-in-Node.js/blob/main/SS/Session%20%20Based.png"></img>

<p>In the token based application, the server creates JWT with a secret and sends the JWT to the client. The client stores the JWT (usually in local storage) and includes JWT in the header with every request. The server would then validate the JWT with every request from the client and sends response.
The biggest difference here is that the user’s state is not stored on the server, as the state is stored inside the token on the client side instead. Most of the modern web applications use JWT for authentication for reasons including scalability and mobile device authentication.
</p>

<img src="https://github.com/rahil-1407/Session-based-Authentication-Using-Passport-in-Node.js/blob/main/SS/JWT%20Based.png"></img>

