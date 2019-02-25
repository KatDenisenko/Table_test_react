import React, { Component } from 'react';
import DataTable from './Table/DataTable';
import AddForm from './Form/AddForm';
import style from './App.module.css';
import {Segment} from 'semantic-ui-react';
import uuid from 'uuid/v4';

class App extends Component {

  state={
    
    allData:JSON.parse(localStorage.getItem('dataTable')) || [],
    sortData:[],
    firstName:'',
    lastName:'',
    phone:'',
    age:'',
    error:'',
  }

  handleChange=(e)=>{
    let key=e.target.name;
    let value=e.target.value;
    this.setState({
      [key]: value,
    })
  }

  add=(e)=>{
    e.preventDefault();
    let regExp = /^(([a-z]+)|([а-яё]+)|([а-яїі]+))$/i;
    let regPhone  =  /^((\+\d{1,2}\(\d{3}\)\d{3}(-)\d{2}(-)\d{2}))$/gm;
    let newResult = JSON.parse(localStorage.getItem('dataTable')) || [];
    if (this.state.firstName.match(regExp)){
      // console.log('firstName done')
      if (this.state.lastName.match(regExp)) {
        // console.log('lastName done')
        if(this.state.phone.match(regPhone)) {
          let obj={
            firstName: this.state.firstName.toLowerCase(),
            lastName: this.state.lastName.toLowerCase(),
            phone:this.state.phone,
            age:this.state.age,
            id:uuid(),
          }
          this.setState(prev=>({
            error:'',
            allData:[...prev.allData,obj],
            sortData:[],
            firstName:'',
            lastName:'',
            phone:'',
            age:'',
          }));
         
          newResult.push(obj)
          localStorage.setItem('dataTable', JSON.stringify(newResult));
        } else {
          this.setState({
            error:'Phone number doesn\'t valid.Please enter your number in format +XX(XXX)XXX-XX-XX',
            phone:'',
          })
        }
      } else {
        this.setState({
          error:'Field Last name contains numbers or symbols.Please enter correct data.',
          lastName:'',
        })
      }
    
    }
    else {
      this.setState({
        error:'Field First name contains numbers or symbols.Please enter correct data.',
        firstName:'',
      })
    }
    
  }
  sortDataFuncAz=(str)=>{
    // console.log('sortDataFunc');
  let sortArr=[...this.state.allData];  
  let arr = sortArr.sort(function (a, b) {
    if (a[str] > b[str]) {
      return 1;
    }
    if (a[str] < b[str]) {
      return -1;
    }
    return 0;
  });
    this.setState({
    sortData:arr,
  })
  }
  sortDataFuncZa=(str)=>{
    // console.log('sortDataFunc');
  let sortArr=[...this.state.allData];
  let arr = sortArr.sort(function (a, b) {
    if (a[str] > b[str]) {
      return -1;
    }
    if (a[str] < b[str]) {
      return 1;
    }
    return 0;
  });

  this.setState({
    sortData:arr,
  })
  }

  sortNumbers=(type)=>{
    if (type==='up') {
      let arr=[...this.state.allData];
      let sortArr= arr.sort(function(a, b) {
        return a.age - b.age;
      })
      this.setState({
        sortData:sortArr,
      })
    }
      else {
        if (type==='down') {
          let arr=[...this.state.allData];
          let sortArr= arr.sort(function(a, b) {
            return b.age - a.age;
          })
          this.setState({
            sortData:sortArr,
          })
        }
      }
    }

  deleteData=(e)=>{
      let delEl=e.target.id;
      let localStorageData = JSON.parse(localStorage.getItem('dataTable')) || [];
      if (this.state.sortData.length>0)
      {
        let filterArr=(this.state.sortData.filter(el=>el.id!==delEl))
        let filterData=(this.state.allData.filter(el=>el.id!==delEl))
        this.setState({
          sortData:filterArr,
          allData:filterData,
        })
        localStorage.setItem('dataTable', JSON.stringify(filterArr));

      } else {
        this.setState({
          allData:this.state.allData.filter(el=>el.id!==delEl),
        })
        let filterArr=localStorageData.filter(el=>el.id!==delEl);
      localStorage.setItem('dataTable', JSON.stringify(filterArr));
      }
      
    }
  sortSkip=()=>{
    
    let arr = this.state.allData;
    this.setState({
      sortData:[],
    })
    localStorage.setItem('dataTable', JSON.stringify(arr))
  }

  render() {
    
    return (
      <div className={style.appWrapper}>
      <Segment >
          <AddForm firstName={this.state.firstName} lastName={this.state.lastName} phone={this.state.phone} age={this.state.age} handleChange={this.handleChange} add={this.add} error={this.state.error}/>
          <DataTable sortSkip={this.sortSkip} deleteData={this.deleteData}sortNumbers = {this.sortNumbers} sortDataFuncZa={this.sortDataFuncZa} sortDataFuncAz = {this.sortDataFuncAz} allData={this.state.allData} sortData={this.state.sortData}/>  
      </Segment> 
      </div>
    );
  }
}

export default App;
