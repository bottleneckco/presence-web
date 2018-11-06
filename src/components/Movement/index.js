import React, { Component } from 'react';
import moment from 'moment';
import { backendFetch } from '../../util/fetch';

import './styles.scss';
import PageHeader from '../PageHeader';
import MovementStatus from '../MovementStatus';

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
                  <MovementStatus status={status} />
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
