import React, { InputHTMLAttributes, useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios-backend';
import { IUser } from 'models/user.model';
import { userService } from 'services/userService/user-service'
import UserItem, { } from 'components/UserItem/UserItem';
import { IUserRole } from 'models/user-role.model';
import { userRoleService } from 'services/userRoleService.ts/user-role-service.ts';
import { RoleContext } from 'helper/contexts/role-context';

import { RoleNumberEnum } from "helper/global-variable-helper/global-variable"
import UserRuleItem from 'components/UserRuleItem/UserRuleItem';


const AdminDashboard = () => {


  // actual user
  let userString = sessionStorage.getItem("user");
  const [user, setUser] = useState<IUser>(userString? JSON.parse(userString) : {}) ;
  console.log("User", user);

  const [userList, setUserList] = useState<Array<IUser>>();

  // for role management
  const [userRoleList, setUserRoleList] = useState<Array<IUserRole>>() ;
  const [searchedUserToManagementRole, setSearchedUserToManagementRole] = useState<Array<IUser>>();
  const inputEmailToManagementRoleRef = useRef<HTMLInputElement>(null);


  // for user rule management
  const [searchedUserToManagementUserRule, setSearchedUserToManagementUserRule] = useState<Array<IUser>>();
  const inputEmailToManagementRulesRef = useRef<HTMLInputElement>(null);

  const history = useHistory();

  let getAllUserRolePromise = userRoleService.getUserRoles({userId: user._id});;

  useEffect(() => {

    if (user) {
      getAllUserRolePromise
      .then (res => {
        if (res.status === 200) {
          console.log("USER ROLE", res.data.docs);
          let fetchedUserRoleList = res.data.docs;
          setUserRoleList(fetchedUserRoleList);

          if (!user || (user && !user.isAdmin && !fetchedUserRoleList?.some((userRole: any) => userRole.roleNumber === RoleNumberEnum.Admin))) {
            console.log("User", user)
            console.log("Rolecheck",fetchedUserRoleList?.some((userRole: any) => userRole.roleNumber === RoleNumberEnum.Admin));
            history.push("/home");
          }
        }
      })
      .catch(err => {
        console.log(err)
      })

      userService.getUsers()
      .then((res) => {
        if (res.status === 200) {
          setUserList(res.data.docs);
          console.log("UserList", res.data.docs)
        }
      })
      .catch((err) => {
        console.log(err);
      });

    } 
  }, []);

  /**
   * search to magnagement roles
   */
  const searchUserToManagementRoleHandler = () => {
    if (inputEmailToManagementRoleRef){
      setSearchedUserToManagementRole(userList?.filter(elem => {
        if (elem.email && inputEmailToManagementRoleRef.current) {
          return elem.email.toLowerCase().includes(inputEmailToManagementRoleRef.current?.value.toLowerCase())
        }
        return false;
      }))
    }
  }

  const clearSearchUserToManagementRoleHandler = () => {
    setSearchedUserToManagementRole([]);
  }


  /**
   * function to search user to put some rule-engines
   */
  const searchUserToManagementUserRuleHandler = () => {
    if (inputEmailToManagementRulesRef){
      setSearchedUserToManagementUserRule(userList?.filter(elem => {
        if (elem.email && inputEmailToManagementRulesRef.current) {
          return elem.email.toLowerCase().includes(inputEmailToManagementRulesRef.current?.value.toLowerCase())
        }
        return false;
      }))
    }
  }

  const clearSearchUserToManagementUserRuleHandler = () => {
    setSearchedUserToManagementUserRule([]);
  }

  return (
    <>
      User Role Management: <br />
      List of Role User: <br />

      {/* Find user by Email to management roles <br />

      <label htmlFor="email">Email:</label>
      <input ref={inputEmailToManagementRoleRef} type="text" name="email"/>
      <input type="button" value="Search" onClick={searchUserToManagementRoleHandler}/> 
      <input type="button" value="Clear" onClick={clearSearchUserToManagementRoleHandler}/>  */}

      <div className="user-list">
        <div className="title">
          <div>Email</div>
          <div>Userrole</div>
          <div>Phonenumber</div>
        </div>
        {userList && userList.map(user => {
          return (
            <UserItem user={user} />
          )
        })}
      </div>

    <br />
     Add 1 Rule to 1 specify User: 
      Rule Management: <br />
      {/* Find user by Email und add Rule Engine <br />

      <label htmlFor="email">Email:</label>
      <input ref={inputEmailToManagementRulesRef} type="text" name="email"/>
      <input type="button" value="Search" onClick={searchUserToManagementUserRuleHandler}/> 
      <input type="button" value="Clear" onClick={clearSearchUserToManagementUserRuleHandler}/>  */}

      <div className="user-list">
        <div className="title">
          <div>Email</div>
          <div>Rule access right: </div>
          <div>Phonenumber</div>
        </div>
        {userList && userList.map(user => {
          return (
            <UserRuleItem user={user} />
          )
        })}
      </div>

    </>
  );
}

export default AdminDashboard;