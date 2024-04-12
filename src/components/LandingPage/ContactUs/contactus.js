import './contactus.css'
import Button from '../../button';
export default function ContactUS() {
  return (
  <div className="contactUsContainer">
  <p className='questionTitle'>Still have questions?</p>
  <p className='questionText'> Can't find the answer you're looking for? Please contact us.</p>
  <Button>Contact us</Button>
  </div>
  );
}