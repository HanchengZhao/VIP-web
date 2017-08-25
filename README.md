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

### Tutorial 
* Admin DashBoard
    * Project Application tab  
        - Admins can Approve or Deny project applications
        - Denied Applications can be Erased or Recoved from the trash can
        - Admins can click the drop down to view all the information within the application
    * Student Application tab
        - Students appear in a table 
            - Rows are selectable
        - Selected students can be acepted or denied
            - Denied students are erased 
            - accepted students are added to the database
    * Student Roster tab
        - Students are selectable and can be deleted
        - Rosters are downloadable via Download roster button
        - Table is sortable and filterable
    * Manage Admin tab
        - Admins can crud admin
    * Manage Courses tab
        - Courses can be added to a specific team 
        - Gatekeepers for a specific major can be added or deleted from this page
* Advisor DashBoard
    * Student Application tab
        - Students appear in a table 
            - Rows are selectable
        - Selected students can be acepted or denied
            - Denied students are erased 
            - accepted students are added to the database
    * Manage Advisor tab
        - Advisors can CRUD advisors within their team
    * Edit Team information tab
        - By clicking edit all application keys are editable
            - this will make changes to the advisors team project card
        - By clicking roster a roster table will appear
            - advisors can delete selcted students from their team
            - advisors can download their roster by clicking download roster
* Student DashBoard
    * Peer Review tab 
        - under construction 
    * Roster tab
        - students can search all members of their team
    

### To use
> git clone the repo

> npm install

> npm start
