import './title.css'
import Button from '../../button';
export default function titleContainer() {
  return (
  <div className="titleContainer">
  <p className='titleHeader'>Adapti Learn</p>
  <p className='titleContent'> Everyone is different, so should their learning process. AdaptiLearn provides a truly personalised tailormade learning plan which will help you cover your weaknesses in any subject.
  </p>
  <Button>Get Learning</Button>
  </div>
  );
}