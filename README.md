## Links

[Demo Link](https://www.youtube.com/watch?v=FjIGmhQjwZk)

[Presentation Slides](https://docs.google.com/presentation/d/1LfT8pe0cm1Q1W2vUxgafsS2xrhkpP4vJFj-IeOLbfDI/edit?usp=sharing)


- [Iteration 3](#iteration-3) 
    - [Contribution](#contribution-3) 
    - [Screenshots](#screenshots-3)
    
- [Iteration 2](#iteration-2) 
    - [Contribution](#contribution-2) 
    - [Screenshots](#screenshots-2)
    
- [Iteration 1](#iteration-1) 
    - [Contribution](#contribution-1) 


# Iteration 3 <a name="iteration-3"></a>

#### Contribution 3:

- Aly 
    * Fixed edit access
    * Made mapview following the marker on new location selected in map
    * Sorted Entry list by order
    * Overhauled all UI design
- Difei
    * Fixed edit acccess
    * Added AddressInput to autocomplete address input using geocoding
    * Added reverse geocoding in LocationManager
    * Added locations collection to store geoinfo
    * Removed buttons for users with no access
    * Updated user profile related info, adding user collections to include join dates and names and added them in detail page
- Zia
    * Fixed image issue when the map location was being changed
    * Added scheduled notification
    * Made map and image required field when adding a post
    * Made pictures shown on details page from the storage
    * UI design fix

#### Future Works:

- Allow users to upload from gallery.
- Improve UI on detail page
- Reorganize the firebase data structure to use references


#### Screenshots 3:

1. Login
<pre> <img src="./Screenshots/iteration3/Login.png" width="180"/> </pre>

2. Signup
<pre> <img src="./Screenshots/iteration3/Signup.png" width="180"/> </pre>

3. Home - showing all posts/lost items from a user's community
<pre> <img src="./Screenshots/iteration3/Home.png" width="180"/> </pre>

4. Post
<pre> <img src="./Screenshots/iteration3/addpost.PNG" width="180"/> <img src="./Screenshots/iteration3/mapview.PNG" width="180"/> <img src="./Screenshots/iteration3/camera.PNG" width="180"/> </pre>

5. MyList - showing only the user's own posts
<pre> <img src="./Screenshots/iteration3/mylist.PNG" width="180"/> </pre>

6. ItemDetails - clicking on a post in Home or MyList will route to this page, showing all details of said post/item.
<pre> <img src="./Screenshots/iteration3/detail.PNG" width="180"/> </pre>

7. Edit
<pre> <img src="./Screenshots/iteration3/edit1.PNG" width="180"/> <img src="./Screenshots/iteration3/edit2.PNG" width="180"/> </pre>

8. Profile
<pre> <img src="./Screenshots/iteration3/profile.PNG" width="180"/> </pre>

9. Scheduled Notification - to set up a daily reminder
<pre> <img src="./Screenshots/iteration3/notification.PNG" width="180"/> </pre>



# Iteration 2

#### Contribution 2:

- Difei - Implemented Authentication functionality. Created a Login page a Signup page, and added Firebase Authentication to allow the app to include users. Added proper authorization checks and filters that connect to a particular user in Add, Edit, MyList and Details screens.
- Zia - Implemented Camera functionality - Created ImageManager component that handles camera requests/verification, added preview for the image on the add screen. Created Firebase Storage, saved the images in the firebase storage.
- Aly - Implemented Location functionality - Created LocationManager component that handles location requests/verification, and links to a newly created Map screen where the user can select a location based on current one or default. Integrated saving location data to an entry document in Firestore, which can be fetched for preview/edit.

#### Known Issues / Bugs:

- Styling : styling was not prioritized in iterations 1 & 2 and can seem quite lacking, but it is a major focus of the upcoming Iteration 3.
- Camera Functionality : fetching images from storage and displaying them in Entry Details screen not implemented yet, to be completed in Iteration 3.
- Camera Functionality : Taking a picture is not working on Android due to an apparently abundant issue discussed online. This was consulted with the TA and is being sorted for the time being. Should be fixed by Iteration 3.

#### Screenshots 2:

1. Login
<pre> <img src="./Screenshots/Login.PNG" width="180"/> </pre>

2. Signup
<pre> <img src="./Screenshots/Signup.PNG" width="180"/> </pre>

3. Home - home screen shows all posts/lost items from a user's community
<pre> <img src="./Screenshots/Home.PNG" width="180"/> </pre>

4. MyList - shows only the user's own posts
<pre> <img src="./Screenshots/MyList.PNG" width="180"/> </pre>

5. Post
<pre> <img src="./Screenshots/Post.PNG" width="180"/> <img src="./Screenshots/Post 1.PNG" width="180"/> <img src="./Screenshots/Post 2.PNG" width="180"/> <img src="./Screenshots/Post 3.PNG" width="180"/> <img src="./Screenshots/Post 4.PNG" width="180"/> </pre>

6. ItemDetails - clicking on a post in Home or MyList will route to this page, showing all details of said post/item.
<pre> <img src="./Screenshots/ItemDetails.PNG" width="180"/> </pre>

# Iteration 1

#### Contribution 1:

- Difei - Implemented Navigation functionality
- Zia & Aly - Implemented CRUD operations
