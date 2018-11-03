# Clothesee HTML Prototype
Team TAXY for CS 6755 @ Georgia Tech

## How to Install
1. Install node.js
2. In command line, any directory: `npm install nodemon -g`
3. In project directory: `npm install`

## Starting Up
1. Run project with `nodemon`
2. Go to http://localhost:3000 and you should see the home page
3. Go to http://localhost:3000/controller and you should see the Wizard of Oz control panel.

## Important Files and Directories
- `index.js` main server JS file, routing and socket.io stuffs are handled here.
- `/public` is where static assets are (files in this folder can be accessed from browser through http://localhost:3000/public/...).
    - `/css` the CSS file which is linked in every pages is here (`clothesee.css`).
    - `/img` images go here.
    - `/js` where common JavaScript code `app_common.js` is stored.
- `/views/main_app` this folder contains EJS pages for the app.
    - `/partials` contains reusable elements that appears on different pages. e.g. navbar, clothes card, etc.
- `/woz_controller` this folder contains the code for Wizard of Oz control panel page.

## The way I organize code
- I write page-specific JS in a `<script>` tag in that page while common code goes in `/public/js/app_common.js`
- CSS is centralized. Don't use inline CSS as it can be hard to change
- Bootstrap have vey useful classes for spacing. Check them out here: https://getbootstrap.com/docs/4.0/utilities/spacing/

## Quick EJS Brief
- What EJS is for HTML is like what PHP is for HTML. They both inject some logic codes into HTML itself.
- The EJS page will be _rendered_ into HTML before being served to the browser, meaning all <% %> tags will be interpreted and replace with relevant value before the resulting plain HTML is served.
- You can include other files using `<% include('[filename]'); %>`.
    - Reusing common elements can be done in this way.
    - You can pass data to the file included e.g., `<% include('[filename]', { show_search_bar: true }); %>`
- You can write JavaScript in your HTML to control display logic in <% %> bracket
- You can display variable values with this syntax `<%= varname %>`
    - For example, you want to write a reusable element (elem.ejs) and want to pass some data inside.
    - This is elem.ejs
    
    ```
    <div> Hello, <%= name %> </div>
    ```
    
    - You will write this in another file if you want to include this element and pass your own data.

    ```
    <% include('elem.js', { name: 'TAXY'} ); %>
    ```

    - What you get will be 

    ```
    <div> Hello, TAXY </div>
    ```

    - At times, in my code, you might see `locals.xxx` instead of just `xxx` where xxx is a variable name. This is an EJS way to make sure there are no errors if I reference an undefined variable.

