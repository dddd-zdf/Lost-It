## Links

- [Iteration 2](#iteration-2) - [Contribution:](#contribution) - [Screenshots:](#screenshots)
- [Iteration 1](#iteration-1) - [Contribution:](#contribution-1) - [Screenshots:](#screenshots-1)

# Iteration 2

#### Contribution:

- Difei - Implemented Authentication functionality. Created a Login page a Signup page, and added Firebase Authentication to allow the app to include users. Added proper authorization checks and filters that connect to a particular user in Add, Edit, MyList and Details screens.
- Zia - Implemented Camera functionality - Created ImageManager component that handles camera requests/verification, added preview for the image on the add screen. Created Firebase Storage, saved the images in the firebase storage.
- Aly - Implemented Location functionality - Created LocationManager component that handles location requests/verification, and links to a newly created Map screen where the user can select a location based on current one or default. Integrated saving location data to an entry document in Firestore, which can be fetched for preview/edit.

#### Known Issues / Bugs:

- Styling : styling was not prioritized in iterations 1 & 2 and can seem quite lacking, but it is a major focus of the upcoming Iteration 3.
- Camera Functionality : fetching images from storage and displaying them in Entry Details screen not implemented yet, to be completed in Iteration 3.
- Camera Functionality : Taking a picture is not working on Android due to an apparently abundant issue discussed online. This was consulted with the TA and is being sorted for the time being. Should be fixed by Iteration 3.

#### Screenshots:

1. Login
   <img src="./Screenshots/Login.PNG" width="180"/>

2. Signup
   <img src="./Screenshots/Signup.PNG" width="180"/>

3. Home - home screen shows all posts/lost items from a user's community
   <img src="./Screenshots/Home.PNG" width="180"/>

4. MyList - shows only the user's own posts
   <img src="./Screenshots/MyList.PNG" width="180"/>

5. Post
<pre> <img src="./Screenshots/Post.PNG" width="180"/> <img src="./Screenshots/Post 1.PNG" width="180"/> <img src="./Screenshots/Post 2.PNG" width="180"/> <img src="./Screenshots/Post 3.PNG" width="180"/> <img src="./Screenshots/Post 4.PNG" width="180"/> </pre>

6. ItemDetails - clicking on a post in Home or MyList will route to this page, showing all details of said post/item.
   <img src="./Screenshots/ItemDetails.PNG" width="180"/>

# Iteration 1

#### Contribution:

- Difei - Implemented Navigation functionality
- Zia & Aly - Implemented CRUD operations