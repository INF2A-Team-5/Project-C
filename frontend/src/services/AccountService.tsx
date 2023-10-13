import axios from 'axios';
import { Component } from 'react'



export default class AccountService extends Component {
    
    USER_API_BASE_URL = "http://localhost:5119/api/Accounts";
    
    getAccounts(){
        return axios.get(this.USER_API_BASE_URL);
    }

    createAccount(account: string){
        return axios.post(this.USER_API_BASE_URL, account);
    }

    getAccountById(accountId: Int32Array){
        return axios.get(this.USER_API_BASE_URL + '/' + accountId);
    }

    updateAccount(account: string, accountId: Int32Array){
        return axios.put(this.USER_API_BASE_URL + '/' + accountId, account);
    }

    deleteAccount(accountId: Int32Array){
        return axios.delete(this.USER_API_BASE_URL + '/' + accountId);
    }
}