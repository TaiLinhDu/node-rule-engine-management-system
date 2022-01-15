import { IRole } from 'models/role.model';
import { IUserRole } from 'models/user-role.model';
import PropTypes from "prop-types";
import react, { useContext } from 'react';
import { userRoleService } from 'services/userRoleService.ts/user-role-service.ts';

interface UserRoleItemProps {
    userRole: IUserRole;
    roleName: string | undefined;
    onDeleteUserRole: Function;
}

const UserRoleItem = (props: UserRoleItemProps) => {

    const onDeleteUserRoleHandler = () => {
        if (props.userRole._id) {
            userRoleService.deleteUserRole(props.userRole._id)
            .then (res => {
                if (res.status === 200) {
                    props.onDeleteUserRole(props.userRole);
                    alert("delete successful");
                    
                } else {
                    alert("delete unsuccessful. Please try it again !");
                }
            })
            .catch (err => {
                console.log(err)
                alert("delete unsuccessful. Please try it again !");
            })
        }
    }

    return (
        <div className='user-role-item'>
            <span>{props.roleName} </span> 
            <span><input type='button' value=" X " onClick={onDeleteUserRoleHandler} /></span>
        </div>
    );
}

UserRoleItem.propTypes = {
    userRole: PropTypes.object,
    roleName: PropTypes.any,
    onDeleteUserRole: PropTypes.func
}

export default UserRoleItem;