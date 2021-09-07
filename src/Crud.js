import React from 'react';
import axios from 'axios';
import './style.css';

class CrudComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      id: '',
      name: '',
      avatar: '',
      flag:true
    };
  }
  async componentDidMount() {
    var response = await axios.get(
      'https://60f811079cdca000174551c5.mockapi.io/users');
          await this.setState({ users: response.data});
                 console.log(this.state.users); }

  handleSubmit = async e => {
    
    e.preventDefault();

     if (this.state.id  ) 
        { if (this.state.flag==true)
         {console.log(true)
           var response = await axios.put(
              `https://60f811079cdca000174551c5.mockapi.io/users/${this.state.id}`,
              { name    : this.state.name, 
                avatar  : this.state.avatar } );
                 console.log(response.data)
                  var index = this.state.users.findIndex(row => row.id === this.state.id);
                  var user = [...this.state.users];
                  user[index] = response.data;
                  this.setState({ name: '', id: '', avatar: '' });
          }

        else
            {var response = await axios.delete(
            `https://60f811079cdca000174551c5.mockapi.io/users/${this.state.id}`,);
                this.setState({flag : true})
                console.log(users)
                this.setState({ name: '', id: '', avatar: '' });
              }
     }
    else if (this.state.name ){ 
      var newest = await axios.post(
        `https://60f811079cdca000174551c5.mockapi.io/users`,
      { name:this.state.name, avatar:this.state.avatar})
        console.log(newest.data)
        this.setState({ name: '', id: '', avatar: '' });
      }
    else {alert('name required')
    this.setState({ name: '', id: '', avatar: '' });}
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
    console.log(this.state.name);
  };
  handlechange = e => {
    this.setState({ avatar: e.target.value });
    console.log(this.state.avatar);
  };

  async createuser() {
    for (var i in this.state.users.name) {
      alert('user already exist');
    }
    var cr = await axios.post(
      'https://60f811079cdca000174551c5.mockapi.io/users'
    );
  }

  showdata = (id) =>
             {this.state.flag = true
              this.userdetail(id)}

  deleteid=(id)=>
            {this.state.flag = false
             this.userdetail(id)}
            
  userdetail=(id)=>{console.log('showdata' + id);
                  var selectedData = this.state.users.filter(data => data.id == id)[0];
                  this.setState({
                           id: selectedData.id,
                           name: selectedData.name,
                           avatar: selectedData.avatar});}

  render() {
    return (
      <div className="body">
        <div>
          <form onSubmit={e => this.handleSubmit(e)}>
            <br/>

            <label>Name: </label>
            <input
              value={this.state.name}
              onChange={e => this.handleChange(e)} />{' '} &nbsp; <br /> <br />

            <label> Image: </label>
            <input
              value={this.state.avatar}
              onChange={e => this.handlechange(e)} />{' '} <br /> <br />

            <input type="submit" />
          </form>

          {this.state.users.map(user => (
            <div key={user.id} className="user-container">
              <img
                src={user.avatar}
                className="user-image"
                alt="please upload pic"
              />
              <div>
                <h3 className="user-Name"> {user.name} </h3>
                <h5 className="user-time">
                  {' '}
                  {new Date(user.createdAt).toDateString()}{' '}
                </h5>
                <button onClick={(() => this.showdata(user.id))}
                > edit </button>{' '} &nbsp;
                <button onClick={() => this.deleteid(user.id)}
                >Delete</button> <br /> <br />
              </div>
            </div>
          ))}
          <div />
        </div>
      </div>
    );
  }
}
export default CrudComponent;
