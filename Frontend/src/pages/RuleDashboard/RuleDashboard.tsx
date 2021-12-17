import { IBusinessrule } from 'models/businessrule.model';
import { IUserBusinessrule } from 'models/user-businessrule.model';
import { IUser } from 'models/user.model';
import React, { useEffect, useState, useRef  } from 'react';
import { businessruleService } from 'services/businessruleService/businessrule-service';
import { userBusinessruleService } from 'services/userBusinessruleService/user-businessrule-service';

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
//     useEffect(() => {

//         let businessruleList: Array<IBusinessrule> = [];
//         // let getBusinessRulePromise: any;
//         // let getUserBusinessRulePromose: any;

//         if ((user.userRole !== UserRoleEnum.Admin && user.userRole !== UserRoleEnum.RuleAdmin)){
//             userBusinessruleService
//             .getUserBusinessrules({userId: user._id})
//             .then(res => {
//                 console.log(1)
//                 if (res.status === 200 && res.data.docs) {
//                     console.log(res.data.docs);
//                     let userBusinessruleList: Array<IUserBusinessrule> = res.data.docs;
//                     userBusinessruleList.forEach((elem: IUserBusinessrule, index)  => {
//                         businessruleService.getBusinessrules({ _id: elem.businessRuleId})
//                         .then((res) => {
//                             if (res.status === 200) {
//                                 businessruleList.push(res.data.docs);

//                                 if (index === (userBusinessruleList.length - 1)){
//                                     setBusinessRuleObjectList(businessruleList);
//                                 }
//                             }
//                         })
//                         .catch(err => {
//                             alert(err);
//                         })
//                     })
//                 }
//             })
//             .catch(err => {
//                 alert(err);
//             }) 
//         } else {
//             businessruleService.getBusinessrules()
//             .then((res) => {
//                 if (res.status === 200 && res.data.docs) {
//                     console.log(res.data.docs)
//                     businessruleList = businessruleList.concat(res.data.docs);
//                     console.log(2)
//                     setBusinessRuleObjectList(businessruleList);
//                 }
//             })
//             .catch(err => {
//                 alert(err);
//             })
//         }

//         // Promise.all([getUserBusinessRulePromose,getBusinessRulePromise])
//         // .then(res => {
//         //     console.log(3)
//         //     console.log(businessruleList)
//         //     setBusinessRuleObjectList(businessruleList);
//         // })
// },[]);

    
    
// const downloadFile = (data: string, fileName: string , fileType: string ) => {
//     // Create a blob with the data we want to download as a file
//     const blob = new Blob([data], { type: fileType })
//     // Create an anchor element and dispatch a click event on it
//     // to trigger a download
//     const a = document.createElement('a')
//     a.download = fileName
//     a.href = window.URL.createObjectURL(blob)
//     const clickEvt = new MouseEvent('click', {
//       view: window,
//       bubbles: true,
//       cancelable: true,
//     })
//     a.dispatchEvent(clickEvt)
//     a.remove()
//   }


//     const businessRuleFileDownloadHandler = async (event: any) => {
//         console.log("SELECTED ID" + selectedBusinessruleIdToDownload)
//         if (selectedBusinessruleIdToDownload){
//             let res = await businessruleService.getBusinessrules({ _id: selectedBusinessruleIdToDownload})
//             if (res && res.status === 200){
//                 console.log(JSON.parse(res.data.docs[0].rules));
//                 setSelectedBusinessruleIdToUpdate(event.target.value);
//                 downloadFile(
//                     JSON.stringify(JSON.parse(res.data.docs[0].rules),null, 4),
//                     `${res.data.docs[0].name}.json`,              
//                     'text/json',
//                   );
//                 alert ("get business rule successfully");
//             }
//         } else {
//             alert("pls select one set of business rule to download");
//         }


//     }

//     const selectFileOnchangeHanlder = (e: any)=>{
//         console.log(e.target.files[0])
//         setSelectedFile(e.target.files[0]);
//     }

//     const fileUploadHandler = () => {
//         if (selectedFile && selectedBusinessruleIdToUpdate){ 
//             businessruleService.updateBusinessruleFromJson(selectedBusinessruleIdToUpdate , selectedFile)
//             .then(res => {
//                 if (res.status === 200){
//                     alert("Update successfully!");
//                 }
//             })
        
//         } else {
//             alert ("please choose file to upload and select one set of business rule to update")
//         }

//     }


//     const selectBusinessRuleToDownloadOnChange = async (event: any) => {
//         if (event.target.value !== -1){
//             setSelectedBusinessruleIdToDownload(event.target.value);
//         } else {
//             alert("please select one set of business to download");
//         }
//     }

//     const selectBusinessRuleToUpdateOnChange = async (event: any) => {
//         if (event.target.value !== -1){
//             setSelectedBusinessruleIdToUpdate(event.target.value);
//         } else {
//             alert("please select one set of business to update");
//         }
//     }

    // to do: use useRef to reference to select

    return (
        <>
        {/* 0. Choose rule to download <br />
        1. download actual business rule from backend <br />
        <select ref={selectBusinessRuleToDownloadRef} onChange={selectBusinessRuleToDownloadOnChange}>
            <option defaultChecked value={-1}>Select one set of businessrule</option>
            {businessRuleObjectList?.map(elem => {
                return(
                <option value={elem._id}>{elem.name}</option>)
            })}
        </select> <br />
        <button type="button" onClick={businessRuleFileDownloadHandler}>Download</button>  <br />


        2. add this rule in business-rule-editor and update it <br />
        <a href="/ruleeditor" target='_blank'> Go to business-rule-editor</a> <br />

        3. Chose business rule to update <br />
        <select ref={selectBusinessRuleToUpdateRef} onChange={selectBusinessRuleToUpdateOnChange}>
            <option defaultChecked value={-1}>Select one set of businessrule</option>
            {businessRuleObjectList?.map(elem => {
                return(
                <option value={elem._id}>{elem.name}</option>)
            })}
        </select>  <br />

        4. push new rule here <br />
        <input type="file"  onChange={selectFileOnchangeHanlder}/> <br />
        <button type="button" onClick={fileUploadHandler}>Upload</button>  <br />

        5. done <br /> */}
        </>
    );
}

export default RuleDashboard;


