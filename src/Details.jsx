import React, { useState, useEffect } from 'react';
import callsData from './calls.json';
import { motion } from 'framer-motion';
import './Details.css';

const Details = () => {
  const [activities, setActivities] = useState([]);
  const [expandedCallId, setExpandedCallId] = useState(null);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    // Simulate fetching activities from API
    // Sorting activities by date in descending order (latest dates first)
    const sortedActivities = callsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setActivities(sortedActivities);
  }, []);

  const handleCallClick = (callId) => {
    // Toggle expanded state for the clicked call
    console.log("THE ACCORDION IS CLICKED");
    setExpandedCallId((prevExpandedCallId) => (prevExpandedCallId === callId ? null : callId));
  };

  const getCallTypeSVG = (callType) => {
    switch (callType) {
      case 'answered':
        return <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="green" /></svg>;
      case 'voicemail':
        return <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="blue" /></svg>;
      case 'missed':
        return <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="red" /></svg>;
      default:
        return null;
    }
  };

  const handleArchiveAll = () => {
    // Update is_archived values to their reverse for all calls
    const updatedActivities = activities.map((activity) => ({ ...activity, is_archived: true}));
    setActivities(updatedActivities);
  };
  const handleUnArchiveAll = () => {
    // Update is_archived values to their reverse for all calls
    const updatedActivities = activities.map((activity) => ({ ...activity, is_archived: false}));
    setActivities(updatedActivities);
  };
  const handleArchiveButton = (callId) => {
    // Find the call with the given callId
    const updatedActivities = activities.map((activity) =>
      activity.id === callId ? { ...activity, is_archived: !activity.is_archived } : activity
    );
    setActivities(updatedActivities);
  };
  return (
    <motion.div className="wrapper" style={{}}>
      <div className="buttonAr" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' , position:'sticky', top:'80px',marginBottom:'20px', backgroundColor:'#242424', height:'60px'}}>
        
        {showArchived ? <button onClick={handleUnArchiveAll}>Unarchive All</button> : <button onClick={handleArchiveAll}>Archive All</button>}
        
        <button onClick={() => setShowArchived(!showArchived)}>
          {showArchived ? 'Show Active Calls' : 'Show Archived Calls'}
        </button>
      </div>
      {activities
        .filter((activity) => (showArchived ? activity.is_archived : !activity.is_archived))
        .map((activity, index) => (
          <motion.div key={activity.id} className="activity-container" >
            {index === 0 || activity.call_type === 'missed' || new Date(activity.created_at).toDateString() !== new Date(activities[index - 1].created_at).toDateString() ? (
              <div className="date-container" key={index}>
                <div className="line"></div>
                <h2>{new Date(activity.created_at).toDateString()}</h2>
                <div className="line"></div>
              </div>
            ) : null}

            {/* Display Call Details */}
            <motion.div
              className="call-details"
              whileTap={{backgroundColor:'grey'}}
              whileHover={{ scale: 1.002, boxShadow: '0 2px 4px rgba(255, 255, 255, 0.5)' }}
            >

              <motion.div className="call-summary" style={{ width: '95%' }}>
                <motion.div className="outer_details" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}   onClick={() => handleCallClick(activity.id)}>
                  <p style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>{getCallTypeSVG(activity.call_type)}{activity.to}</p>
                  <p style={{ color: 'grey' }}>{new Date(activity.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </motion.div>
                {expandedCallId === activity.id && (
                  <motion.div className="accordion-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p>Duration: {activity.duration} seconds <br /><br /> From: {activity.from}</p>
                    <button style={{ height: '50px' }}  onClick={()=> handleArchiveButton(activity.id)} whileHover={{ scale: 1.002, boxShadow: '0 2px 4px rgba(255, 255, 255, 0.5)' }}>
                      {activity.is_archived ? 'Unarchive' : 'Archive'}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
    </motion.div>
  );
}

export default Details;











// import React, { useState, useEffect } from 'react';

// const Details = () => {
//   const baseUrl = 'https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/';
//   const [activities, setActivities] = useState([]);
//   const [specificCall, setSpecificCall] = useState(null);

//   useEffect(() => {
//     // Fetch activities when the component mounts
//     fetch(`${baseUrl}/activities`)
//       .then(response => {
//         // Check if the response status is OK before parsing
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error(`Error fetching activities: ${response.statusText || 'Unknown error'}`);
//         }
//       })
//       .then(data => setActivities(data))
//       .catch(error => {
//         console.error('Error fetching activities:', error);
//         console.error('Error details:', error.message, error.response);
//       });
//   }, []);
  
//    // Empty dependency array means this effect runs once when the component mounts

//   // Function to fetch specific call details
//   // Function to fetch specific call details
// const fetchSpecificCall = async (callId) => {
//     try {
//       const response = await fetch(`${baseUrl}/activities/${callId}`);
      
//       // Check if the response status is OK (200) before parsing
//       if (response.ok) {
//         const data = await response.json();
//         setSpecificCall(data);
//       } else {
//         console.error('Error fetching specific call:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error fetching specific call:', error);
//     }
//   };
  

//   return (
//     <div>
//       <h1>Details Component</h1>

//       {/* Display Activities */}
//       <ul>
//         {activities.map(activity => (
//           <li key={activity.id}>
//             {activity.direction} call from {activity.from} to {activity.to}
//           </li>
//         ))}
//       </ul>

//       {/* Display Specific Call Details */}
//       {specificCall && (
//         <div>
//           <h2>Specific Call Details</h2>
//           <p>Direction: {specificCall.direction}</p>
//           <p>From: {specificCall.from}</p>
//           <p>To: {specificCall.to}</p>
//           {/* Add more details as needed */}
//         </div>
//       )}

//       {/* Fetch Specific Call Details Button */}
//       <button onClick={() => fetchSpecificCall('123')}>Fetch Specific Call</button>
//     </div>
//   );
// };

// export default Details;