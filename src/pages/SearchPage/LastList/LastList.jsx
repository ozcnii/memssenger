import Preloader from '../../../components/Preloader/Preloader'
import BodyComponent from '../../../components/Layout/Body/BodyComponent'
import LastItem from './LastItem/LastItem'

function LastList({ users, isLoading, setDialog}) {
    return (
        <BodyComponent>
            {isLoading 
                ? <Preloader/> 
                : users.length !==0 
                    ? users.map(user => <LastItem key={user.uid} user={user} setDialog={setDialog} />) 
                    : <div className='not-dialogs'>Пользователей не найдено</div> }
            
        </BodyComponent>
    )
}
export default LastList