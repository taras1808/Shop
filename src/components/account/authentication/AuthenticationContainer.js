import { useState } from 'react'
import '../Account.css'
import { authenticationService } from '../../../_services/authentication.service'
import { Link } from 'react-router-dom'


export default function AuthenticationContainer({ history }) {

    if (authenticationService.currentUserValue) { 
        history.push('/');
    }
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        authenticationService.authenticate(email, password)
            .then(
                result => history.push('/'),
                error => alert(error)
            )
    }

	return (
        <div id="account-block">

            <form onSubmit={onSubmit}>

                <h1>Sign in</h1>

                <label>Email</label>
                <input value={email} type="email" onChange={e => setEmail(e.target.value)} required/>

                <label>Password</label>
                <input value={password} type="password" onChange={e => setPassword(e.target.value)} required/>

                <button>Sign in</button>

            </form>

            <span className="change-auth">OR</span>

            <Link className="change-auth" to="/registration/">Create account</Link>

        </div>
	)
}
