import { useState } from 'react'
import './RegistrationContainer.css'


export default function RegistrationContainer() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
    }

	return (
		<div id="registration-container">

            <form id="registration-form" onSubmit={onSubmit}>

                <label>Email</label>
                <input value={email} type="text" onChange={e => setEmail(e.target.value)} />

                <label>Password</label>
                <input value={password} type="text" onChange={e => setPassword(e.target.value)} />

                <button className="registration">Register</button>

            </form>

        </div>
	)
}
