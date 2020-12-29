from flask import Flask,jsonify,request,render_template
import json
import pickle
import sklearn
import numpy as np

app = Flask(__name__, static_url_path="/client", static_folder='../client', template_folder="/client")

@app.route('/')
def index():
    return render_template("app.html")

__data_columns=None
__model=None
with open('columns.json','r') as f:
    __data_columns=json.load(f)['data_columns']

with open('Loan_prediction_model.pickle','rb') as f1:
    __model=pickle.load(f1)
print("loading artifacts done")

def estimate_loan_status(gender,married,dependents,education,self_employed,applicant_income,coapplicant_income,loanamount,loanamount_term,credithistory,property_area):

    x=np.zeros(len(__data_columns))
    x[0]=gender
    x[1]=married
    x[2]=dependents
    x[3]=education
    x[4]=self_employed
    x[5]=int(applicant_income)
    x[6]=int(coapplicant_income)
    x[7]=int(loanamount)
    x[8]=int(loanamount_term)
    x[9]=int(credithistory)
    x[10]=property_area
    return __model.predict([x])[0]

@app.route('/predict_loan_status',methods=['POST'])
def predict_loan_status():
    gender=int(request.form['Gender'])
    married=request.form['married']
    dependents=int(request.form['dependents'])
    education=request.form['education']
    self_employed=request.form['self_employed']
    applicant_income=int(request.form['applicant_income'])
    coapplicant_income=int(request.form['coapplicant_income'])
    loanamount=int(request.form['loanamount'])
    loanamount_term=int(request.form['loanamount_term'])
    credithistory=int(request.form['credithistory'])
    property_area=request.form['property_area']

    result=estimate_loan_status(gender,married,dependents,education,self_employed,applicant_income,coapplicant_income,loanamount,loanamount_term,credithistory,property_area)

    response=jsonify({
    'estimated_status':int(result)
    })
    response.headers.add('Access-Control-Allow-Origin','*')

    return response

if __name__=='__main__':
    app.run(debug=True)
