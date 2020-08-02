# vumonic

Steps to run the app

1) Clone the repository
#go to vumonic directory
$ cd vumonic
# install backend dependecies
$ npm i
# start server
$ npm start


# The server is runnong on port 8000, and requires mongo to be running locally. It creates a db with name vumonic, havent added envionment variable setup otherwise these config can be exported there.
#Have added a API for signing up normal user, in Admin case mannualy updated the isAdmin key to true havent added extra API for that.
#Create API for Tpoic and Article are as asked and have taken ImageUrl as input instead of a feature to upload an image.
#Fetch API's are same for fetch with topic ID or all on the basis of query parameter same for Article
#Artciles with similar tags are fetched only when article fetched by Id.
#Have added tags directly to the Articles as array of Strings, it can be extended to havea seperate table for Tags and attach them via ID to articles
# Have added orderby param to get API where any of the Article field can be mentioned.
# Tree representation is done via object and is generated when vai API.
# No UI is implemented all API are tested via Postman.
# Have not added unit testing for now.