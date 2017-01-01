import firebase from 'firebase'

const config = {  
  apiKey: process.env.REACT_APP_FB_API_KEY,
  databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
}

firebase.initializeApp(config)
