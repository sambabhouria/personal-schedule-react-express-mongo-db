import React, { Component } from 'react';
import axios from 'axios';

import Header from '../Header/Header';
import MeetingsList from './MeetingsList';
import BookForm from '../Forms/BookForm';

export default class Look extends Component {
  state = {
    scrolled: false,
    formIsOpened: false,
  }

  componentWillMount = () => {
    this.fetchRoomInfo();
    this.fetchMeetingsList();
  }

  componentDidMount = () => { window.addEventListener('scroll', this.handleScroll); }

  componentWillUnmount = () => { window.removeEventListener('scroll', this.handleScroll); }

  shouldComponentUpdate = (nextProps, nextState) => {
    if((this.props.match.path !== nextProps.match.path)
      || (JSON.stringify(this.state.timeline) !== JSON.stringify(nextState.timeline))
      || (this.state.scrolled !== nextState.scrolled)
      || (this.state.formIsOpened !== nextState.formIsOpened)
    ) {
      return true;
    }

    return false;
  }

  componentDidUpdate = () => {
    this.fetchRoomInfo();
    this.fetchMeetingsList();
  }

  handleScroll = (event) => {
    let top = event.srcElement.body.scrollTop;

    //room-photo height (200px) - header (50px)
    if(top > 150) { if(!this.state.scrolled) this.setState({scrolled: true}); }
    else { if(this.state.scrolled) this.setState({scrolled: false}); }

  }

  toggleMeetingStatus = (meetingId) => {
    const meetingsData = {
      meetingId: meetingId
    };

    axios.post('/api/meetings/status', meetingsData)
      .then(res => {
        this.fetchMeetingsList();
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleBookForm = (roomId, roomName) => {
    this.setState({formIsOpened: !this.state.formIsOpened});
  }


  fetchMeetingsList = () => {

    const roomId = this.props.match.params.id;

    axios.get(`/api/meetings?roomId=${roomId}`)
         .then(res => this.setState({ timeline: res.data }));

  }

  fetchRoomInfo = () => {

    const roomId = this.props.match.params.id;

    if(roomId !== undefined){
      axios.get(`/api/meetings/roominfo?roomId=${roomId}`)
           .then(res => this.setState({ roomInfo: res.data[0] }));
    } else {
      this.setState({ roomInfo: { photo: '', name: '' } });
    }

  }

  render() {
    const roomId = this.props.match.params.id;
    const { formIsOpened, roomInfo, scrolled, timeline } = this.state;
    console.log("the state in loook", this.state)

    console.log("value of the staes", this.state)

    if(roomInfo === undefined) return <div className='loader'></div>;
    return (
    <div className='look'>
      <div className={`wrap ${scrolled ? 'scrolled' : ''}`}>
        <Header openBookForm={this.toggleBookForm} />

        {roomId ?
        <div className='room-photo' style={{backgroundImage: `url('${roomInfo.photo}')`}}></div> :
        <div className='room-photo personal'></div>
        }

        <div className='timeline'>
          <div className='timeline-header'>
            <div className='container'>

              {roomId ?
              <h3 className='title'>Room Schedule | {roomInfo.value}</h3> :
              <h3 className='title'>Personal Schedule</h3>
              }

            </div>
          </div>

          {timeline &&
            <MeetingsList
              meetings={timeline}
              toggleMeetingStatus={this.toggleMeetingStatus}
              />
          }

          </div>
        </div>

        <BookForm
          isOpened={formIsOpened}
          closeBookForm={this.toggleBookForm}
        />
      </div>
    );
  }
}
