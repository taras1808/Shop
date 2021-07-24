import { useState } from 'react'
import '../Account.css'
import { Link } from 'react-router-dom'
import { authenticationService } from '../../../_services/authentication.service'


export default function RegistrationContainer({ history }) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        authenticationService.register(firstName, lastName, email, password)
            .then(
                result => history.push('/authentication/'),
                error => alert(error)
            )
    }

	return (
		<div id="account-block">

            <form onSubmit={onSubmit}>

                <h1>Create Account</h1>

                <label>First Name</label>
                <input value={firstName} type="text" onChange={e => setFirstName(e.target.value)} required/>

                <label>Last Name</label>
                <input value={lastName} type="text" onChange={e => setLastName(e.target.value)} required/>

                <label>Email</label>
                <input value={email} type="email" onChange={e => setEmail(e.target.value)} required/>

                <label>Password</label>
                <input value={password} type="password" onChange={e => setPassword(e.target.value)} required/>

                <button>Create Account</button>

            </form>

            <span className="change-auth">OR</span>

            <Link className="change-auth" to="/authentication/">Sign in</Link>

        </div>
	)
}
