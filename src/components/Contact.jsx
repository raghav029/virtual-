import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { one } from "../assets";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "sujata@jsmastery.pro",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-20 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] p-8 rounded-2xl'
      >
        
        <h3 className="text-8xl text-justify mt-40"> 100 ACTIONS FOR PEACE</h3>
        <h3 className="text-3xl  text-justify mt-10"> An Action for Peace is an action, activity, or project that works towards the promotions of peace and is carried out by volunteers. An Action for Peace is open to the public, inviting people to join. It can last between 1 hour and 2 weeks.
.</h3>
        {/* <img
            src={one}
            alt={one}
            className='w-[60%] h-[40%] rounded-lg mt-10 ml-20'
          />
          <p className={[styles.sectionSubText]}>In 1936 a revolt of the army led to a civil war in Spain that lasted several years and caused great suffering for the population. A relief programme carried out by SCI volunteers was set up in order assist civilians in the Spanish Civil War: evacuation of refugees and food programmes for children and old people. The campaign leader later wrote a book with the peculiar title "It did not start in Spain", with which he wanted to point out the peace work of SCI.
</p> */}
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[950px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
