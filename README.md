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

### Project Screenshots
* Home page
![Home page](https://firebasestorage.googleapis.com/v0/b/peer-review-25758.appspot.com/o/screenshots%2Fhomepage.png?alt=media&token=3ecf3474-e4b1-4d8a-af2a-0b4fbe4d7766)
* Admin Dashboard
    ![admin dashboard](https://firebasestorage.googleapis.com/v0/b/peer-review-25758.appspot.com/o/screenshots%2FadminDashboard.png?alt=media&token=b892c534-d84c-4690-9426-47a1167f9ff7)
* Announcemnt Page
    ![admin Page](https://firebasestorage.googleapis.com/v0/b/peer-review-25758.appspot.com/o/screenshots%2FannouncementPage.png?alt=media&token=ca28d9b3-2f3a-4ab5-8836-9c11513b0ad1)
* Announcemnt Editing tool
    ![announcement editing](https://firebasestorage.googleapis.com/v0/b/peer-review-25758.appspot.com/o/screenshots%2FannouncementEditting.png?alt=media&token=22b16822-7749-40a1-8b7c-2c1adbc14a4c)
* Form Generator
    ![form generator](https://firebasestorage.googleapis.com/v0/b/peer-review-25758.appspot.com/o/screenshots%2FformGenerator.png?alt=media&token=f8c4f6b4-1c91-4993-bfe2-bc8999a8c2f0)
    ![form generator](https://firebasestorage.googleapis.com/v0/b/peer-review-25758.appspot.com/o/screenshots%2Fdatetool.png?alt=media&token=03a400cb-bb5f-49ad-90fc-1d9ec46897a6)
* Form list
    ![form list](https://firebasestorage.googleapis.com/v0/b/peer-review-25758.appspot.com/o/screenshots%2FformList.png?alt=media&token=5477ce10-4512-4033-a6cb-62b2a5479034)
* Peer Selection
    ![peer selection](https://firebasestorage.googleapis.com/v0/b/peer-review-25758.appspot.com/o/screenshots%2FpeerReview.png?alt=media&token=9131e0a7-ca5c-41b1-ab03-bf9c16411365)
* Peer Review Process
    ![process](https://firebasestorage.googleapis.com/v0/b/peer-review-25758.appspot.com/o/screenshots%2Freviewing.png?alt=media&token=e1349b0e-8af1-4388-a680-15aa68e0b251)
* Peer Review Submission
    ![submission](https://firebasestorage.googleapis.com/v0/b/peer-review-25758.appspot.com/o/screenshots%2Fsubmission.png?alt=media&token=1999603c-9938-487f-8b9b-9dd8b613fcd4)
* Peer Review Result
    ![result](https://firebasestorage.googleapis.com/v0/b/peer-review-25758.appspot.com/o/screenshots%2FpeerReviewResult.png?alt=media&token=0f8ba7df-0ee8-424c-b4c0-392c02a9dbe2)
* Project Page
    ![project page](https://firebasestorage.googleapis.com/v0/b/peer-review-25758.appspot.com/o/screenshots%2FprojectPage.png?alt=media&token=bfcfa12a-42d5-4ac6-9bcb-9d93bb97ee08)
* Project List
    ![list](https://firebasestorage.googleapis.com/v0/b/peer-review-25758.appspot.com/o/screenshots%2Fprojects.png?alt=media&token=b9ff6843-341e-4d60-b618-388b24ac9a04)
* Roster Tool
    ![roster tool](https://firebasestorage.googleapis.com/v0/b/peer-review-25758.appspot.com/o/screenshots%2FrosterTool.png?alt=media&token=324eb45c-5fc5-4639-aff4-024e5c8067e2)

### To use
> git clone the repo

> npm install

> npm start
