import React from "react";
import "./HowItWorks.css";

import requestIcon from "../../../assets/icon-request-blood.png";
import formIcon from "../../../assets/icon-form.png";
import notifyIcon from "../../../assets/icon-notify.png";
import connectIcon from "../../../assets/icon-connect.png";
import saveLifeIcon from "../../../assets/icon-save-life.png";
import registerIcon from "../../../assets/icon-register.png";
import  {motion} from 'framer-motion';

const steps = [
  {
    icon: registerIcon,
    title: "Register",
    text: "Create your account by entering basic details. Join our platform to request or donate blood anytime during emergencies.",
  },
  {
    icon: requestIcon,
    title: "Request Blood",
    text: "Raise a blood request by providing patient details. This helps us connect you with the right donors quickly.",
  },
  {
    icon: formIcon,
    title: "Fill Quick Form",
    text: "Enter blood group, location, and urgency level. The process is simple and takes only a few seconds.",
  },
  {
    icon: notifyIcon,
    title: "Notify Donors",
    text: "Nearby donors and hospitals are instantly alerted. Notifications ensure faster response in critical situations.",
  },
  {
    icon: connectIcon,
    title: "Get Connected",
    text: "Directly connect with available donors or hospitals. Communicate quickly to arrange blood without delays.",
  },
  {
    icon: saveLifeIcon,
    title: "Save Lives",
    text: "Timely blood donation can make a life-saving difference. Your action helps someone in urgent need.",
  },
];
const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        <motion.h2 initial={{opacity:0,y:-100}} whileInView={{opacity:1,y:0}} transition={{delay:0.9,type:"spring"}} viewport={{once:true}}>How It Works</motion.h2>
        <motion.p initial={{opacity:0,y:100}} whileInView={{opacity:1,y:0}} transition={{delay:1.1,type:"spring"}} viewport={{once:true}} className="subtitle">
          A simple, fast, and reliable process designed for emergencies
        </motion.p>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <motion.div initial={{opacity:0,scale:0.8}} whileInView={{opacity:1,scale:1}} transition={{delay:1,type:"spring"}} viewport={{once:"true"}} className="step-card" key={index}>
              <img src={step.icon} alt={step.title} />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
