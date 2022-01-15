import React, { useContext, useEffect, useState } from 'react';
import { IUser } from '../../models/user.model';
import PropTypes from "prop-types";
import { userService } from '../../services/userService/user-service';
import { RoleContext } from 'helper/contexts/role-context';
import { IRole } from 'models/role.model';
import { IUserRole } from 'models/user-role.model';
import { userRoleService } from 'services/userRoleService.ts/user-role-service.ts';
import UserRoleItem from 'components/UserItem/UserRoleItem';
import _ from 'lodash';

interface UserItemProps {
    user: IUser;
}

const itemStyle = {
    padding: "10px 0",
}

const UserItem = (props: UserItemProps) => {

    const [userRoleList, setUserRoleList] = useState<Array<IUserRole>>([]);
    
    const roles: Array<IRole> = useContext(RoleContext);

    useEffect( () => {
        userRoleService.getUserRoles({userId: props.user._id})
        .then (res => {
            if (res.status === 200 && res.data.docs){
                setUserRoleList(res.data.docs);
            }
        })
    }, [])


    const onSelectRoleToAdd = (event: any) => {
        console.log("SELECT VALUE",event.target.value);

        if (event.target.value === -1) {
            alert("please select role to add to this user")
            return;
        }

        if (!userRoleList.some(userRole => userRole.roleNumber == event.target.value) && props.user._id){
            const newUserRole: IUserRole = {
                roleNumber: event.target.value,
                userId: props.user._id
            }
            userRoleService.postNewUserRole(newUserRole)
            .then (res => {
                if (res.status === 201 && res.data.docs) {
                    let newUserRoleList = _.cloneDeep(userRoleList);
                    let createdUserRole : IUserRole = res.data.docs;
                    newUserRoleList.push(createdUserRole);
                    setUserRoleList(newUserRoleList);
                    alert ("Add a new user role successful");
                } else {
                    alert ("network problem! Please try it again.")
                }
            })
            .catch(err => {
                console.log(err);
                alert ("unknown problem! Please try it again.")
            })
        } else {
            alert ("User role is already added!")
        }

    }

    const onDeleteUserRole = (userRole: IUserRole) => {
        let newUserRoleList = _.cloneDeep(userRoleList);
        setUserRoleList(newUserRoleList.filter(userRoleElement => userRoleElement.roleNumber !== userRole.roleNumber));
    }
    
    return (
        <div className="user-item" style={itemStyle}>
            <div>Email: {props.user.email}</div>
            <div className='user-role'>
                <div>Select Role To Add To This User: </div>
                <select 
                    onChange={onSelectRoleToAdd}
                >
                    <option value={-1}>Select Role</option>
                    {roles && roles.map( (role: IRole) => (<option value={role.roleNumber}>{role.name}</option>))}
                </select>
                <div className='user-role-list'>
                    <div>Role List:</div>
                    {userRoleList && userRoleList.map(userRole => 
                        <UserRoleItem 
                            userRole={userRole} 
                            roleName={roles.find(role => role.roleNumber === userRole.roleNumber)?.name} 
                            onDeleteUserRole={onDeleteUserRole}
                        />)}
                </div>
            </div>
            <div>Phonenumber: {props.user.phoneNumber}</div>
        </div>
    );
}

UserItem.propTypes = {
    user: PropTypes.object,
}

export default UserItem;

