import React, { Component } from 'react';
import moment from 'moment';
import { backendFetch } from '../../util/fetch';

import './styles.scss';
import PageHeader from '../PageHeader';

class Movement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    this.fetchData = this.fetchData.bind(this);
    this.fetchData();
  }

  async fetchData() {
    const resp = await backendFetch('/api/group/statuses');
    const { data } = await resp.json();
    this.setState({ data });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="movement">
        <PageHeader title="Movement" subtitle="Finding someone? Look here!" />
        {
          data.map((group) => (
            <div className="movement__group">
              <span className="movement__group__name">{group.group_name}</span>
              {
                group.statuses.map((status) => (
                  <div className="movement__group__status">
                    <img className="movement__group__status__pic" src={status.user.picture} alt="" />
                    <span className="movement__group__status__username">{status.user.name}</span>
                    <span className="movement__group__status__text">{status.category} - {status.title}</span>
                    <span className="movement__group__status__since">{moment(status.start_time).fromNow()}</span>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    );
  }
}

export default Movement;
