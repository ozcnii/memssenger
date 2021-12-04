import Preloader from '../../Preloader/Preloader'
import BodyComponent from '../../Universals/Body/BodyComponent'
import LastItem from './LastItem/LastItem'

function LastList({ users, isLoading, setDialog}) {
    return (
        <BodyComponent>
            {isLoading 
                ? <Preloader/> 
                : users.length !==0 
                    ? users.map(user => <LastItem key={user.uid} user={user} setDialog={setDialog} />) 
                    : 'пользователей не найдено' }
            
        </BodyComponent>
    )
}
export default LastList