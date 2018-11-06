import React, { Component } from 'react';
import PageHeader from '../PageHeader';
import Modal from '../Modal';
import { backendFetch } from '../../util/fetch';

import './styles.scss';
import GroupCreateForm from '../modal-forms/GroupCreateForm';
import Group from '../Group';
import GroupJoinForm from '../modal-forms/GroupJoinForm';

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentModal: null,
      error: null,
      groups: [],
    };

    this.fetchGroups = this.fetchGroups.bind(this);
    this.submitCreateGroup = this.submitCreateGroup.bind(this);
    this.submitJoinGroup = this.submitJoinGroup.bind(this);
    this.fetchGroups();
  }

  async fetchGroups() {
    const resp = await backendFetch('/api/group');
    const respObj = await resp.json();
    if (!resp.ok) {
      this.setState({ error: `Error fetching groups: ${JSON.stringify(respObj)}` });
      return;
    }
    this.setState({ groups: respObj.data });
  }

  async submitCreateGroup(payload) {
    const resp = await backendFetch('/api/group', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const respObj = await resp.json();
    if (!resp.ok) {
      this.setState({ currentModal: null, error: `Error creating group: ${JSON.stringify(respObj)}` });
      return;
    }
    this.setState({ currentModal: null, error: null });
  }

  async submitJoinGroup(payload) {
    const resp = await backendFetch('/api/group/join', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const respObj = await resp.json();
    if (!resp.ok) {
      this.setState({ currentModal: null, error: `Error joining group: ${JSON.stringify(respObj)}` });
      return;
    }
    this.setState({ currentModal: null, error: null });
  }

  render() {
    const { groups, currentModal, error } = this.state;
    return (
      <div className="groups">
        <PageHeader title="Groups" subtitle="Manage your groups" />
        {
          error !== null ? (
            <Modal onClose={() => this.setState({ error: null })}>
              <span>{error}</span>
            </Modal>
          ) : null
        }
        { groups.length === 0 ? <span className="groups__empty_state">You are not a member of any group</span> : null }
        {
          groups.map((group) => <Group group={group} />)
        }
        <Modal show={currentModal === 'create'} onClose={() => this.setState({ currentModal: null })}>
          <GroupCreateForm submit={this.submitCreateGroup} />
        </Modal>
        <button className="groups__create" type="button" onClick={() => this.setState({ currentModal: 'create' })}>Create</button>
        <Modal show={currentModal === 'join'} onClose={() => this.setState({ currentModal: null })}>
          <GroupJoinForm submit={this.submitJoinGroup} />
        </Modal>
        <button className="groups__join" type="button" onClick={() => this.setState({ currentModal: 'join' })}>Join</button>
      </div>
    );
  }
}

export default Groups;
