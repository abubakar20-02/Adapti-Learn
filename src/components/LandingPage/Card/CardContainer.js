import MultiCards from './MultiCards';
import abu from '../../../Resources/WhatsApp Image 2023-10-06 at 23.21.16.jpeg';
import kani from '../../../Resources/Kanishka.jpg';
import hamzu from '../../../Resources/Hamza.jpg';
import './card.css';
import Button from '../../button';


export default function CardContainer() {
      // Array of objects containing the data for each card
  const cardsData = [
    {
      img: abu,
      title: 'Strenghten Your Weakness with Our Adaptive Learning System',
      description: 'Our algorithm locates weaknesses in your knowledge then recommend resources to fill the gaps along with generating personalised test for you.'
    },
    {
      img: kani,
      title: 'Unleash the Infinite: AI-Powered Questions for Endless Exploration',
      description: 'Our application utilizes cutting-edge artificial intelligence technology to continuously generate fresh and dynamic questions.'},
    {
      img: hamzu,
      title: 'Supercharge Your Learning Experience Through Hands-On Engagement',
      description: 'Embark on a Journey of Discovery with AdaptiLearn: Unveiling the Art of Mastering Your Chosen Topic through Active Participation.'
    },
    // Add more card data objects here
  ];

    return (
    <div className="cardContainer">
    <p className='cardTitle'>Unlock Your Potential with Revolutionized Learning</p>
    <MultiCards cardsData= {cardsData}/>
    <Button>Test Yourself</Button>
    </div>
    );
}