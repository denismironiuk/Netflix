import {createContext,useContext,useEffect,useState} from 'react'
import {auth,db} from '../firebase'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from 'firebase/auth'
import {setDoc,doc} from 'firebase/firestore'
const AuthContext=createContext()

// AuthContextProvider component for handling user authentication
export function AuthContextProvider({children}){
    // State for the current user
    const [user,setUser]=useState({})
  
    // Method for handling user sign up
    async function signUp(email,password){
      // Creating the user with email and password using Firebase auth
      const result=await createUserWithEmailAndPassword(auth,email,password)
      console.log(result)
      // Creating a document for the user in Firestore with an empty savedMovies array
      setDoc(doc(db,'users',email),{
          savedMovies:[]
       })
    }
  
    // Method for handling user sign in
    function signIn(email,password){
          // Signing in the user with email and password using Firebase auth
          return signInWithEmailAndPassword(auth,email,password)
    }
  
    // Method for handling user sign out
    function logOut(){
      // Signing out the user using Firebase auth
      return signOut(auth)
    }
  
    // Listening for changes in the user's authentication state
    useEffect(()=>{
      const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
      })
      // Unsubscribing from the authentication state changes when the component unmounts
      return ()=>{
          unsubscribe()
      }
    })
  
    return(
      // Providing the authentication methods and user state through the AuthContext
      <AuthContext.Provider value={{signUp,logOut,signIn, user}}>
        {children}
      </AuthContext.Provider>
    )
  }
  
  // Exporting the UserAuth hook for accessing the AuthContext
  export function UserAuth(){
      return useContext(AuthContext)
  }