import { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async meetupData => {
    setIsLoading(true);
    const url = "https://react-course-436a8-default-rtdb.firebaseio.com/meetups.json";
    try {
        const fetchResponse = await fetch(url);
        const data = await fetchResponse.json();
        
        const meetups = [];

        for(const key in data){
          const meetup = {
            id: key,
            ...data[key]
          };
          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
        return data;
    } catch (e) {
        return e;
    }    
  }

  if(isLoading){
    return (
      <section>
          <p>Loading...</p>
      </section>
    )
  }

  return (
    <div>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups}/>
    </div>
  );
}

export default AllMeetupsPage;
