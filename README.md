# Tutoring webapp

Personal website with inbuilt comment feature to collect student feedback.

Interactive and mobile responsive

On the hobbies and interests page, hover over the images to reveal description text.

On the student reviews page, search for student comments which will filter by content, date and subject.

*Check out the website at [Tutoring-Webapp](https://xinqi.vercel.app/)*

---

Below are the two pages that are not accessible for unauthorised users, any example reviews are for demonstration purposes only.

**Admin page**

Only authorised administrators will be allowed to access this page to select reviews to display, and to make necessary spelling or information edits etc.

New reviews will be highlighted with a pale yellow color to notify the administrator.  
Reviews can then be clicked on to toggle between `displayed` and `hidden` states.

<img width="1000" alt="Screenshot 2023-09-17 at 20 53 46" src="https://github.com/YutingShang/tutoring_webapp/assets/80399681/5fdb137b-13fb-4ed6-9ea9-359ee9d7a750">

The `<AccountPanel>` with the Google login credentials will be visible on every page, with the option to `Sign out` of the session.  
Filter pills allows the administrator to easily visualise the publicly displayed and hidden reviews.

<img width="1452" alt="Screenshot 2023-09-17 at 20 54 37" src="https://github.com/YutingShang/tutoring_webapp/assets/80399681/26c0083c-9689-4a31-91dd-522263d757bd">

**Review Edit page**

After clicking on the `pen` icon for a specific review on the Admin page, a dynamic page is opened for each review. 

The administrator can modify the fields, which keeps track of a light version history including `original`, `current` and then the new `edit`.  
`Date` and `Exam board` fields can also be added by the administrator.

If you don't make any changes to a particular field, even if you clicked the 'edit' icon to expand the card, no changes will save.  
`HINT` - type `anon` for the student name to be anonymous

<img width="1458" alt="Screenshot 2023-09-17 at 20 56 14" src="https://github.com/YutingShang/tutoring_webapp/assets/80399681/4eb60ce0-cedb-4d0b-a95b-2dbfa2a1968f">

--------------------------------------------------------------------------------------------

BUGS: 
1. Admin review edit page, the outside click handler doesnt work to minimise the menu when you click on the same line as the button 'Add extra'. To go around this, just click else where on the page or the 'Add extra' button to minimise the menu again.

   `FIXED` (with inline-block) in commit `c2927361af5d98091e9f876cc1035227a4811b46`
2. Card flashes blue and white if you click it too many times consecutively on the admin page. This is due to the UI being updated on the client side first, before the server updating the `displayed` value and then the page refreshing again.

   `FIXED` by removing refresh after axios request in commit `6f4fe85bacc9bd744c847cd42a17ae1ddc1db10c`


--------------------------------------------------------------------------------------------
NOTE TO DEVELOPER:  

To add a new data field to each review when editing (e.g. `Date` or `Exam board`)

1. Update the MongoDB model in `/models/review.ts`, add new FIELD
2. In the [reviewEditId].tsx page, pass the FIELD as a props from the server to the page component in the `getServerSideProps` function, pass it as `null` if undefined
3. In the reviewPage, add the FIELD as a props parameter
4. Add the FIELD as another option in the `additionalFieldOptions` array which will be the options in the expanded menu. Make it conditional on whether it is already displayed on the page
5. Create two new `useState` variables, one for HIDE_FIELD (boolean) and one for LATEST_FIELD (string), to show or hide the `AdditionalEditCard` and to capture the latest edit input
6. Add a new case in the if..else statement in the `onAddField` function for when that FIELD gets selected and added
7. Create a new ON_REMOVE_FIELD() function for when you press 'X' to remove the `AdditionalEditCard`
8. Create a new `<AdditionalEditCard>` under the existing ones and fill in the relevant fields
9. In the `onSubmitChanges` function, put a new attribute for that FIELD in the `axios.put` request. Make it conditional to whether it has been edited
10. In the `/api/reviews.ts` API endpoint, add a new attribute in the `ReviewModel.findOneAndUpdate` function for that FIELD
