import {useNavigate} from 'react-router-dom';
import NewMeetupForm from "../components/meetups/NewMeetupForm";

function NewMeetupPage() {

  const navigate = useNavigate();
  
  async function addMeetupHandler(meetupData){
    const url = "https://react-course-436a8-default-rtdb.firebaseio.com/meetups.json";
    const settings = {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const fetchResponse = await fetch(url, settings);
        const data = await fetchResponse.json();
        navigate('/');
        return data;
    } catch (e) {
        return e;
    }    
  }

  return <section>
    <h1>Add New Meetup</h1>
    <NewMeetupForm onAddMeetup={addMeetupHandler}/>
  </section>
}

export default NewMeetupPage;