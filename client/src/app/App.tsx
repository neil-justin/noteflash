import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './routes/Register';
import { EmailVerificationReminder } from './routes/EmailVerificationReminder';
import Signin from './routes/Signin';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/register'
            element={<Register />}
          />
          <Route
            path='/email-verification-reminder'
            element={<EmailVerificationReminder />}
          />
          <Route
            path='/signin'
            element={<Signin />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
