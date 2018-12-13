
import {withRouter} from 'react-router-dom';

const UserSignOut = (props) => {
    
    props.signOut();
    // <Redirect to="/" />
    props.history.push('/');
    return null;

}

export default withRouter(UserSignOut);