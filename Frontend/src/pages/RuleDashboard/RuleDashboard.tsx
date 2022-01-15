import { RoleNumberEnum } from 'helper/global-variable-helper/global-variable';
import { IBusinessrule } from 'models/businessrule.model';
import { IUserBusinessrule } from 'models/user-businessrule.model';
import { IUserRole } from 'models/user-role.model';
import { IUser } from 'models/user.model';
import React, { useEffect, useState, useRef  } from 'react';
import { businessruleService } from 'services/businessruleService/businessrule-service';
import { userBusinessruleService } from 'services/userBusinessruleService/user-businessrule-service';
import { userRoleService } from 'services/userRoleService.ts/user-role-service.ts';
import { useHistory } from "react-router-dom";
import _ from 'lodash';

const RuleDashboard = (props: any) => {

    const userString = sessionStorage.getItem("user");
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState<IUser>( JSON.parse(userString? userString: "")) ;
    const [selectedFile, setSelectedFile] = useState<File>();

    const [businessRuleObjectList, setBusinessRuleObjectList] = useState<Array<IBusinessrule>>();
    const [selectedBusinessruleIdToDownload, setSelectedBusinessruleIdToDownload ] = useState<string>("");
    const [selectedBusinessruleIdToUpdate, setSelectedBusinessruleIdToUpdate ] = useState<string>("");

    const selectBusinessRuleToDownloadRef = useRef<HTMLSelectElement>(null);
    const selectBusinessRuleToUpdateRef = useRef<HTMLSelectElement>(null);

    const [userRoleList, setUserRoleList] = useState<Array<IUserRole>>();
    const [userBusinessRuleList, setUserBusinessRuleList] = useState<Array<IUserBusinessrule>>();
    

    const history = useHistory();
    useEffect(() => {
        if (user) {

            let getUserRolePromise = userRoleService.getUserRoles({userId: user._id});
            let getUserBusinessRulePromise =  userBusinessruleService.getUserBusinessrules({userId: user._id})
            Promise.all([getUserRolePromise,getUserBusinessRulePromise])
            .then (arrayValue => {
                let fetchedUserRoleList = arrayValue[0].data.docs;
                setUserRoleList(fetchedUserRoleList);

                let fetchedUserBusinessRuleList = arrayValue[1].data.docs;
                setUserBusinessRuleList(fetchedUserBusinessRuleList);

                if (
                    !user || 
                    (
                        user
                        && !fetchedUserRoleList?.some((userRole: any) => userRole.roleNumber === RoleNumberEnum.RulesAdmin)
                        && fetchedUserBusinessRuleList.lenth === 0    
                    )
                ) {
                    alert("You have no right to access this Ressource")
                    setTimeout(()=> {history.push("/home")}, 1000)
                }

                let businessruleList: Array<IBusinessrule> = [];

                if (fetchedUserRoleList?.some((userRole: any) => userRole.roleNumber === RoleNumberEnum.RulesAdmin)){
                    
                    // Get Rules List
                    businessruleService.getBusinessrules()
                    .then((res) => {
                        if (res.status === 200 && res.data.docs) {
                            console.log(res.data.docs)
                            businessruleList = businessruleList.concat(res.data.docs);
                            setBusinessRuleObjectList(businessruleList);
                        }
                    })
                    .catch(err => {
                        alert(err);
                    })
                } else {

                    let userBusinessruleList: Array<IUserBusinessrule> = fetchedUserBusinessRuleList;
                    userBusinessruleList.forEach((elem: IUserBusinessrule, index)  => {
                        // Get Business Rule
                        console.log("ELEMENT:", elem)
                        console.log("INDEX:", index)
                        businessruleService.getBusinessrules({ _id: elem.businessruleId})
                        .then((res) => {
                            if (res.status === 200) {
                                const fetchedUserBusinessRule: IBusinessrule = res.data.docs;
                                businessruleList.push(fetchedUserBusinessRule);
                                if (index === (userBusinessruleList.length - 1)){
                                    let cloneBusinessruleList = _.cloneDeep(businessruleList);
                                    setBusinessRuleObjectList(cloneBusinessruleList);
                                }
                                console.log("BUSINESS RULE:", res.data.docs)
                                console.log("businessRuleObjectList",businessRuleObjectList)
                            }
                        })
                        .catch(err => {
                            alert(err);
                        })
                    })
                }
            })
        } else {
            alert("You have no right to access this Ressource")
            setTimeout(()=> {history.push("/home")}, 1000)
        }
},[]);
 
const downloadFile = (data: string, fileName: string , fileType: string ) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType })
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

    const businessRuleFileDownloadHandler = async (event: any) => {
        console.log("SELECTED ID" + selectedBusinessruleIdToDownload)
        if (selectedBusinessruleIdToDownload && selectedBusinessruleIdToDownload !== "-1"){
            let res = await businessruleService.getBusinessrules({ _id: selectedBusinessruleIdToDownload})
            if (res && res.status === 200){
                console.log(JSON.parse(res.data.docs[0].rules));
                setSelectedBusinessruleIdToUpdate(event.target.value);
                downloadFile(
                    JSON.stringify(JSON.parse(res.data.docs[0].rules),null, 4),
                    `${res.data.docs[0].name}.json`,              
                    'text/json',
                  );
                alert ("get business rule successfully");
            }
        } else {
            alert("please select one set of business rule to download");
        }


    }

    const selectFileOnchangeHanlder = (e: any)=>{
        console.log(e.target.files[0])
        setSelectedFile(e.target.files[0]);
    }

    const fileUploadHandler = () => {
        if (selectedFile && selectedBusinessruleIdToUpdate){ 
            businessruleService.updateBusinessruleFromJson(selectedBusinessruleIdToUpdate , selectedFile)
            .then(res => {
                if (res.status === 200){
                    alert("Update successfully!");
                }
            })
        
        } else {
            alert ("please choose file to upload and select one set of business rule to update")
        }

    }


    const selectBusinessRuleToDownloadOnChange = async (event: any) => {
        if (event.target.value !== -1){
            setSelectedBusinessruleIdToDownload(event.target.value);
        } else {
            alert("please select one set of business to download");
        }
    }

    const selectBusinessRuleToUpdateOnChange = async (event: any) => {
        if (event.target.value !== -1){
            setSelectedBusinessruleIdToUpdate(event.target.value);
        } else {
            alert("please select one set of business to update");
        }
    }

    // to do: use useRef to reference to select

    return (
        <div>
        Rule Dashboard <br />
        *Note: In the Rule Dashboard, you can work with the ruleset to which you have access rights. You can also easily import or export the rule set.  <br />  <br />

        1. Choose rule to download <br />
        Download actual business rule from repository (Export) <br />
        <select ref={selectBusinessRuleToDownloadRef} onChange={selectBusinessRuleToDownloadOnChange}>
            <option defaultChecked value={-1}>Select one set of businessrule</option>
            {businessRuleObjectList && businessRuleObjectList?.map(elem => {
                return(
                <option value={elem._id}>{elem.name}</option>)
            })}
        </select> <br />
        <button type="button" onClick={businessRuleFileDownloadHandler}>Download</button>  <br />  <br />


        2. add this rule in business-rule-editor and update it <br />
        <a href="/ruleeditor" target='_blank'> Go to business-rule-editor</a> <br />  <br />

        3. Choose business rule set to update <br />
        <select ref={selectBusinessRuleToUpdateRef} onChange={selectBusinessRuleToUpdateOnChange}>
            <option defaultChecked value={-1}>Select one set of businessrule</option>
            {businessRuleObjectList && businessRuleObjectList?.map(elem => {
                return(
                <option value={elem._id}>{elem.name}</option>)
            })}
        </select>  <br />  <br />

        4. Upload updated business rule set (Import) <br />
        <input type="file"  onChange={selectFileOnchangeHanlder}/> <br />
        <button type="button" onClick={fileUploadHandler}>Upload</button>  <br />  <br />

        </div>
    );
}

export default RuleDashboard;


