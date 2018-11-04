import React, { Component } from 'react';
import PageHeader from '../PageHeader';
import Modal from '../Modal';

import './styles.scss';

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentModal: null,
      groups: [],
    };
  }

  render() {
    const { groups, currentModal } = this.state;
    return (
      <div className="groups">
        <PageHeader title="Groups" subtitle="Manage your groups" />
        { groups.length === 0 ? <span className="groups__empty_state">You are not a member of any group</span> : null }
        <Modal show={currentModal === 'create'} onClose={() => this.setState({ currentModal: null })}>
          Create
        </Modal>
        <button className="groups__create" type="button" onClick={() => this.setState({ currentModal: 'create' })}>Create</button>
        <Modal show={currentModal === 'join'} onClose={() => this.setState({ currentModal: null })}>
          Join
        </Modal>
        <button className="groups__join" type="button" onClick={() => this.setState({ currentModal: 'join' })}>Join</button>
      </div>
    );
  }
}

export default Groups;
