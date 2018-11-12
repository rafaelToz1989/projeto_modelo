import  { Component } from 'react'
import LogUtil from '../../util/LogUtil';

class BaseComponent extends Component {

  // constructor(props){
  //   super(props)
  // }

  log(message){
    LogUtil.log(message)
  }

  

  // onUnauthorized(){
  //   window.location = "/"
  // }



}

export default BaseComponent