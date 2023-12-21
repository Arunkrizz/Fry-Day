// SignUpComponent.js
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../utils/firebase';

const SignUpComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Send email verification
      await sendEmailVerification(userCredential.user);

      // Inform user to check email for verification link
      alert('Verification email sent. Please check your email.');

    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUpComponent;
