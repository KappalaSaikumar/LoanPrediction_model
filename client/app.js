function getMarriedValue(){
  var uiMarried=document.getElementsByName("uiMarried");
  for (var i in uiMarried) {
    if (uiMarried[i].checked) {
      return parseInt(i);
    }
  }
  return -1;
}

function getGenderValue(){
  var uiG=document.getElementsByName("uiG");
  for (var i in uiG) {
    if (uiG[i].checked) {
      return parseInt(i);
    }
  }
  return -1;
}

function getDependentsValue(){
  var uiDependents=document.getElementsByName("uiDependents");
  for (var i in uiDependents) {
    if (uiDependents[i].checked) {
      return parseInt(i);
    }
  }
  return -1;
}

function getEducationValue(){
  var uiEducation=document.getElementsByName("uiEducation");
  for (var i in uiEducation) {
    if (uiEducation[i].checked) {
      return parseInt(i);
    }
  }
  return -1;
}

function getSelfEmployedValue(){
  var uiSelf_employed=document.getElementsByName("uiSelf_employed");
  for (var i in uiSelf_employed) {
    if (uiSelf_employed[i].checked) {
      return parseInt(i);
    }
  }
  return -1;
}

function getCreditHistoryValue(){
  var uiCredit_History=document.getElementsByName("uiCredit_History");
  for (var i in uiCredit_History) {
    if (uiCredit_History[i].checked) {
      return parseInt(i);
    }
  }
  return -1;
}

function getPropertyAreaValue(){
  var uiProperty_Area=document.getElementsByName("uiProperty_Area");
  for (var i in uiProperty_Area) {
    if (uiProperty_Area[i].checked) {
      return parseInt(i) ;
    }
  }
  return -1;
}

function onClickedEstimateStatus(){
  console.log("estimate Loan Button Clicked");
  var gender=getGenderValue();
  var married=getMarriedValue();
  var dependents=getDependentsValue();
  var education=getEducationValue();
  var selfemp=getSelfEmployedValue();
  var applicant_income=document.getElementById("uiapp_income");
  var coapplicant_income=document.getElementById("uicoapp_income");
  var loan_amount=document.getElementById("uiloanamt");
  var loan_amount_term=document.getElementById("uiloanamtTerm");
  var credithistory=getCreditHistoryValue();
  var propertyarea=getPropertyAreaValue();
  var estStatus=document.getElementById("uiEstimatedStatus");
  var url="http://127.0.0.1:5000/predict_loan_status";
  console.log(gender);

  $.post(url,{
    Gender:gender,
    married:married,
    dependents:dependents,
    education:education,
    self_employed:selfemp,
    applicant_income:applicant_income.value,
    coapplicant_income:coapplicant_income.value,
    loanamount:loan_amount.value,
    loanamount_term:loan_amount_term.value,
    credithistory:credithistory,
    property_area:propertyarea
    },function(data,status){
      console.log(data.estimated_status);
      s="";
      if (data.estimated_status==0){
        s+="Sorry you haven't recieved the Loan"
      }
      else if(data.estimated_status==1){
        s+="Congratulations, You have recieved the Loan"
      }
      estStatus.innerHTML="<h2>"+s.toString()+"</h2>";
      console.log(status);

    }
  );
}
