import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

class App extends Component {
  constructor (props){
    super(props)
    this.state={   
      address: '',
      restOfForm: false,
      floorToCeiling: true,
      height: '',
      heightCharge: 1,
      width: '',
      quote: 0,
      finish: 'unfinished',
      finishCharge: 0,
      wood: 'pine',
      woodCharge:'1',
      side: 'plain',
      sideCharge: 0,

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
      heightCharge : event.target.value > 96 ? 1.15 : 
        event.target.value > 60 ? 1 :
        event.target.value > 48 ? .80 : .70
    })
  }

  updateQuote = event =>{
    //event.preventDefault()
    let woodCharge
    let sideCharge
    let finishCharge
    if(event.target.name === 'wood'){
      let wood = event.target.value
      woodCharge = (wood === 'pine')? 1: //pine no extra, oak/maple/birch *1.1, cherry *1.25
        (wood === 'cherry')? 1.25: 1.10 
      this.setState({ wood })
      this.setState({ woodCharge })
    }else if (event.target.name === 'side'){
      let side = event.target.value
      sideCharge = (side === 'plain')? 0: 500//plain is 0, fancy is +$500
      this.setState({ sideCharge })
      this.setState({ side })
    }else if (event.target.name === 'finish'){
      let finish = event.target.value
      finishCharge = (finish === 'unfinished')? 0: //plain is 0, painted/clear finish is 500, matched stain is 1000 extra.
      (finish === 'match')? 1000: 500 
      this.setState({ finish })
      this.setState({ finishCharge })
    }
    let width = Math.ceil(this.state.width/12)
    let heightCharge = this.state.heightCharge
    let baselinePricePerFoot = 1000
    woodCharge = woodCharge ? woodCharge : this.state.woodCharge
    sideCharge = (sideCharge ===0 || sideCharge ) ? sideCharge : this.state.sideCharge
    finishCharge = (finishCharge ===0 || finishCharge ) ? finishCharge : this.state.finishCharge
    let quote = Math.ceil(heightCharge * width * baselinePricePerFoot * woodCharge + sideCharge + finishCharge)
    this.setState({ quote })
  };

  handleWidthChange = event => {
    event.preventDefault()
    this.setState({width: event.target.value})
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
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      
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
                    onChange={this.updateQuote} />Unfinished
            <input  type="radio" 
                    name="finish" 
                    value="painted" 
                    checked={this.state.finish==="painted"}
                    onChange={this.updateQuote} />Painted
            <input  type="radio" 
                    name="finish" 
                    value="natural" 
                    checked={this.state.finish==="natural"}
                    onChange={this.updateQuote} />Natural wood with clearcoat finish
            <input  type="radio" 
                    name="finish" 
                    value="match" 
                    checked={this.state.finish==="stained"}
                    onChange={this.updateQuote} />Matched stain

            <div>What kind of wood?</div>
            <input  type="radio" 
                    name="wood" 
                    value="pine" 
                    checked={this.state.wood==="pine"}
                    onChange={this.updateQuote} />Pine
            <input  type="radio" 
                    name="wood" 
                    value="maple"
                    checked={this.state.wood==="maple"}
                    onChange={this.updateQuote} />Maple/Birch
            <input  type="radio" 
                    name="wood" 
                    value="oak"
                    checked={this.state.wood==="oak"}
                    onChange={this.updateQuote} />Oak
            <input  type="radio" 
                    name="wood" 
                    value="cherry"
                    checked={this.state.wood==="cherry"}
                    onChange={this.updateQuote} />Cherry
            <div>Fancy or plain side?</div>
            <input  type="radio" 
                    name="side" 
                    value="plain" 
                    checked={this.state.side==="plain"}
                    onChange={this.updateQuote} />Plain
            <input  type="radio" 
                    name="side" 
                    value="fancy" 
                    checked={this.state.side==="fancy"}
                    onChange={this.updateQuote} />Fancy
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
