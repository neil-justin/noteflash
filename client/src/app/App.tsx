import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './routes/Register';
import { EmailVerificationReminder } from './routes/EmailVerificationReminder';
import Signin from './routes/Signin';
import AllNotes from './routes/AllNotes';
import Archive from './routes/Archive';
import Trash from './routes/Trash';

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
          <Route
            path='/all-notes'
            element={<AllNotes />}
          />
          <Route
            path='/archive'
            element={<Archive />}
          />
          <Route
            path='/trash'
            element={<Trash />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
