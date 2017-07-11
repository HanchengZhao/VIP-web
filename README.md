# VIP-web 

### Effort Breakdown for the VIP Platform
- Gathering, Clarifying, and Prototyping Specifications 
- Prototyping Interfaces
- Testing Interfaces for Usability
- Designing the System Architecture
- Structuring Database Schemas
- Specifying the API
- Building live screens:
    - New Team Request
    - New Team Approval
    - Dynamic Team Pages
    - Home Page
    - Student Interest Forms
    - Student Approval
    - Team Mentor Dashboard
    - VIP Admin Dashboard
    - Role Assignment Page
    - Peer-Evaluation Tool

### User story
* Admin
    * can CRUD announcements
    * can approve/reject/edit projects application
    * can CRUD students roster, advisor lists, upload/download rosters in csv file
    * be able to access peer-evaluation results
* Advisor
    * Apply to create a team
    * Edit information(subteam, team-specific announcement) within team page
    * CRUD members within their team
    * access to team specific peer evaluation data 
    * peer-eval
        * able to CRUD quiz questions, choose the set of questions
        * able to change/reset semester(or midterm/final) options to allow students to evaluate
        * able to pull all evaluation data of a student from all the timeline
        * check the average eval scores of students
* Student
    * All projects are clickable. Each of projects is shown by thumbnail and category by department
    * When student click a project, display this project info. And 
        * If not enrolled, display a form they can apply. Send email to the contact person.
        * If enrolled, display peer evaluation component. 
    * peer-eval:
        * able to choose students he/she wants to evaluate
        * able to see others' comment/average scores in anonymous mode( can't see who commented) only after submitting the evaluation
### To use
> git clone the repo

> npm install

> npm start
