# FREERECORDZ

## Description

The FREERECORDZ app is a music discovery app which helps users to discover completely new music while at the same time enabling them to listen to music they saved previously. On the contrary to other existing streaming apps, the app will not contain already known music or artists. The artists who upload to Streaming are new and unknown, and the application will help them to become discovered.

In functionality, the app is no different than any other streaming.
 The homepage contains top lists, such as daily top list, weekly top list and a monthly top list, along with some featured musicians.

Naturally, there is a page with the library of previously saved music, where the users can see music they saved, along with any playlists that they created, just like with any other streaming app.

The main function and the page of the app is the **discovery page.** It is a function that the app is built around. By clicking on discover, the app shows a page with two options. 

By clicking on the **random discovery,** the app will automatically play a playlist made up of 10 songs which are randomly selected from the database. These are the songs that have never been heard by the specific user.

The second option on the discovery page is to specify what kind of music to discover. If this type of discovery is selected, a new page will show. This page is the most important, as here the listener is able to select: -genres of the music, -gender of the performer, -language of the song, -country of the performer/band, etc. After selecting, the user can click on the create button and a playlist will be created of 10 random songs according to the selected criteria. 

 When a song is being played, on the song screen, users can like or dislike it, save it to their library, besides the typical, play/pause and skip functions.

[Link Deploy]()




## User Stories


\- [ ] **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

\- [ ] **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

\- [ ] **discovery** - As a user I want to be able to access the discovery page to see the uploaded tracks.

\- [ ] **search** - As a user I want to be able to access the search page  and be able to conduct detailed filtering / search.

\- [ ] **sign up** - As a user I want to sign up on the web page so that I can use the service

\- [ ] **login** - As a user I want to be able to log in on the web page so that I can get to my account.

\- [ ] **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account

\- [ ] **favorites** - As a user I want to be able to access the saved ‘tracks’

\- [ ] **profile** - As a user I want to be able to access my profile where I can find info about me and my uploads


## Backlog



# Client

## Routes
| Path | Component | Permissions | Behavior | 
|------|--------|--| -------|

| `/signup` | SignupPageComponent| anon only| signup form, link to login, navigate to homepage after signup|
| `/login` | LoginPageComponent | anon only |login form, link to signup, navigate to homepage after login |
| `/profile/:id` | ProfilePageComponent | user only | dashboard of the profile with profile picture, bio, saved musics and listening history |
| `/discovery` | DiscoveryPageComponent | user only | Horizontal representation of uploaded tracks based on different filtering possibilities |
| `/search` | SearchPageComponent | user only | Extensive filtering/browsing possibility for tracks |




## Components




## Services



# Server

## Models
While uploading the music, an artist user will have to define categories for each song that will be written in the database and on those criteria the search option will be able to find songs that match the criteria defined by the listener. This is the most important function of the app, for the users to be able to find music based on the search categories.
```


{
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  savedMusicArr: [{ type: mongoose.Schema.Types.ObjectId, ref: "track" }],
​  ownTracksArr = [{  type: mongoose.Schema.Types.ObjectId, ref: "track"}],
},

{
  title: { type: String, required: true },
  desc: { type: String },
  bpm: { $range: [ 0, 165, 1 ] },
  genre: {
​    type: String,
​    required: true,
​    enum: ["Alternative", "Ambient", "Blues", "Cinematic", "Classical", "Country", "Electronic", "Folk", "Hip Hop", "Indie", "Jazz", "Pop", "Post Rock", "R&B", "Rock", "Singer-Songwriter", "Soul", "Spoken Word", "Vintage", "World"]
  },
  countryOfOrigin: {type: String, required: true},
  language: {type: String, required: true},
  instrumentsIncl: {
​    type: Array,
​    required: true,
​    enum: ["Acoustic Guitar", "Ambient Sounds", "Banjo", "Bass", "Bells", "Cello", "Claps", "Clav", "Drums", "Electric Guitar", "Harmonica", "Harp", "Harpsichord", "Horns", "Hummig", "Kazoo", "Mandolin", "Nature Sounds", "Organ", "Precussion", "Piano", "Rhodes", "Saxophone", "Snaps", "Sound FX", "Steel Guitar", "Stomps", "String Bass", "Strings", "Synth", "Turntable", "Ukulele", "Viola", "Violin", "Vocals", "Vocoder", "Whistling", "Woodwinds", "Wurlitzer"]
  },
  releaseYear: {type: Number, required: true},
  mood: {
​    type: String,
​    required: true,
​    enum: ["Angry", "Carefree", "Chill", "Contemplative", "Ecstatic", "Eerie", "Happy", "Love", "Peaceful", "Sad", "Serious", "Somber", "Tense", "Uplifting"]
  },
  budget: {type: String, enum: ["Low", "Medium", "High"]},
  recordingEnviroment: {type: String, enum: ["Bedroom studio", "Home studio", "Professional Studio", "State of the are studio", "Other"]},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
  }
```

## Data structure

### Front-end routes

- ('/') : profile page if logged in or home page with login/signup links
- ('/login') : login page
- ('/signup') : signup page
- ('/profile/:id') : profile page
- ('/discovery') : discovery page
- ('/search') : search page



## API Endpoints (backend routes)

**AUTH**
- GET /auth/me
    - 404 if no user in session
    - 200 with user object
-  POST auth/signup
-  POST auth/login
-  POST auth/logout

**USER**
- GET /user
- GET /user/:id
- PUT /user/:id
- DELETE /user/:id

**TRACK**
- GET /user/track:id
- POST /user/track:id
- DELETE /user/track:id



## Links


### Trello
[Link url](https://trello.com/b/aG0KmDET/freerecordz-3-project-ironhack)


### Git
URls for the project repo and deploy
[Link Repo Server](https://github.com/ross-u/react-auth-backend-boilerplate-v2.git)
[Link Repo Client](https://github.com/valentin-muller/freerecordz-frontend.git)
[Link Deploy]()


### Slides
URls for the project presentation (slides)
[Slides](https://docs.google.com/presentation/d/14vZD83zI3czY0jVjelo450HBAM9qfDXHN5NcNR7jIu8/edit?usp=sharing)

