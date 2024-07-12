// src/components/ProjectsSection.js
import React from "react";
import { motion } from "framer-motion";

const projects = [
  { title: "Project One", description: "Description for project one" },
  { title: "Project Two", description: "Description for project two" },
  // Add more projects here
];

const ProjectsSection = () => (
  <section className="py-20 bg-gray-100">
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold mb-10 text-center">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p>{project.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
