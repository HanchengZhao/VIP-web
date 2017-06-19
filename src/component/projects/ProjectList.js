import React, { Component } from 'react';
import ProjectCard from './ProjectCard';

const projectsInfo = [
  { 
    id:1,
    title: "High Performance Computing",
    subtitle: "Code to Scale",
    description: "Compute nodes pose thousand-way parallelism between parts of application, such as task parallelism, process-level and thread-level parallelism within a process and a core, along with hardware multithreading, instruction-level parallelism and pipelining of instructions. We see that technological advances have been instrumental in all scientific domains, be it astrophysics, medicine, finance and so on. However a major concern is if legacy code can tap into the massive potential of hardware resources; there is a real challenge to extract these parallelism. Moreover these codes are highly science-driven with varying workloads that demand dynamic load balancing and locality-aware scheduling. Modernizing legacy applications comprising of hundreds and thousands of lines of code for current and emerging architectures is a real challenge."
  },
  {
    id:2,
    title: "Cloud Crypto",
    subtitle: "Data security for the new age",
    description: "The Cloud Crypto team has several aims.  We are working actively on ATM security using biometrics,Blockchain voting systems, Penetration Testing, Secure Web App Design, and Fully Homomorphic Encryption."
  },
  {
    id:3,
    title: "Artgineering",
    subtitle: "Data security for the new age",
    description: "The Cloud Crypto team has several aims.  We are working actively on ATM security using biometrics,Blockchain voting systems, Penetration Testing, Secure Web App Design, and Fully Homomorphic Encryption."
  },
  {
    id:4,
    title: "High Performance Computing",
    subtitle: "Code to Scale",
    description: "Compute nodes pose thousand-way parallelism between parts of application, such as task parallelism, process-level and thread-level parallelism within a process and a core, along with hardware multithreading, instruction-level parallelism and pipelining of instructions. We see that technological advances have been instrumental in all scientific domains, be it astrophysics, medicine, finance and so on. However a major concern is if legacy code can tap into the massive potential of hardware resources; there is a real challenge to extract these parallelism. Moreover these codes are highly science-driven with varying workloads that demand dynamic load balancing and locality-aware scheduling. Modernizing legacy applications comprising of hundreds and thousands of lines of code for current and emerging architectures is a real challenge."
  },
  {
    id:5,
    title: "Cloud Crypto",
    subtitle: "Data security for the new age",
    description: "The Cloud Crypto team has several aims.  We are working actively on ATM security using biometrics,Blockchain voting systems, Penetration Testing, Secure Web App Design, and Fully Homomorphic Encryption."
  },
  {
    id:6,
    title: "Artgineering",
    subtitle: "Data security for the new age",
    description: "The Cloud Crypto team has several aims.  We are working actively on ATM security using biometrics,Blockchain voting systems, Penetration Testing, Secure Web App Design, and Fully Homomorphic Encryption."
  }
]


class ProjectList extends Component {
    constructor() {
      super();
      this.state = {
        projects : projectsInfo
      }
    }
    render () {
      let projectCard = this.state.projects.map((project) => 
          <ProjectCard key={project.id} project={project} />
        )
      return (
        <div>
          {projectCard}
        </div>
      )
    }
}

export default ProjectList;