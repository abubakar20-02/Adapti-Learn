import CardsContainer from './Card/CardContainer';
import TitleContainer from './title/title';
import ReviewContainer from './review/reviewContainer';
import FAQ from './FAQ/faq'
import ContactUs from './ContactUs/contactus'

function LandingPage() {
    return(
<div className="flex-container">
{/* <NavBar signOut={signOut}/> */}
<div className="main-content">
<TitleContainer/>
<CardsContainer/>
</div>
<ReviewContainer/>
<div className="landingPage-SecondHalf">
<FAQ/>
<ContactUs/>
{/* <button onClick={callAPI}>call api</button> */}
</div>
</div>
    );
  }

  export default(LandingPage);