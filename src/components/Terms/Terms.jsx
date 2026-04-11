import React from "react";
import "./Terms.css";
import Footer from "../footer/footer";
import { FaCheck } from "react-icons/fa";

const phases = [
  "User Registration",
  "Profile Verification",
  "Blood Request Posting",
  "Donor Matching",
  "Communication Between Users",
  "Emergency Response",
  "Request Completion",
];

const terms = [
  "By registering on this platform, you agree to provide accurate and complete information.",
  "Users must ensure that their blood group, contact details, and location are correct.",
  "This platform is only meant for emergency blood requests and donor connections.",
  "The platform follows these steps to connect donors and recipients:",
  "Users must respond responsibly to blood requests and avoid false or misleading information.",
  "Any misuse of the platform, including fake requests or spam, may lead to account suspension.",
  "We are not responsible for any medical complications arising from blood donation or transfusion.",
  "The platform only connects donors and recipients; it does not provide medical services.",
  "Users are responsible for verifying donor eligibility and medical safety before donation.",
  "We do not guarantee the availability of donors at all times.",
  "The platform is not liable for delays in response or unsuccessful requests.",
  "Users must not use this platform for commercial or illegal purposes.",
  "We respect user privacy and do not share personal data without consent except in emergencies.",
  "Any disputes arising from the use of this platform will be subject to applicable local laws.",
  "We reserve the right to modify or terminate services at any time without prior notice.",
  "Failure to follow terms may result in permanent account suspension.",
  "Users are encouraged to regularly review the Terms & Conditions for updates.",
];

const Terms = () => {
  return (
    <>
    
    
    <section className="terms-page">
      <div className="container">

        <h2 className="terms-heading">
          Terms & Conditions – Emergency Blood Request Platform
        </h2>

        <ol className="terms-list">
          {terms.map((term, idx) => {
            if (idx === 3) {
              return (
                <React.Fragment key={idx}>
                  <li>{term}</li>

                  <li className="checklist">
                    <ul>
                      {phases.map((phase, i) => (
                        <li key={i}>
                          <FaCheck className="icon" /> {phase}
                        </li>
                      ))}
                    </ul>
                  </li>
                </React.Fragment>
              );
            }

            return <li key={idx}>{term}</li>;
          })}
        </ol>

      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Terms;