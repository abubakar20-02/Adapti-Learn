import { post } from 'aws-amplify/api';
import AuthenticatorWrapper from '../AuthenticatorWrapper';
import NavBar from '../LandingPage/LandingNavBar/navbar';
import Footer from '../Footer/footer';
import './HomePage.css';
import QuestionCard from './QuestionCard';


function HomePage() {

  const callAPI= async ()=>{
    const APIName = "restAPI";
    const apiPath = '/getQuestions';
    const response = post({apiName: APIName, path: apiPath});
    const reply = (await response.response).body;
    const json = await reply.json();
    console.log(json);
    return json;
  }

  const generateQuestion= async ()=>{
    const data = {"subject": "Math", "topic":"Fractions"}
    const APIName = "restAPI";
    const apiPath = '/generateQuestion';
    const response = post({apiName: APIName, path: apiPath ,options:{ body: data}});
    const reply = (await response.response).body;
    const json = await reply.json();
    console.log(json);
  }

// when google signs in, redirects is weirds, normal sign in doesnt do it.
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '90vh'
    }}>
      <AuthenticatorWrapper>
        {({ signOut, user }) => (
          <>
            <NavBar/>
            {/* <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
            <button onClick={callAPI}>call api</button> */}
            <div className='questionContainer'>
              <QuestionCard/>
            </div>
            <Footer/>
          </>
        )}
      </AuthenticatorWrapper>
    </div>
  );
}

export default(HomePage);