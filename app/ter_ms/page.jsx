import React from 'react'
import { BsCheck2Square } from "react-icons/bs";
import Navbar from '../(with-navbar)/componenets/Navbar/Navbar'
import Footer from '../(with-navbar)/componenets/Footer/Footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl px-6 bg-[#fafafa] p-10 rounded-2xl border-2 shadow-2xl text-gray-800 leading-relaxed container mx-auto text-center my-32">
        <h1 className="text-3xl font-bold mb-6 text-[#17549A]">
          Services and Terms & Conditions
        </h1>

        {/* Training Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-left text-[#e61a2b]">
            Training Participation Policies and Terms
          </h2>
          <ul className="space-y-3 text-left">
            {[
              "The trainee must follow all rules and regulations during the training period.",
              "Participate in the training on the specified date and time.",
              "Be present on time for the training program and ensure attendance.",
              "Maintain a proper environment during training and do not disrupt discipline in any way.",
              "Do not engage in any anti-social, obscene, or other inappropriate activities.",
              "No use, sale, or exchange of tobacco, alcohol, or similar products is allowed.",
              "Refrain from using a mobile phone during the training program.",
              "Maintain continuous communication with the authorities during training.",
              "Pay the specified fee to participate in the training.",
              "The authorities may take necessary action, including expulsion, if rules are violated.",
              "Personal and family information will remain confidential.",
              "The authorities may change the training content or terms at any time."
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <BsCheck2Square className="text-blue-800 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Internship Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-left text-[#e61a2b]">
            Paid Internship Participation Policies and Terms
          </h2>
          <ul className="space-y-3 text-left">
            {[
              "The intern must perform duties with full time and attention.",
              "No salary or compensation will be provided during the internship period.",
              "Maintain regular communication with the authorities during the internship.",
              "Do not engage in discrepancies or abnormal activities.",
              "Do not disclose any confidential information during the internship.",
              "No sharing of personal, family, or internship-related data without permission.",
              "Interns must follow all office rules and regulations.",
              "Complete all tasks and assignments given by the authorities.",
              "Respect deadlines set by the authorities.",
              "Authorities may change internship terms and policies if necessary.",
              "Pay the fee specified by the authorities to participate in the internship.",
              "Report unusual incidents immediately to the authorities.",
              "Submit a report or presentation at the end of the internship.",
              "Do not disclose confidential or personal information of the authorities."
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <BsCheck2Square className="text-blue-800 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Computer Training Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-left text-[#e61a2b]">
            Computer & Training Participation Policies and Terms
          </h2>
          <ul className="space-y-3 text-left">
            {[
              "Trainees must perform duties with attention and punctuality.",
              "Be present at the specified time for all sessions.",
              "Submit a report or presentation at the end of the course.",
              "Maintain regular communication with the authorities during the course.",
              "Pay the specified fee during the course.",
              "Do not disclose personal, family, or training-related data without permission.",
              "Report any unusual incidents immediately to the authorities.",
              "Personal and family information will remain confidential.",
              "The authorities may change the training content or policies at any time."
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <BsCheck2Square className="text-blue-800 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}