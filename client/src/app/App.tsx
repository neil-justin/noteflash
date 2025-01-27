import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './routes/Register';
import { EmailVerificationReminder } from './routes/EmailVerificationReminder';

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
