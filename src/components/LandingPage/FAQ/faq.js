import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './faq.css';

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = React.useState(null);

  // Example JSON object with FAQs
  const faqs = [
    {
      id: 'faq1',
      question: 'What is AdaptiLearn?',
      answer: 'AdaptiLearn is a learning platform that provides personal learning experience to the students ditching the traditional learning system where the students watch lectures first, then test their knowledge.'
    },
    {
      id: 'faq2',
      question: 'How does AdaptiLearn work?',
      answer: 'AdaptiLearn works by testing your knowledge in the chosen subject and mesaures the proficiency in each topics. It then provides resources for topics that are deemed to be less proficient. To further strenghten the weakness, the next the student wishes to test their knowledge, the next test would targert their previous weakness to verify if they have imporved.'
    },
    {
      id: 'faq3',
      question: 'Why are there only 3 subjects with 3 topics each?',
      answer: 'AdaptiLearn is a prototype concept to show to the world the power of adaptive learning. As we get more people to believe in our cause, so will our development towards this project.'
    },
    // Add more FAQs as needed
  ];

  const handleAccordionChange = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="faq">
      <p className='faq-Title'>Frequently asked questions</p>
      <p className= 'faq-Context'>Everything you need to know about AdaptiLearn.</p>
      <div className="faq-Container">
        {faqs.map((faq, index) => (
          <Accordion
            key={faq.id}
            expanded={index === expandedIndex}
            onChange={() => handleAccordionChange(index)}
          >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              id={index}
            >
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}