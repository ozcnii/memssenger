import Messages from './Messages';
import NewChatButton from './NewChatButton';

function HomePage() {
    return (
      <div> 
        <div className='left-animation'>
          <Messages/>
          <NewChatButton/>
        </div>
      </div>
    );
  }
  
export default HomePage;