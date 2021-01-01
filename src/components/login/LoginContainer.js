import { useState } from 'react'
import './LoginContainer.css'
import { authenticationService } from '../../_services/authentication.service'


export default function LoginContainer({ history }) {

    if (authenticationService.currentUserValue) { 
        history.push('/');
    }
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        authenticationService.login(email, password)
            .then(_ => history.push('/'))
    }

	return (
		<div id="user-container">

            <form id="authorization-form" onSubmit={onSubmit}>

                <label>Login</label>
                <input value={email} type="text" onChange={e => setEmail(e.target.value)} />

                <label>Password</label>
                <input value={password} type="text" onChange={e => setPassword(e.target.value)} />

                <button className="login">Login</button>

            </form>

        </div>
	)
}
