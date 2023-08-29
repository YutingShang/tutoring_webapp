# Tutoring webapp

Personal website with inbuilt comment feature to collect student feedback.

Interactive and mobile responsive

On the hobbies and interests page, hover over the images to reveal descirption text.

On the student reviews page, search for student comments which will filter by content, date and subject.

With the review edit page, if you dont make any changes to a particular field, even if you clicked the 'edit' icon to expand the card, no changes will save


--------------------------------------------------------------------------------------------
BUGS:





--------------------------------------------------------------------------------------------
To add a new data field to each review when editing
1. update the mongoDB model in /models/review.ts, add new FIELD
2. In the [reviewEditId].tsx page, pass the FIELD as a props from the server to the page component in the getServerSideProps function, pass it as `null` if undefined
3. In the reviewPage, add the FIELD as a props parameter
4. Add the FIELD as another option in the `additionalFieldOptions` array which will be the options in the expanded menu. Make it conditional on whether it is already displayed on the page
5. Create two new `useState` variables, one for HIDE_FIELD (boolean) and one for LATEST_FIELD (string), to show or hide the AdditionalEditCard and to capture the latest edit input
6. Add a new case in the if..else statement in the `onAddField` function for when that FIELD gets selected and added
7. Create a new ON_REMOVE_FIELD() function for when you press 'X' to remove the AdditionalEditCard
8. Create a new <AdditionalEditCard> under the existing ones and fill in the relevant fields
9. In the `onSubmitChanges` function, put a new attribute for that FIELD in the `axios.put` request. Make it conditional to whether it has been edited
10. In the /api/reviews.ts API endpoint, add a new attribute in the `ReviewModel.findOneAndUpdate` function for that FIELD