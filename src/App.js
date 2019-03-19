import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props){
    super(props)
    this.state={   
      address: '',
      restOfForm: false,
      floorToCeiling: true,
      height: '',
      heightDiscount: 1,
      width: '',
      quote: 0,
      finish: 'unfinished',
      wood: 'pine',
      side: 'plain',
    }
  }

  handleAddressChange = event =>this.setState({address: event.target.value})
  handleAddressSubmit = event =>{
    event.preventDefault()
    this.setState({restOfForm:true})
  }
  handleFloorToCeilingChangeYes = event =>{
    this.setState({
      floorToCeiling: true,
      height: '',
      tempHeight:''
    })
  } 
  handleFloorToCeilingChangeNo = event =>{
    this.setState({
      floorToCeiling: false,
      height:'',
      tempHeight:''
    })}

  handleHeightChange = event => {
    event.preventDefault()
    this.setState({
      height: event.target.value,
      heightDiscount : event.target.value < 48 ? .75:1
    })
  }

  updateQuote = event =>{
    event.preventDefault()
    let width = Math.ceil(this.state.width/12)
    let heightDiscount = this.state.heightDiscount
    let baselinePricePerFoot = 1000
    let wood = this.state.wood
    let woodPremium = (wood === 'pine')? 1: //pine no extra, oak/maple/birch *1.1, cherry *1.25
      (wood === 'cherry')? 1.25: 1.10
    let quote = width * baselinePricePerFoot * woodPremium
    console.log('oldmanneill',quote)
    this.setState({ quote })
  };

  handleWidthChange = event => {
    event.preventDefault()
    this.setState({width: event.target.value})
  }

  handleWoodType = event =>{
    this.setState({ wood: event.target.value})
  }

  handleFinish = event =>{
    this.setState({ finish: event.target.value})
  }
  handleSideChange = event =>{
    this.setState({ side: event.target.value})
  }
  handleEnter = event => {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      if(form.elements.length-1 > index){
        form.elements[index + 1].focus();
      }else{
        this.updateQuote(event)
      }
      //event.preventDefault();
    }
  }

  render() {
    return (
      <div className="App">
        Your (ongoing) quote: ${this.state.quote}
        <div>height: {this.state.height}</div>
        <div>width: {this.state.width}</div>
        <div>wood: {this.state.wood}</div>
        <div>finish: {this.state.finish}</div>
        <div>side: {this.state.side}</div><br/><br/><br/>
        <div>
          What is your address?<br></br>
          <form onSubmit={this.handleAddressSubmit}>
            <label>
              <input type="text" value={this.state.address} onChange={this.handleAddressChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        {this.state.restOfForm && 
        <div>
          Will this be a floor-to-ceiling built-in?
          <form onSubmit={this.handleAddressSubmit}>
            <label>
              <input  type="radio" 
                      name="yes" 
                      value={this.state.floorToCeiling} 
                      checked={this.state.floorToCeiling===true}
                      onChange={this.handleFloorToCeilingChangeYes} />Yes
              <input  type="radio" 
                      name="no" 
                      value={this.state.floorToCeiling} 
                      checked={this.state.floorToCeiling===false}
                      onChange={this.handleFloorToCeilingChangeNo} />No
            </label>
          </form>
          
          <form onSubmit={this.updateQuote}>
            {this.state.floorToCeiling ? 
              <div>How tall is the ceiling?</div>:
              <div>What will be the height of the structure?</div>
            }
            <input onBlur={this.updateQuote} type="text" value={this.state.height} onChange={this.handleHeightChange} onKeyDown={this.handleEnter} />
            <div>What will be the width of the structure?</div>
            <input onBlur={this.updateQuote} type="text" value={this.state.width} onChange={this.handleWidthChange} onKeyDown={this.handleEnter} />
            <div>Will the wood be unfinished, painted, sealed with a natural wood clearcoat, or be given a matching stain?</div>
            <input  type="radio" 
                    name="finish" 
                    value="unfinished" 
                    checked={this.state.finish==="unfinished"}
                    onChange={this.handleFinish} />Unfinished
            <input  type="radio" 
                    name="finish" 
                    value="painted" 
                    checked={this.state.finish==="painted"}
                    onChange={this.handleFinish} />Painted
            <input  type="radio" 
                    name="finish" 
                    value="natural" 
                    checked={this.state.finish==="natural"}
                    onChange={this.handleFinish} />Natural wood with clearcoat finish
            <input  type="radio" 
                    name="finish" 
                    value="stained" 
                    checked={this.state.finish==="stained"}
                    onChange={this.handleFinish} />Stained

            <div>What kind of wood?</div>
            <input  type="radio" 
                    name="wood" 
                    value="pine" 
                    checked={this.state.wood==="pine"}
                    onChange={this.handleWoodType} />Pine
            <input  type="radio" 
                    name="wood" 
                    value="maple"
                    checked={this.state.wood==="maple"}
                    onChange={this.handleWoodType} />Maple/Birch
            <input  type="radio" 
                    name="wood" 
                    value="oak"
                    checked={this.state.wood==="oak"}
                    onChange={this.handleWoodType} />Oak
            <input  type="radio" 
                    name="wood" 
                    value="cherry"
                    checked={this.state.wood==="cherry"}
                    onChange={this.handleWoodType} />Cherry
            <div>Fancy or plain side?</div>
            <input  type="radio" 
                    name="side" 
                    value="plain" 
                    checked={this.state.side==="plain"}
                    onChange={this.handleSideChange} />Plain
            <input  type="radio" 
                    name="side" 
                    value="fancy" 
                    checked={this.state.side==="fancy"}
                    onChange={this.handleSideChange} />Fancy
          </form>
          
        </div>} 
      </div>
    );
  }
}

export default App;

  // handleChange = e => {
  //   this.setState({ ...this.state, [e.target.name]: e.target.value})
  //   this.yourQuote();
  // }
