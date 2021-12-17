import React, { useEffect, useState } from 'react';
import { IUser } from '../../models/user.model';
import PropTypes from "prop-types";
import { userBusinessruleService } from '../../services/userBusinessruleService/user-businessrule-service';
import { businessruleService } from '../../services/businessruleService/businessrule-service';
import { IBusinessrule } from 'models/businessrule.model';
import { IUserBusinessrule } from 'models/user-businessrule.model';
import _ from 'lodash';
import UserBusinessRuleSetItem from 'components/UserRuleItem/UserBusinessRuleSetItem'

interface UserRuleItemProps {
    user: IUser;
}

const UserRuleItem = (props: UserRuleItemProps) => {

    const [userBusiessRuleList, setUserBusiessRuleList] = useState<Array<IUserBusinessrule>>([]);
    const [businessRuleSetList, setBusinessRuleSetList] = useState<Array<IBusinessrule>>([]);

    const [selectedBusinessRule, setSelectedBusinessRule] = useState([]);

    useEffect(() => {
        if (props.user._id){
            userBusinessruleService.getUserBusinessrules({ userId: props.user._id })
            .then((res) => {
                if (res.status === 200){
                    console.log(res.data.docs);
                    setUserBusiessRuleList(res.data.docs);
                }
            })
            .catch ((err) => {
                alert(err);
            });

            businessruleService.getBusinessrules()
            .then(res => {
                if (res.status === 200){
                    console.log(res.data.docs);
                    setBusinessRuleSetList(res.data.docs);
                }
            })
        }
    }, []);
    
    const onSelectRuleSetToAdd = (event: any) => {
        console.log("SELECT VALUE",event.target.value);

        if (event.target.value === -1) {
            alert("please select ruleset to give access right!")
            return;
        }

        if (!userBusiessRuleList.some(userRule => userRule._id == event.target.value) && props.user._id){
            const newUserRule: IUserBusinessrule = {
                businessRuleId: event.target.value,
                userId: props.user._id
            }
            userBusinessruleService.postNewUserBusinessrule(newUserRule)
            .then (res => {
                if (res.status === 201 && res.data.docs) {
                    let newUserRuleList = _.cloneDeep(userBusiessRuleList);
                    let createdUserRule : IUserBusinessrule = res.data.docs;
                    newUserRuleList.push(createdUserRule);
                    setUserBusiessRuleList(newUserRuleList);
                    alert ("Add a new access right to a business rule set successful");
                } else {
                    alert ("network problem! Please try it again.")
                }
            })
            .catch(err => {
                console.log(err);
                alert ("unknown problem! Please try it again.")
            })
        } else {
            alert ("access right for this ruleset is already made!")
        }
    }

    const onDeleteUserRule = (userRule: IUserBusinessrule) => {
        let newUserRuleList = _.cloneDeep(userBusiessRuleList);
        setUserBusiessRuleList(newUserRuleList.filter(userRuleElement => userRuleElement._id !== userRule._id));
    }

    return (
        <div>
            <div className="user-item">
                <div className="user-info"> 
                    <div>Email: {props.user.email}</div>
                    <div className='user-rule'>
                        <div>Select set of businessrule To allow this User: </div>
                        <select 
                            onChange={onSelectRuleSetToAdd}
                        >
                            <option value={-1}>Select RuleSet To Add</option>
                            {businessRuleSetList && businessRuleSetList.map( (businessRuleSet: IBusinessrule) => (<option value={businessRuleSet._id}>{businessRuleSet.name}</option>))}
                        </select>
                        <div className='user-role-list'>
                            <div>Rule List:</div>
                            {userBusiessRuleList && userBusiessRuleList.map(userBusinessRule => 
                                <UserBusinessRuleSetItem 
                                    userBusinessRule={userBusinessRule} 
                                    ruleSetName={businessRuleSetList.find(ruleSet => ruleSet._id === userBusinessRule._id)?.name} 
                                    onDeleteUserRule={onDeleteUserRule}
                                />)}
                        </div>
                    </div>
                    <div>Phonenumber: {props.user.phoneNumber}</div>
                </div>

                Add Rule Access Role to this User.
                <div className="access-business-rule-management">

                </div>
            </div>
        </div>

    );
}

UserRuleItem.propTypes = {
    user: PropTypes.object,
}

export default UserRuleItem;

