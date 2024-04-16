import { post } from 'aws-amplify/api';
import AuthenticatorWrapper from '../AuthenticatorWrapper';
import NavBar from '../LandingPage/LandingNavBar/navbar';
import Footer from '../Footer/footer';
import './HomePage.css';
import QuestionCard from './QuestionCard';
import YT from '../videos/YT';
import { useState } from 'react';


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

  const initialData = [
    {
        id: 0,
        name: 'Science',
        img: 'https://i3.ytimg.com/vi/6v8djXa-IPQ/maxresdefault.jpg',
        actionType: 'renderComponent',
        actionValue: 'BiologyComponent',
    },
    {
      id: 1,
      name: 'Math',
      img: 'https://i3.ytimg.com/vi/6v8djXa-IPQ/maxresdefault.jpg',
      actionType: 'renderComponent',
      actionValue: 'BiologyComponent',
  },
  {
    id: 2,
    name: 'Computer',
    img: 'https://i3.ytimg.com/vi/6v8djXa-IPQ/maxresdefault.jpg',
    actionType: 'renderComponent',
    actionValue: 'BiologyComponent',
},
    // More initial data if necessary...
];

const [data, setData] = useState(initialData);
    const [isInitialView, setIsInitialView] = useState(true); // State to track view

    const resetData = () => {
        setData([...initialData]);
        setIsInitialView(true); // Reset to initial view
    };

    const handleDataChange = (newData) => {
        setData(newData);
        setIsInitialView(false); // Change to detailed view
    };
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
              { <QuestionCard subject={"Science"}/>}
              </div>
            
            <Footer/>
          </>
        )}
      </AuthenticatorWrapper>
    </div>
  );
}

export default(HomePage);