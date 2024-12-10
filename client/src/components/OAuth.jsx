import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import app from "../firebase";  
import { useDispatch } from "react-redux";
import { signInSuccess } from "../user/userSlice.js";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        try {
            const googleProvider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, googleProvider);

            const res = await fetch('api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })

            const data = await res.json()
            dispatch(signInSuccess(data))
            navigate('/')
            
        } catch (error) {
            console.log("cold not sign in with google ",error)
        }
    }


  return (
    <button onClick={handleGoogleClick} type="button" className='bg-red-700 p-3 rounded-xl uppercase hover:bg-opacity-95 text-white'>Continue With Google</button>
  )
}
