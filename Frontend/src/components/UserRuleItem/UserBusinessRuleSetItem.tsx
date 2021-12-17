
import { IUserBusinessrule } from "models/user-businessrule.model";
import PropTypes from "prop-types";
import react, { useContext } from 'react';
import { userBusinessruleService } from "services/userBusinessruleService/user-businessrule-service";

interface UserBusinessRuleSetItemProps {
    userBusinessRule: IUserBusinessrule;
    ruleSetName: string | undefined;
    onDeleteUserRule: Function;
}


const UserBusinessRuleSetItem = (props: UserBusinessRuleSetItemProps) => {


    const onDeleteUserBusinessRuleHandler = () => {
        if (props.userBusinessRule._id) {
            userBusinessruleService.deleteUserBusinessrule(props.userBusinessRule._id)
            .then (res => {
                if (res.status === 200) {
                    props.onDeleteUserRule(props.userBusinessRule);
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
            <span>{props.ruleSetName} </span> 
            <span><input type='button' value=" X " onClick={onDeleteUserBusinessRuleHandler} /></span>
        </div>
    );
}

UserBusinessRuleSetItem.propTypes = {
    userBusinessRule: PropTypes.object,
    ruleSetName: PropTypes.any,
    onDeleteUserRule: PropTypes.func
}

export default UserBusinessRuleSetItem;